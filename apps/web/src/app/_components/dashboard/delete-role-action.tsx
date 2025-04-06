"use client";

import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
  id: string;
  name: string;
};
export const DeleteRoleAction = ({ id, name }: Props) => {
  const router = useRouter();
  const deleteRule = api.rules.deleteRule.useMutation({
    onSuccess: () => {
      toast.success("Rule deleted successfully");
      router.refresh();
    },
    onError: (error) => {
      toast.error("Failed to delete rule: " + error.message);
    },
  });

  return (
    <div className="flex justify-end">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Trash2 className="text-destructive h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              rule "{name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteRule.mutate({ id })}
              className="bg-destructive hover:bg-destructive/90 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
