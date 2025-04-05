// file: ~/server/api/routers/transaction.ts

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
  apiKeyProcedure,
} from "../trpc";

export const transactionRouter = createTRPCRouter({
  /**
   * checkTransaction
   *    - Requires a valid API key in the request headers (x-api-key).
   *    - Good for external B2B use cases.
   */
  checkTransaction: apiKeyProcedure
    .input(
      z.object({
        amount: z.number().positive(),
        metadata: z.record(z.unknown()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.client) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Not authorized",
        });
      }

      // Example logic: if "amount > 1000", deny transaction.
      // Real-world usage might do rule checks or rate-limiting logic here.
      const { amount, metadata = {} } = input;
      const status = amount > 1000 ? "denied" : "allowed";

      // Create transaction in DB
      const transaction = await ctx.db.transaction.create({
        data: {
          userId: ctx.user.id,
          clientId: ctx.client.id,
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
        transaction,
        message:
          status === "denied"
            ? `Transaction denied, amount exceeds $1000.`
            : `Transaction allowed.`,
      };
    }),

  /**
   * getPublicData
   *    - No authentication required at all.
   *    - You can still read from DB if you want to provide some public info.
   */
  getPublicData: publicProcedure.query(async ({ ctx }) => {
    // Example: return a small snippet or mock data
    return {
      info: "This is publicly accessible data. No auth required!",
      timestamp: new Date(),
    };
  }),
});
