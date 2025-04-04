"use client";

import { cn } from "@admin-shad-template/ui/utils";
import { CloudUploadIcon } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { type DropzoneOptions, useDropzone } from "react-dropzone";
import { useToast, Progress } from "@admin-shad-template/ui";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  type DefaultExtensionType,
  FileIcon,
  defaultStyles,
} from "react-file-icon";

type FileType = "image" | "video" | "all";

interface Props extends Omit<DropzoneOptions, "accept"> {
  fileType?: FileType;
  onAccepted?: (file: readonly File[]) => void;
  uploadProgress?: number;
  isUploading?: boolean;
  multiple?: boolean;
  /**
   * Maximum file size in megabytes
   * @default 20
   */
  maxSize?: number;
  description?: string;
}

const acceptedFileTypes = {
  image: { "image/jpeg": [".jpeg"], "image/png": [".png"] },
  video: { "video/*": [] },
  all: {},
};

export const Component = ({
  fileType = "all",
  onAccepted,
  multiple = false,
  maxFiles,
  maxSize = 20,
  uploadProgress,
  isUploading,
  description,
}: Props) => {
  const { toast } = useToast();
  const [preview, setPreview] = useState<string>();
  const [filenames, setFilenames] = useState<string[]>([]);
  const t = useTranslations();

  console.log(filenames);

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    accept: acceptedFileTypes[fileType],
    multiple,
    maxSize: maxSize * 1024 * 1024,
    maxFiles,
  });

  useEffect(() => {
    const fileRejectionsCounter = fileRejections.length;
    if (fileRejectionsCounter) {
      fileRejections.forEach(({ file, errors }) => {
        toast({
          title: t("messages.error_uploading_file", { name: file.name }),
          description: (
            <ul>
              {errors.map((e) => (
                <li key={e.code}>{e.message}</li>
              ))}
            </ul>
          ),
          variant: "destructive",
          iconType: "error",
        });
      });
    }

    onAccepted?.(acceptedFiles);

    // Only set the preview if exactly one image file is uploaded
    if (
      acceptedFiles.length === 1 &&
      acceptedFiles[0]?.type.startsWith("image/")
    ) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === "string") {
          setPreview(e.target.result);
        }
      };
      reader.readAsDataURL(acceptedFiles[0]);
    } else {
      setPreview(undefined);
    }

    setFilenames(acceptedFiles.map((file) => file.name));
  }, [acceptedFiles, fileRejections, multiple, onAccepted, t, toast]);

  // const fileDescription = useMemo(() => {
  //   switch (fileType) {
  //     case "image":
  //       return t("upload_file.file_description.image", {
  //         maxSize,
  //       });
  //     case "video":
  //       return t("upload_file.file_description.video", {
  //         maxSize,
  //       });
  //     default:
  //       return t("upload_file.file_description.other", {
  //         maxSize,
  //       });
  //   }
  // }, [fileType, maxSize, t]);

  return (
    <div className="flex flex-col space-y-2">
      <div className="relative flex w-full items-center">
        {isUploading && (
          <Progress
            value={uploadProgress}
            max={100}
            className="absolute bottom-px z-10 h-2 w-full rounded-t-none rounded-b-md px-px"
          />
        )}
        <div
          {...getRootProps({
            className: cn("flex w-full items-center justify-center", {
              "pointer-events-none opacity-50": isUploading,
            }),
            onClick: (event) => event.stopPropagation(),
          })}
        >
          <label
            htmlFor="dropzone-file"
            className={cn(
              "dark:hover:bg-bray-800 flex aspect-video w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-300 bg-slate-50 transition-colors hover:bg-slate-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600",
              { "border-sky-600": isDragActive, "bg-transparent": preview },
            )}
          >
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              disabled={isUploading}
              {...getInputProps()}
            />

            {preview ? (
              <div className="relative h-full w-full hover:opacity-70">
                <Image
                  src={preview}
                  alt="Uploaded image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center px-3 py-5 select-none">
                <CloudUploadIcon className="mb-3 h-10 w-10 text-gray-400" />

                <p className="mb-2 text-center text-sm text-gray-500 dark:text-gray-400">
                  {t.rich("upload_file.click_or_drag_and_drop", {
                    bold: (chunks) => (
                      <span className="font-semibold">{chunks}</span>
                    ),
                  })}
                </p>
              </div>
            )}
          </label>
        </div>
      </div>
      {description && (
        <div className="text-muted-foreground text-xs">{description}</div>
      )}
      {filenames.length > 1 && (
        <div className="flex flex-col items-start gap-2">
          {filenames.map((filename) => {
            const extension = filename.split(".").pop() as DefaultExtensionType;
            return (
              <div
                key={filename}
                className="flex flex-row items-center justify-center space-x-2"
              >
                <div className="-mt-1 h-5 w-5">
                  <FileIcon
                    extension={extension}
                    {...defaultStyles[extension]}
                  />
                </div>

                <p className="mt-0.5 text-sm text-gray-400 select-none dark:text-gray-400">
                  {filename}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const FileUpload = memo(Component);
