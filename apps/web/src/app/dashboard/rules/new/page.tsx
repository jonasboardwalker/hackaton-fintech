import type { Metadata } from "next"
import { DashboardHeader } from "@admin-shad-template/ui"
import { DashboardShell } from "@admin-shad-template/ui"
import { RuleForm } from "@admin-shad-template/ui"

export const metadata: Metadata = {
  title: "New Rule | TrustLimit",
  description: "Create a new transaction control rule",
}

export default function NewRulePage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Create Rule" text="Define a new transaction control rule." />
      <div className="grid gap-8">
        <RuleForm />
      </div>
    </DashboardShell>
  )
}

