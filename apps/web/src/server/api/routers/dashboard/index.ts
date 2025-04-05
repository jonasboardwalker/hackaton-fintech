import { createTRPCRouter } from "../../trpc";
import { getTransactionStats } from "./getTransactionStats";

export const dashboardRouter = createTRPCRouter({
  getTransactionStats,
}); 