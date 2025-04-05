import type { Metadata } from "next";
import {
  DashboardHeader,
  DashboardShell,
  TransactionsTable,
} from "~/components/dashboard";

export const metadata: Metadata = {
  title: "Transactions | TrustLimit",
  description: "View and manage transactions",
};

export default function TransactionsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Transactions"
        text="View and manage all transactions."
      />
      <TransactionsTable />
    </DashboardShell>
  );
}
