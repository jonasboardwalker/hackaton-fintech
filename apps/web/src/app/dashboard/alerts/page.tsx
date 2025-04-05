import type { Metadata } from "next";
import {
  AiSuggestionBanner,
  AlertsTable,
  DashboardHeader,
  DashboardShell,
} from "~/components/dashboard";

export const metadata: Metadata = {
  title: "Alerts | TrustLimit",
  description: "View and manage transaction alerts",
};

export default function AlertsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Alerts"
        text="View and manage transaction alerts that require attention."
      />
      <AiSuggestionBanner />
      <AlertsTable />
    </DashboardShell>
  );
}
