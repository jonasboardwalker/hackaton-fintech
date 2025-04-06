import { z } from "zod";

export const transactionStatsEntrySchema = z.object({
  timestamp: z.date(),
  count: z.object({
    allowed: z.number(),
    denied: z.number(),
    alerted: z.number(),
    pendingAlerts: z.number(),
  }),
});

export type TransactionStatsEntrySchema = z.infer<
  typeof transactionStatsEntrySchema
>;

export const transactionStatsSchema = z.object({
  daily: z.array(transactionStatsEntrySchema),
  weekly: z.array(transactionStatsEntrySchema),
  monthly: z.array(transactionStatsEntrySchema),
});

export type TransactionStatsSchema = z.infer<typeof transactionStatsSchema>;
