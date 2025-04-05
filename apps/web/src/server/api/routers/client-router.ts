import { z } from "zod";
import { privateProcedure, createTRPCRouter } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const clientRouter = createTRPCRouter({
  createClient: privateProcedure
    .input(
      z.object({
        email: z.string().email(),
        role: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.auth.userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User must be authenticated to create a client",
        });
      }

      const client = await ctx.db.client.create({
        data: {
          email: input.email,
          role: input.role,
          userId: ctx.auth.userId,
        },
      });

      // Return the plaintext key to admin so they can share it w/ the client
      return {
        client,
      };
    }),
});
