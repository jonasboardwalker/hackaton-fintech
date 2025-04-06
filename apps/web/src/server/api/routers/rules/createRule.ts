import { privateProcedure } from "../../trpc";
import { ruleSchema } from "~/utils/rules/rules.schema";

export const createRuleInputSchema = ruleSchema;

export const createRule = privateProcedure
  .input(createRuleInputSchema)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.user) {
      throw new Error("Not authorized");
    }

    const createdRule = await ctx.db.rule.create({
      data: { ...input, userId: ctx.user.id },
    });

    return createdRule;
  });
