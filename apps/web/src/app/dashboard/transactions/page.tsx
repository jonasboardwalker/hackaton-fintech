import type { Metadata } from "next";
import {
  DashboardHeader,
  DashboardShell,
  TransactionsTable,
} from "@admin-shad-template/ui";
import { api } from "~/trpc/server";

export const metadata: Metadata = {
  title: "Transactions | TrustLimit",
  description: "View and manage transactions",
};

export default async function TransactionsPage() {
  const trans = await api.transaction.getTransactions();

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
