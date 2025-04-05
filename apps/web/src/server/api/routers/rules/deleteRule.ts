import { z } from "zod";
import { privateProcedure } from "../../trpc";

export const deleteRuleInputSchema = z.object({
  id: z.string(),
});

export const deleteRule = privateProcedure
  .input(deleteRuleInputSchema)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.user) {
      throw new Error("Not authorized");
    }

    const { id } = input;

    // First verify the rule belongs to the user
    const existingRule = await ctx.db.rule.findFirst({
      where: {
        id,
        userId: ctx.user.id,
      },
    });

    if (!existingRule) {
      throw new Error("Rule not found or not authorized");
    }

    await ctx.db.rule.delete({
      where: {
        id,
      },
    });

    return { success: true };
  }); 