"use client";

import { TransactionStatsSchema } from "~/server/api/routers/dashboard/getTransactionStats.schema";
import { useMemo, useState } from "react";
import { TransactionsOverviewCard } from "./cards/transactions-overview-card";
import { TransactionWorldMapCard } from "./cards/transaction-world-map-card";
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
  const pendingAlertsCount = data.reduce(
    (total, item) => total + item.count.pendingAlerts,
    0,
  );

  return (
    <div>
      <div className="mb-4 flex space-x-4">
        {[
          { key: "daily", label: "Last Week" },
          { key: "weekly", label: "Last Month" },
          { key: "monthly", label: "Last Year" },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setScope(item.key as "daily" | "weekly" | "monthly")}
            className={`rounded px-4 py-2 ${
              scope === item.key
                ? "bg-primary text-white"
                : "bg-secondary text-gray-700"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mb-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <TransactionsSummaryCard count={totalTransactions} />
        <AlertsSummaryCard count={pendingAlertsCount} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <TransactionsOverviewCard
          data={data}
          className="col-span-1"
          scope={scope}
        />
        <TransactionWorldMapCard
          data={data}
          className="col-span-1"
          scope={scope}
        />
      </div>
    </div>
  );
}
