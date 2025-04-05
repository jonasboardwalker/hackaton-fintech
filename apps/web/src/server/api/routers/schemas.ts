import { z } from "zod";

export const transactionInputSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().length(3),
  description: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const transactionOutputSchema = z.object({
  id: z.string(),
  status: z.enum(["PENDING", "COMPLETED", "FAILED"]),
  amount: z.number().positive(),
  currency: z.string().length(3),
  description: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}); 