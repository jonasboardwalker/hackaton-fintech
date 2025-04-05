import type { Metadata } from "next"
import { DashboardHeader } from "@admin-shad-template/ui"
import { DashboardShell } from "@admin-shad-template/ui"
import { Overview } from "@admin-shad-template/ui"
import { RulesSummary } from "@admin-shad-template/ui"
import { AlertsSummary } from "@admin-shad-template/ui"
import { TransactionWorldMap } from "@admin-shad-template/ui"

export const metadata: Metadata = {
  title: "Dashboard | TrustLimit",
  description: "Smart Transaction Throttling for Fintech companies",
}

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Monitor and manage transaction controls in real-time." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <RulesSummary />
        <AlertsSummary />
      </div>
      <div className="grid gap-4 md:grid-cols-1">
        <Overview className="col-span-1" />
      </div>
      <div className="grid gap-4 md:grid-cols-1">
        <TransactionWorldMap className="col-span-1" />
      </div>
    </DashboardShell>
  )
}

