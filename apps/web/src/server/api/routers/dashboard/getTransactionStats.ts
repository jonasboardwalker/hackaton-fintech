import { z } from "zod";
import { privateProcedure } from "../../trpc";
import { DateTime } from "luxon";

const transactionStatsSchema = z.object({
  stats: z.array(
    z.object({
      timestamp: z.date(),
      count: z.object({
        allowed: z.number(),
        denied: z.number(),
        alerted: z.number(),
      }),
    }),
  ),
});

export const getTransactionStats = privateProcedure
  .output(transactionStatsSchema)
  .query(async ({ ctx }) => {
    if (!ctx.user) {
      throw new Error("Not authorized");
    }

    const now = DateTime.now();
    const stats = [];

    // Get daily stats for past 7 days
    for (let i = 0; i < 7; i++) {
      const date = now.minus({ days: i });
      const startOfDay = date.startOf("day");

      const transactions = await ctx.db.transaction.groupBy({
        by: ["status"],
        where: {
          userId: ctx.user.id,
          createdAt: {
            gte: startOfDay.toJSDate(),
            lt: startOfDay.plus({ days: 1 }).toJSDate(),
          },
        },
        _count: true,
      });

      stats.push({
        timestamp: startOfDay.toJSDate(),
        count: {
          allowed:
            transactions.find((t) => t.status === "allowed")?._count ?? 0,
          denied: transactions.find((t) => t.status === "denied")?._count ?? 0,
          alerted:
            transactions.find((t) => t.status === "alerted")?._count ?? 0,
        },
      });
    }

    // Get weekly stats for past 8 weeks
    for (let i = 0; i < 8; i++) {
      const date = now.minus({ weeks: i });
      const startOfWeek = date.startOf("week");

      const transactions = await ctx.db.transaction.groupBy({
        by: ["status"],
        where: {
          userId: ctx.user.id,
          createdAt: {
            gte: startOfWeek.toJSDate(),
            lt: startOfWeek.plus({ weeks: 1 }).toJSDate(),
          },
        },
        _count: true,
      });

      stats.push({
        timestamp: startOfWeek.toJSDate(),
        count: {
          allowed:
            transactions.find((t) => t.status === "allowed")?._count ?? 0,
          denied: transactions.find((t) => t.status === "denied")?._count ?? 0,
          alerted:
            transactions.find((t) => t.status === "alerted")?._count ?? 0,
        },
      });
    }

    // Get monthly stats for past 6 months
    for (let i = 0; i < 6; i++) {
      const date = now.minus({ months: i });
      const startOfMonth = date.startOf("month");

      const transactions = await ctx.db.transaction.groupBy({
        by: ["status"],
        where: {
          userId: ctx.user.id,
          createdAt: {
            gte: startOfMonth.toJSDate(),
            lt: startOfMonth.plus({ months: 1 }).toJSDate(),
          },
        },
        _count: true,
      });

      stats.push({
        timestamp: startOfMonth.toJSDate(),
        count: {
          allowed:
            transactions.find((t) => t.status === "allowed")?._count ?? 0,
          denied: transactions.find((t) => t.status === "denied")?._count ?? 0,
          alerted:
            transactions.find((t) => t.status === "alerted")?._count ?? 0,
        },
      });
    }

    return { stats };
  });
