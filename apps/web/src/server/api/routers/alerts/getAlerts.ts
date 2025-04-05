import { privateProcedure } from "../../trpc";

export const getAlerts = privateProcedure
  .query(async ({ ctx }) => {
    if (!ctx.user) {
      throw new Error("Not authorized");
    }

    const alerts = await ctx.db.alert.findMany({
      where: {
        userId: ctx.user.id,
      },
      include: {
        transaction: true,
        rules: true,
        client: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return alerts;
  }); 