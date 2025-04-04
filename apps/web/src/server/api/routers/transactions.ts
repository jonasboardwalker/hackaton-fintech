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
   * 1. checkTransaction
   *    - Requires a valid API key in the request headers (x-api-key).
   *    - Good for external B2B use cases.
   */
  checkTransaction: apiKeyProcedure
    .input(
      z.object({
        userRole: z.string().optional(),
        amount: z.number().positive(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Example logic: if "amount > 1000", deny transaction.
      // Real-world usage might do rule checks or rate-limiting logic here.

      const { amount, userRole = "unknown" } = input;
      const outcome = amount > 1000 ? "deny" : "allow";

      // Log in DB (TransactionLog table) for auditing
      await ctx.db.transactionLog.create({
        data: {
          role: userRole,
          amount,
          outcome,
          reason: outcome === "deny" ? "Amount exceeds $1000" : null,
        },
      });

      return {
        outcome,
        message:
          outcome === "deny"
            ? `Transaction denied for ${userRole}, amount exceeds $1000.`
            : `Transaction allowed for ${userRole}.`,
      };
    }),

  /**
   * 2. createTransaction
   *    - Requires a valid user session via Clerk.
   *    - Perfect for internal staff or a front-end user who is signed in.
   */
  createTransaction: privateProcedure
    .input(
      z.object({
        amount: z.number().positive(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.auth.userId) {
        // This should never occur if privateProcedure is working,
        // but we'll add a safety check
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      // For demonstration: just store a new "allowed" transaction
      const transaction = await ctx.db.transactionLog.create({
        data: {
          userId: ctx.auth.userId,
          role: "employee", // or fetch from your local User table if you store it
          amount: input.amount,
          outcome: "allow",
        },
      });

      return {
        success: true,
        transaction,
      };
    }),

  /**
   * 3. getPublicData
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
