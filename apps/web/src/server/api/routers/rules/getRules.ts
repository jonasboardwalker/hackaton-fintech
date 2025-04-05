import { privateProcedure } from "../../trpc";

export const getRules = privateProcedure
  .query(async ({ ctx }) => {
    if (!ctx.user) {
      throw new Error("Not authorized");
    }

    const rules = await ctx.db.rule.findMany({
      where: {
        userId: ctx.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return rules;
  }); 