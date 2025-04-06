import { Suspense } from "react";
import type { Metadata } from "next";
import { api } from "~/trpc/server";
import { DashboardHeader, DashboardShell } from "~/components/dashboard";
import { DashboardContent } from "~/components/dashboard/dashboard/dashboard-content";
import { DashboardLoading } from "~/components/dashboard/dashboard/loading";

export const metadata: Metadata = {
  title: "Dashboard | TrustLimit",
  description: "Monitor and manage transaction controls in real-time.",
};

async function DashboardContentWrapper() {
  const stats = await api.dashboard.getTransactionStats();
  return <DashboardContent stats={stats} />;
}

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="Monitor and manage transaction controls in real-time."
      />
      <Suspense fallback={<DashboardLoading />}>
        <DashboardContentWrapper />
      </Suspense>
    </DashboardShell>
  );
}
