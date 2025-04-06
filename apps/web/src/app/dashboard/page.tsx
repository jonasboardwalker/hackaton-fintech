import type { Metadata } from "next";
import { DashboardHeader, DashboardShell } from "~/components/dashboard";
import { api } from "~/trpc/server";
import { DashboardContent } from "~/components/dashboard/dashboard/dashboard-content";

export const metadata: Metadata = {
  title: "Dashboard | TrustLimit",
  description: "Smart Transaction Throttling for Fintech companies",
};

export default async function DashboardPage() {
  const stats = await api.dashboard.getTransactionStats();

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="Monitor and manage transaction controls in real-time."
      />
      <DashboardContent stats={stats} />
    </DashboardShell>
  );
}
