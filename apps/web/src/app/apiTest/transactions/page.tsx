import { api } from "~/trpc/server";
import { JsonTable } from "../JsonTable";

export default async function ApiTestTransactions() {
  const transactions = await api.transaction.getTransactions() as Record<string, unknown>[];

  return <JsonTable data={transactions} title="Transactions" />;
}
