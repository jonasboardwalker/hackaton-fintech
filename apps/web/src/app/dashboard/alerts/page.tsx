import type { Metadata } from "next"
import { DashboardHeader } from "@admin-shad-template/ui"
import { DashboardShell } from "@admin-shad-template/ui"
import { AlertsTable } from "@admin-shad-template/ui"
import { AiSuggestionBanner } from "@admin-shad-template/ui"

export const metadata: Metadata = {
  title: "Alerts | TrustLimit",
  description: "View and manage transaction alerts",
}

export default function AlertsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Alerts" text="View and manage transaction alerts that require attention." />
      <AiSuggestionBanner />
      <AlertsTable />
    </DashboardShell>
  )
}

