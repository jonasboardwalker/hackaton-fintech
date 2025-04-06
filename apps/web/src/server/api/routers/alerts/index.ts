import { createTRPCRouter } from "../../trpc";
import { getAlerts } from "./getAlerts";
import { resolveAlert } from "./resolveAlert";
import { getPendingAlertsCount } from "./getPendingAlertsCount";

export const alertsRouter = createTRPCRouter({
  getAlerts,
  resolveAlert,
  getPendingAlertsCount,
}); 