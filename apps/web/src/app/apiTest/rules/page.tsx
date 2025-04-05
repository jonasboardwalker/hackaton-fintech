import { api } from "~/trpc/server";
import { JsonTable } from "../JsonTable";

export default async function ApiTestRules() {
  const rules = await api.rules.getRules() as Record<string, unknown>[];

  return <JsonTable data={rules} title="Rules" />;
} 