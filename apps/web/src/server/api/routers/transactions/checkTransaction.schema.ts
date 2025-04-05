import { z } from "zod";

export const metadataSchema = z.object({
  location: z.string().optional(),
});

export const checkTransactionInputSchema = z.object({
  amount: z.number().positive(),
  metadata: metadataSchema,
  clientId: z.string(),
});

export const checkTransactionOutputSchema = z.object({
  status: z.enum(["allowed", "denied"]),
  transaction: z.object({
    id: z.string(),
    userId: z.string(),
    clientId: z.string(),
    amount: z.number(),
    status: z.string(),
    metadata: metadataSchema,
    createdAt: z.date(),
  }),
  message: z.string(),
});
