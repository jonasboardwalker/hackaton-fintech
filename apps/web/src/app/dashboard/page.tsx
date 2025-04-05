import type { Metadata } from "next";
import {
  AlertsSummary,
  DashboardHeader,
  DashboardShell,
  Overview,
  RulesSummary,
} from "~/components/dashboard";

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
      <div className="grid gap-4 md:grid-cols-1">
        <Overview className="col-span-1" />
      </div>
    </DashboardShell>
  );
}
