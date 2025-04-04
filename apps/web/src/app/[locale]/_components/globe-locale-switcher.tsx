"use client";

import { Globe } from "lucide-react";
import { useTransition } from "react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@admin-shad-template/ui";
import { routing, usePathname, useRouter } from "~/i18n/routing";

import { useTranslations } from "next-intl";
import { type Locale } from "~/lib/types";

export const GlobeLocaleSwitcher = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const t = useTranslations();

  const onValueChange = (locale: Locale) => {
    startTransition(() => {
      startTransition(() => {
        router.replace(pathname, { locale });
      });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="px-2"
          disabled={isPending}
        >
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {routing.locales.map((locale) => (
          <DropdownMenuItem key={locale} onClick={() => onValueChange(locale)}>
            {t("locale_swither.locale", { locale })}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
