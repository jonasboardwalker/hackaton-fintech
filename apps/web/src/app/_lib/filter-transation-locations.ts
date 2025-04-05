import type { Transaction } from "@prisma/client";

export type TransactionWithLocation = Transaction & {
  metadata: {
    location: {
      lat: number;
      lng: number;
    };
  };
};

/**
 * Filters an array of transactions to include only those that have a valid location.
 * A valid location means that metadata is an object containing a non-null `location` object,
 * and that location has both numeric `lat` and `lng` properties.
 *
 * @param transactions - The array of transactions (from Prisma)
 * @returns An array of transactions with valid location data.
 */
export function filterTransactionsWithValidLocation(
  transactions: Transaction[],
): TransactionWithLocation[] {
  return transactions.filter((tx): tx is TransactionWithLocation => {
    const meta = tx.metadata;
    if (!meta || typeof meta !== "object") return false;
    const location = (meta as any).location;
    if (!location || typeof location !== "object") return false;
    const { lat, lng } = location;
    return typeof lat === "number" && typeof lng === "number";
  });
}
