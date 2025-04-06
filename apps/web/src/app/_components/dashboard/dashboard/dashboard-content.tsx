"use client";

import { TransactionStatsSchema } from "~/server/api/routers/dashboard/getTransactionStats.schema";
import { useMemo, useState } from "react";
import {
  TransactionsOverviewCard,
  TransactionWorldMap,
} from "~/app/_components";
import { TransactionsSummaryCard } from "./cards/transactions-summary-card";
import { AlertsSummaryCard } from "./cards/alerts-summary-card";

type Props = {
  stats: TransactionStatsSchema;
};

export function DashboardContent(props: Props) {
  const [scope, setScope] = useState<"daily" | "weekly" | "monthly">("weekly");

  const data = useMemo(() => props.stats[scope], [scope, props.stats]);
  const totalTransactions = data.reduce(
    (total, item) => total + item.count.allowed + item.count.denied,
    0,
  );
  const totalAlerts = data.reduce(
    (total, item) => total + item.count.alerted,
    0,
  );

  return (
    <div>
      <div className="mb-4 flex justify-center space-x-4">
        {["daily", "weekly", "monthly"].map((item) => (
          <button
            key={item}
            onClick={() => setScope(item as "daily" | "weekly" | "monthly")}
            className={`rounded px-4 py-2 ${
              scope === item
                ? "bg-primary text-white"
                : "bg-secondary text-gray-700"
            }`}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <TransactionsSummaryCard count={totalTransactions} />
        <AlertsSummaryCard count={totalAlerts} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <TransactionsOverviewCard data={data} className="col-span-1" />
        <TransactionWorldMap className="col-span-1" />
      </div>
    </div>
  );
}
