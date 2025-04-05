import { transactionRouter } from "~/server/api/routers/transactions";
import { dashboardRouter } from "~/server/api/routers/dashboard";
import { alertsRouter } from "~/server/api/routers/alerts";

import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
//  * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  transaction: transactionRouter,
  dashboard: dashboardRouter,
  alerts: alertsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
