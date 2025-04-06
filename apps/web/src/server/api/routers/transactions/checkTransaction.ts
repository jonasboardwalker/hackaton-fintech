import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { apiKeyProcedure } from "../../trpc";
import {
  checkTransactionInputSchema,
  checkTransactionOutputSchema,
  metadataSchema,
} from "~/server/api/routers/transactions/checkTransaction.schema";
import { runTransactionCheck } from "~/server/api/routers/transactions/checkTransaction.utils";

const findWorstAction = (
  brokenRules: ReturnType<typeof runTransactionCheck>,
) => {
  if (brokenRules.some(({ action }) => action === "block")) return "blocked";
  if (brokenRules.some(({ action }) => action === "hold")) return "hold";
  return "approved";
};

const findWorstAlert = (
  brokenRules: ReturnType<typeof runTransactionCheck>,
) => {
  if (brokenRules.some(({ alert }) => alert)) return true;
  return false;
};

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

    // Load previous transactions
    const previousTransactions = await ctx.db.transaction.findMany({
      where: {
        userId: ctx.user.id,
        clientId: client.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Load active rules
    const rules = await ctx.db.rule.findMany({
      where: {
        userId: ctx.user.id,
        active: true,
      },
    });

    // Run transaction check
    const brokenRules = runTransactionCheck({
      transaction: {
        amount,
        metadata,
      },
      previousTransactions,
      rules,
    });

    const status = findWorstAction(brokenRules);
    const alert = findWorstAlert(brokenRules);

    // Default to allowed status
    const transaction = await ctx.db.transaction.create({
      data: {
        userId: ctx.user.id,
        clientId: client.id,
        amount,
        status,
        metadata,
      },
    });

    if (alert) {
      await ctx.db.alert.create({
        data: {
          status: "open",
          userId: ctx.user.id,
          clientId: client.id,
          transactionId: transaction.id,
          rules: {
            connect: brokenRules.map(({ ruleId }) => ({ id: ruleId })),
          },
        },
      });
    }

    return {
      status,
      transaction: {
        ...transaction,
        metadata: transaction.metadata as z.infer<typeof metadataSchema>,
      },
      message: "Transaction allowed.",
    };
  });
