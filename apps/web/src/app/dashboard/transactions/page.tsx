import type { Metadata } from "next";
import {
  DashboardHeader,
  DashboardShell,
  TransactionsTable,
} from "~/components/dashboard";
import { api } from "~/trpc/server";

export const metadata: Metadata = {
  title: "Transactions | TrustLimit",
  description: "View and manage transactions",
};

export default async function TransactionsPage() {
  const transactions = await api.transaction.getTransactions();

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Transactions"
        text="View and manage all transactions."
      />
      <TransactionsTable transactions={transactions} />
    </DashboardShell>
  );
}
