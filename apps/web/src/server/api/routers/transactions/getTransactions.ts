import { privateProcedure } from "../../trpc";

export const getTransactions = privateProcedure.query(async ({ ctx }) => {
  if (!ctx.user) {
    throw new Error("Not authorized");
  }

  const transactions = await ctx.db.transaction.findMany({
    where: {
      userId: ctx.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      client: {
        select: { email: true },
      },
    },
  });

  return transactions;
});
