import { type Locale } from "@prisma/client";
import { getLocale as untypedGetLocale } from "next-intl/server";

export const getLocale = async () => {
  return untypedGetLocale() as Promise<Locale>;
};
