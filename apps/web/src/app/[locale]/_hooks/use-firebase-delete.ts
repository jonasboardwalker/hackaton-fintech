import { useState, useCallback } from "react";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "~/firebase/client";
import { useToast } from "@admin-shad-template/ui";
import { useTranslations } from "next-intl";

export const useFirebaseDelete = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  const t = useTranslations();

  const deleteFile = useCallback(
    async (filePath: string) => {
      setIsDeleting(true);
      const fileRef = ref(storage, filePath);

      try {
        await deleteObject(fileRef);
      } catch {
        toast({
          title: t("messages.error_deleting_file"),
          variant: "destructive",
          iconType: "error",
        });
      } finally {
        setIsDeleting(false);
      }
    },
    [t, toast],
  );

  return { deleteFile, isDeleting };
};
