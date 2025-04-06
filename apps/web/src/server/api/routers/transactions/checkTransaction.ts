import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { apiKeyProcedure } from "../../trpc";
import {
  checkTransactionInputSchema,
  checkTransactionOutputSchema,
  metadataSchema,
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

    const { amount, metadata = {}, clientId, clientEmail } = input;
    const status = amount > 1000 ? "denied" : "allowed";

    let client = await ctx.db.client.findFirst({
      where: {
        idFromUser: clientId,
        userId: ctx.user.id,
      },
    });

    if (!client)
      client = await ctx.db.client.create({
        data: {
          email: clientEmail,
          userId: ctx.user.id,
          idFromUser: clientId,
        },
      });

    if (client.email !== clientEmail)
      await ctx.db.client.update({
        where: { id: client.id },
        data: {
          email: clientEmail,
        },
      });

    const transaction = await ctx.db.transaction.create({
      data: {
        userId: ctx.user.id,
        clientId: client.id,
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
