import { z } from "zod";
import { privateProcedure } from "../../trpc";

export const updateRuleInputSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  parameters: z.record(z.any()).optional(),
  action: z.enum(["deny", "alert", "allow"]).optional(),
});

export const updateRule = privateProcedure
  .input(updateRuleInputSchema)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.user) {
      throw new Error("Not authorized");
    }

    const { id, ...updateData } = input;

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

    const updatedRule = await ctx.db.rule.update({
      where: {
        id,
      },
      data: updateData,
    });

    return updatedRule;
  }); 