import { z } from "zod";

export const locationSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

export const metadataSchema = z.object({
  location: locationSchema.optional(),
  role: z.string().optional(),
  timestamp: z.string().optional(),
});

export const checkTransactionInputSchema = z.object({
  amount: z.number().positive(),
  metadata: metadataSchema,
  clientId: z.string(),
  clientEmail: z.string(),
});

export const checkTransactionOutputSchema = z.object({
  status: z.enum(["approved", "blocked", "hold"]),
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
