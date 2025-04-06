import { privateProcedure } from "../../trpc";
import { DateTime } from "luxon";
import { PrismaClient } from "@prisma/client";
import { transactionStatsSchema } from "~/server/api/routers/dashboard/getTransactionStats.schema";

type Stats = {
  timestamp: Date;
  count: {
    allowed: number;
    denied: number;
    alerted: number;
  };
};

async function getDailyStats(db: PrismaClient, userId: string, now: DateTime) {
  const stats: Stats[] = [];

  // Get daily stats for past 7 days
  for (let i = 0; i < 7; i++) {
    const date = now.minus({ days: i });
    const startOfDay = date.startOf("day");

    const transactions = await db.transaction.groupBy({
      by: ["status"],
      where: {
        userId: userId,
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
        allowed: transactions.find((t) => t.status === "allowed")?._count ?? 0,
        denied: transactions.find((t) => t.status === "denied")?._count ?? 0,
        alerted: transactions.find((t) => t.status === "alerted")?._count ?? 0,
      },
    });
  }

  return stats;
}

async function getWeeklyStats(db: PrismaClient, userId: string, now: DateTime) {
  const stats: Stats[] = [];

  // Get weekly stats for past 8 weeks
  for (let i = 0; i < 8; i++) {
    const date = now.minus({ weeks: i });
    const startOfWeek = date.startOf("week");

    const transactions = await db.transaction.groupBy({
      by: ["status"],
      where: {
        userId: userId,
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
        allowed: transactions.find((t) => t.status === "allowed")?._count ?? 0,
        denied: transactions.find((t) => t.status === "denied")?._count ?? 0,
        alerted: transactions.find((t) => t.status === "alerted")?._count ?? 0,
      },
    });
  }

  return stats;
}

async function getMonthlyStats(
  db: PrismaClient,
  userId: string,
  now: DateTime,
) {
  const stats: Stats[] = [];

  // Get monthly stats for past 6 months
  for (let i = 0; i < 6; i++) {
    const date = now.minus({ months: i });
    const startOfMonth = date.startOf("month");

    const transactions = await db.transaction.groupBy({
      by: ["status"],
      where: {
        userId: userId,
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
        allowed: transactions.find((t) => t.status === "allowed")?._count ?? 0,
        denied: transactions.find((t) => t.status === "denied")?._count ?? 0,
        alerted: transactions.find((t) => t.status === "alerted")?._count ?? 0,
      },
    });
  }

  return stats;
}

export const getTransactionStats = privateProcedure
  .output(transactionStatsSchema)
  .query(async ({ ctx }) => {
    if (!ctx.user) {
      throw new Error("Not authorized");
    }

    const now = DateTime.now();

    const [daily, weekly, monthly] = await Promise.all([
      getDailyStats(ctx.db, ctx.user.id, now),
      getWeeklyStats(ctx.db, ctx.user.id, now),
      getMonthlyStats(ctx.db, ctx.user.id, now),
    ]);

    return { daily, weekly, monthly };
  });
