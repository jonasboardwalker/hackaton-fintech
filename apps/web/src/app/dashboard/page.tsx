import type { Metadata } from "next";
import {
  AlertsSummary,
  DashboardHeader,
  DashboardShell,
  Overview,
  RulesSummary,
} from "@admin-shad-template/ui";
import FaultyTransactionsMap from "../_components/heat-map/heat-map";

export const metadata: Metadata = {
  title: "Dashboard | TrustLimit",
  description: "Smart Transaction Throttling for Fintech companies",
};

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="Monitor and manage transaction controls in real-time."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <RulesSummary />
        <AlertsSummary />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Overview className="col-span-1" />
        <div className="col-span-1 overflow-hidden rounded-lg">
          <FaultyTransactionsMap />
        </div>
      </div>
    </DashboardShell>
  );
}
