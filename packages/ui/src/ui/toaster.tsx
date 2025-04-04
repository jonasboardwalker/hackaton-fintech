"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast";
import { useToast } from "./use-toast";
import { IconBadge } from "./icon-badge";
import {
  BadgeInfoIcon,
  CheckIcon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react";
import { cn } from "../lib/utils";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        iconType,
        ...props
      }) {
        let icon = null;
        switch (iconType) {
          case "error":
            icon = <IconBadge size="sm" icon={XIcon} variant="error" />;
            break;
          case "success":
            icon = <IconBadge size="sm" icon={CheckIcon} variant="success" />;
            break;
          case "warning":
            icon = (
              <IconBadge size="sm" icon={TriangleAlertIcon} variant="warning" />
            );
            break;
          case "info":
            icon = (
              <IconBadge size="sm" icon={BadgeInfoIcon} variant="default" />
            );
            break;
          default:
            break;
        }

        return (
          <Toast key={id} {...props}>
            <div
              className={cn(
                "flex gap-x-2",
                description ? "items-start" : "items-center"
              )}
            >
              {icon}
              <div className="flex flex-col gap-y-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>

            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
