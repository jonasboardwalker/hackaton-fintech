import { createTRPCRouter } from "../../trpc";
import { getAlerts } from "./getAlerts";
import { resolveAlert } from "./resolveAlert";

export const alertsRouter = createTRPCRouter({
  getAlerts,
  resolveAlert,
}); 