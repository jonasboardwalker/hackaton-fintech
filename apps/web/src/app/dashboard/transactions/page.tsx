import type { Metadata } from "next"
import { DashboardHeader } from "@admin-shad-template/ui"
import { DashboardShell } from "@admin-shad-template/ui"
import { TransactionsTable } from "@admin-shad-template/ui"

export const metadata: Metadata = {
  title: "Transactions | TrustLimit",
  description: "View and manage transactions",
}

export default function TransactionsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Transactions" text="View and manage all transactions." />
      <TransactionsTable />
    </DashboardShell>
  )
}

