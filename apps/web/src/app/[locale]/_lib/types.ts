import { type routing } from "~/i18n/routing";

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export type Locale = (typeof routing.locales)[number];
