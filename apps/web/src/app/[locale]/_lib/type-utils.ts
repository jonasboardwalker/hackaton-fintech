import { type Entries } from "./types";

export const entriesFromObject = <T extends object>(object: T): Entries<T> => {
  return Object.entries(object) as Entries<T>;
};
