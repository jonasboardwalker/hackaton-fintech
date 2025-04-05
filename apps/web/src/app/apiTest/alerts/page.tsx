import { api } from "~/trpc/server";
import { JsonTable } from "../JsonTable";

export default async function ApiTestAlerts() {
  const alerts = await api.alerts.getAlerts() as Record<string, unknown>[];

  return <JsonTable data={alerts} title="Alerts" />;
} 