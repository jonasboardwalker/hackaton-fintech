"use client";

import { useRouter } from "~/i18n/routing";
import { cn } from "@admin-shad-template/ui/utils";
import { useCallback } from "react";
import { useIsActiveRoute } from "~/app/_hooks/use-is-active-route";
import { NavigationItemType } from "~/types/navigation.types";

export const NavigationItem = ({
  icon: Icon,
  label,
  href,
}: NavigationItemType) => {
  const router = useRouter();
  const isActive = useIsActiveRoute(href);

  const onClick = useCallback(() => {
    router.push(href);
  }, [href, router]);

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 pl-6 text-sm font-medium text-slate-500 transition-all hover:bg-slate-300/20 hover:text-slate-600",
        isActive &&
          "bg-sky-200/20 text-sky-700 hover:bg-sky-200/20 hover:text-sky-700",
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn("text-slate-500", isActive && "text-sky-700")}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto h-full border-2 border-sky-700 opacity-0 transition-all",
          isActive && "opacity-100",
        )}
      />
    </button>
  );
};
