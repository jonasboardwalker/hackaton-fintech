import { z } from "zod";
import { privateProcedure } from "../../trpc";

export const getTransactionsInputSchema = z.object({
  limit: z.number().min(1).max(100).default(10),
  cursor: z.string().optional(),
});

export const getTransactions = privateProcedure
  .input(getTransactionsInputSchema)
  .query(async ({ ctx, input }) => {
    if (!ctx.user) {
      throw new Error("Not authorized");
    }

    const { limit, cursor } = input;

    const transactions = await ctx.db.transaction.findMany({
      where: {
        userId: ctx.user.id,
      },
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: {
        createdAt: "desc",
      },
    });

    let nextCursor: string | undefined = undefined;
    if (transactions.length > limit) {
      const nextItem = transactions.pop();
      nextCursor = nextItem?.id;
    }

    return {
      transactions,
      nextCursor,
    };
  }); 