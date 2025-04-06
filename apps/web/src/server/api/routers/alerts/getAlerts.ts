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
        transaction: {
          select: {
            id: true,
            amount: true,
            status: true,
            createdAt: true,
            metadata: true,
          },
        },
        rules: {
          select: {
            id: true,
            name: true,
          },
        },
        client: {
          select: {
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return alerts;
  }); 