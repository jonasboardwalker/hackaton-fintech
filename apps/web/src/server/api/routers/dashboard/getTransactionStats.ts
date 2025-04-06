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
    pendingAlerts: number;
  };
};

async function getLast7Days(db: PrismaClient, userId: string, now: DateTime) {
  const stats: Stats[] = [];
  const dates = Array.from({ length: 7 }, (_, i) => now.minus({ days: i }));

  // Get all transactions and alerts for the period in parallel
  const [transactions, alerts] = await Promise.all([
    db.transaction.findMany({
      where: {
        userId: userId,
        createdAt: {
          gte: dates[6]?.startOf("day").toJSDate() ?? new Date(),
          lt: dates[0]?.endOf("day").toJSDate() ?? new Date(),
        },
      },
      select: {
        status: true,
        createdAt: true,
      },
    }),
    db.alert.findMany({
      where: {
        userId: userId,
        status: "open",
        createdAt: {
          gte: dates[6]?.startOf("day").toJSDate() ?? new Date(),
          lt: dates[0]?.endOf("day").toJSDate() ?? new Date(),
        },
      },
      select: {
        createdAt: true,
      },
    }),
  ]);

  // Process each day
  for (let i = 6; i >= 0; i--) {
    const date = dates[i];
    if (!date) continue;

    const startOfDay = date.startOf("day");
    const endOfDay = date.endOf("day");

    const dayTransactions = transactions.filter(
      (t) =>
        t.createdAt >= startOfDay.toJSDate() &&
        t.createdAt < endOfDay.toJSDate(),
    );

    const dayAlerts = alerts.filter(
      (a) =>
        a.createdAt >= startOfDay.toJSDate() &&
        a.createdAt < endOfDay.toJSDate(),
    );

    stats.push({
      timestamp: startOfDay.toJSDate(),
      count: {
        allowed: dayTransactions.filter((t) => t.status === "allowed").length,
        denied: dayTransactions.filter((t) => t.status === "denied").length,
        alerted: dayTransactions.filter((t) => t.status === "alerted").length,
        pendingAlerts: dayAlerts.length,
      },
    });
  }

  return stats;
}

async function getLast4Weeks(db: PrismaClient, userId: string, now: DateTime) {
  const stats: Stats[] = [];
  const dates = Array.from({ length: 4 }, (_, i) => now.minus({ weeks: i }));

  // Get all transactions and alerts for the period in parallel
  const [transactions, alerts] = await Promise.all([
    db.transaction.findMany({
      where: {
        userId: userId,
        createdAt: {
          gte: dates[3]?.startOf("week").toJSDate() ?? new Date(),
          lt: dates[0]?.endOf("week").toJSDate() ?? new Date(),
        },
      },
      select: {
        status: true,
        createdAt: true,
      },
    }),
    db.alert.findMany({
      where: {
        userId: userId,
        status: "open",
        createdAt: {
          gte: dates[3]?.startOf("week").toJSDate() ?? new Date(),
          lt: dates[0]?.endOf("week").toJSDate() ?? new Date(),
        },
      },
      select: {
        createdAt: true,
      },
    }),
  ]);

  // Process each week
  for (let i = 3; i >= 0; i--) {
    const date = dates[i];
    if (!date) continue;

    const startOfWeek = date.startOf("week");
    const endOfWeek = date.endOf("week");

    const weekTransactions = transactions.filter(
      (t) =>
        t.createdAt >= startOfWeek.toJSDate() &&
        t.createdAt < endOfWeek.toJSDate(),
    );

    const weekAlerts = alerts.filter(
      (a) =>
        a.createdAt >= startOfWeek.toJSDate() &&
        a.createdAt < endOfWeek.toJSDate(),
    );

    stats.push({
      timestamp: startOfWeek.toJSDate(),
      count: {
        allowed: weekTransactions.filter((t) => t.status === "allowed").length,
        denied: weekTransactions.filter((t) => t.status === "denied").length,
        alerted: weekTransactions.filter((t) => t.status === "alerted").length,
        pendingAlerts: weekAlerts.length,
      },
    });
  }

  return stats;
}

async function getLast12Months(
  db: PrismaClient,
  userId: string,
  now: DateTime,
) {
  const stats: Stats[] = [];
  const dates = Array.from({ length: 12 }, (_, i) => now.minus({ months: i }));

  // Get all transactions and alerts for the period in parallel
  const [transactions, alerts] = await Promise.all([
    db.transaction.findMany({
      where: {
        userId: userId,
        createdAt: {
          gte: dates[11]?.startOf("month").toJSDate() ?? new Date(),
          lt: dates[0]?.endOf("month").toJSDate() ?? new Date(),
        },
      },
      select: {
        status: true,
        createdAt: true,
      },
    }),
    db.alert.findMany({
      where: {
        userId: userId,
        status: "open",
        createdAt: {
          gte: dates[11]?.startOf("month").toJSDate() ?? new Date(),
          lt: dates[0]?.endOf("month").toJSDate() ?? new Date(),
        },
      },
      select: {
        createdAt: true,
      },
    }),
  ]);

  // Process each month
  for (let i = 11; i >= 0; i--) {
    const date = dates[i];
    if (!date) continue;

    const startOfMonth = date.startOf("month");
    const endOfMonth = date.endOf("month");

    const monthTransactions = transactions.filter(
      (t) =>
        t.createdAt >= startOfMonth.toJSDate() &&
        t.createdAt < endOfMonth.toJSDate(),
    );

    const monthAlerts = alerts.filter(
      (a) =>
        a.createdAt >= startOfMonth.toJSDate() &&
        a.createdAt < endOfMonth.toJSDate(),
    );

    stats.push({
      timestamp: startOfMonth.toJSDate(),
      count: {
        allowed: monthTransactions.filter((t) => t.status === "allowed").length,
        denied: monthTransactions.filter((t) => t.status === "denied").length,
        alerted: monthTransactions.filter((t) => t.status === "alerted").length,
        pendingAlerts: monthAlerts.length,
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
      getLast7Days(ctx.db, ctx.user.id, now),
      getLast4Weeks(ctx.db, ctx.user.id, now),
      getLast12Months(ctx.db, ctx.user.id, now),
    ]);

    return { daily, weekly, monthly };
  });
