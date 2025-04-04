import { z } from "zod";
import { privateProcedure, createTRPCRouter } from "~/server/api/trpc";
import { randomBytes } from "crypto";

function generateApiKey() {
  return randomBytes(32).toString("hex");
}

export const clientRouter = createTRPCRouter({
  createClient: privateProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const newKey = generateApiKey();

      // Optionally hash newKey before storing
      // e.g. const hashedKey = await bcrypt.hash(newKey, saltRounds);

      const client = await ctx.db.client.create({
        data: {
          name: input.name,
          apiKey: newKey,
          // isActive defaults to true
        },
      });

      // Return the plaintext key to admin so they can share it w/ the client
      return {
        client,
        apiKey: newKey,
      };
    }),
});
