import type { Metadata } from "next"
import { DashboardHeader } from "@admin-shad-template/ui"
import { DashboardShell } from "@admin-shad-template/ui"
import { SettingsForm } from "@admin-shad-template/ui"

export const metadata: Metadata = {
  title: "Settings | TrustLimit",
  description: "Manage your TrustLimit settings",
}

export default function SettingsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Settings" text="Manage your TrustLimit settings and preferences." />
      <div className="grid gap-8">
        <SettingsForm />
      </div>
    </DashboardShell>
  )
}

