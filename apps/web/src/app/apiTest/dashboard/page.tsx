import { api } from "~/trpc/server";
import { JsonTable } from "../JsonTable";

export default async function ApiTestDashboard() {
  const { stats } = await api.dashboard.getTransactionStats();

  return <JsonTable data={stats} title="Dashboard Statistics" />;
} 