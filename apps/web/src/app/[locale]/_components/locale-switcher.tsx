"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@admin-shad-template/ui";
import { useTransition } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, routing } from "~/i18n/routing";
import { useLocale } from "~/lib/next-intl";
import { type Locale } from "~/lib/types";

export const LocaleSwitcher = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const t = useTranslations();

  const locale = useLocale();

  function onValueChange(locale: Locale) {
    startTransition(() => {
      startTransition(() => {
        router.replace(pathname, { locale });
      });
    });
  }

  return (
    <Select
      defaultValue={locale}
      disabled={isPending}
      onValueChange={onValueChange}
    >
      <SelectTrigger>
        <SelectValue placeholder={t("locale_swither.label")} />
      </SelectTrigger>
      <SelectContent align="end">
        {routing.locales.map((locale) => (
          <SelectItem key={locale} value={locale}>
            {t("locale_swither.locale", { locale })}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
