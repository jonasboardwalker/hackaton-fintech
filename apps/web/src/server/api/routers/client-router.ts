import { z } from "zod";
import { privateProcedure, createTRPCRouter } from "~/server/api/trpc";
import { randomBytes } from "crypto";

function generateApiKey() {
  return randomBytes(32).toString("hex");
}

export const clientRouter = createTRPCRouter({
  createClient: privateProcedure
    .input(z.object({ 
      email: z.string().email(),
      role: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const newKey = generateApiKey();

      const client = await ctx.db.client.create({
        data: {
          email: input.email,
          role: input.role,
          apiKey: newKey,
          isActive: true,
          userId: ctx.auth.userId,
        },
      });

      // Return the plaintext key to admin so they can share it w/ the client
      return {
        client,
        apiKey: newKey,
      };
    }),
});
