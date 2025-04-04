import { type Locale } from "@prisma/client";
import { useLocale as untypedUseLocale } from "next-intl";

export const useLocale = () => {
  return untypedUseLocale() as Locale;
};
