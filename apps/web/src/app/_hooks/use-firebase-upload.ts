import { useState, useCallback } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "~/firebase/client";
import { useUser } from "@clerk/nextjs";
import { type FileUploadInfo } from "~/types/upload-types";
import { useToast } from "@admin-shad-template/ui";
import { useTranslations } from "next-intl";

export const useFirebaseUpload = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgresses, setUploadProgresses] = useState<
    Record<string, number>
  >({});
  const [fileCount, setfileCount] = useState(0);
  const [downloadUrls, setDownloadUrls] = useState<FileUploadInfo[]>([]);
  const t = useTranslations();

  const uploadFile = useCallback(
    ({
      file,
      path,
      customFileName,
    }: {
      file: File;
      path: string;
      customFileName?: string;
    }): Promise<FileUploadInfo> => {
      return new Promise((resolve, reject) => {
        const fileExtension = file.name.split(".").pop()?.toLowerCase();
        const fileName = customFileName
          ? `${customFileName}.${fileExtension}`
          : file.name;
        const fullPath = `${path}/${fileName}`;
        const fileRef = ref(storage, fullPath);
        const uploadTask = uploadBytesResumable(fileRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgresses((prev) => ({ ...prev, [fileName]: progress }));
          },
          (error) => {
            toast({
              title: t("messages.error_uploading_file", { name: file.name }),
              variant: "destructive",
              iconType: "error",
            });
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((url) => {
                resolve({ url, fileName, filePath: fullPath });
              })
              .catch((error: Error) => {
                reject(error);
              });
          },
        );
      });
    },
    [t, toast],
  );

  const upload = useCallback(
    ({
      files,
      path,
      customFileName,
      onSuccess,
      onFail,
    }: {
      files: readonly File[];
      path: string;
      customFileName?: string;
      onSuccess?: (urls: FileUploadInfo[]) => Promise<void>;
      onFail?: (errorMessage: string) => void;
    }) => {
      if (!user) {
        const errorMessage = "messages.user_not_logged_in";
        toast({
          title: t(errorMessage),
          variant: "destructive",
          iconType: "error",
        });
        onFail?.(errorMessage);
        return;
      }
      if (!files.length) {
        const errorMessage = "messages.no_files_to_upload";
        toast({
          title: t(errorMessage),
          variant: "destructive",
          iconType: "error",
        });
        onFail?.(errorMessage);
        return;
      }

      setfileCount(files.length);

      // Basic runtime check to ensure path format
      if (!/^[a-zA-Z0-9-_]+(\/[a-zA-Z0-9-_]+)*$/.test(path)) {
        const errorMessage = "messages.invalid_file_path";
        toast({
          title: t(errorMessage),
          variant: "destructive",
          iconType: "error",
        });
        onFail?.(errorMessage);
        return;
      }

      setUploadProgresses({});

      setIsUploading(true);
      const uploads = files.map((file, index) =>
        uploadFile({
          file,
          path: `${user.id}/${path}`,
          customFileName: customFileName
            ? `${customFileName}${index ? `-${index}` : ""}`
            : undefined,
        }),
      );
      Promise.all(uploads)
        .then(async (urls) => {
          setDownloadUrls(urls);
          toast({
            title: t("messages.files_successfully_uploaded"),
            iconType: "success",
          });
          await onSuccess?.(urls);
        })
        .catch((error: Error) => {
          onFail?.(error.message);
        })
        .finally(() => {
          setIsUploading(false);
          setUploadProgresses({});
        });
    },
    [t, toast, uploadFile, user],
  );

  const progress =
    Object.values(uploadProgresses).reduce((acc, curr) => acc + curr, 0) /
      fileCount || 1;

  return {
    upload,
    isUploading,
    progress,
    downloadUrls,
  };
};
