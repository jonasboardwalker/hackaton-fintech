import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { privateProcedure } from "../../trpc";

const metadataSchema = z.object({
  location: z.string().optional(),
});

export const transactionInputSchema = z.object({
  amount: z.number().positive(),
  metadata: metadataSchema,
  clientId: z.string(),
});

export const transactionOutputSchema = z.object({
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

export const checkTransactionFromApp = privateProcedure
  .input(transactionInputSchema)
  .output(transactionOutputSchema)
  .mutation(async ({ ctx, input }) => {
    console.log("Checking transaction... ", input);
    if (!ctx.user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Not authorized",
      });
    }

    const { amount, metadata = {}, clientId } = input;
    const status = amount > 1000 ? "denied" : "allowed";

    const transaction = await ctx.db.transaction.create({
      data: {
        userId: ctx.user.id,
        clientId,
        amount,
        status,
        metadata: {
          ...metadata,
          timestamp: new Date().toISOString(),
        },
      },
    });

    return {
      status,
      transaction: {
        ...transaction,
        metadata: transaction.metadata as z.infer<typeof metadataSchema>,
      },
      message:
        status === "denied"
          ? `Transaction denied, amount exceeds $1000.`
          : `Transaction allowed.`,
    };
  });
