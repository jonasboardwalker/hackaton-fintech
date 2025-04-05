import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { apiKeyProcedure } from "../../trpc";
import {
  checkTransactionInputSchema,
  checkTransactionOutputSchema, metadataSchema,
} from "~/server/api/routers/transactions/checkTransaction.schema";

export const checkTransaction = apiKeyProcedure
  .input(checkTransactionInputSchema)
  .output(checkTransactionOutputSchema)
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
        metadata,
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
