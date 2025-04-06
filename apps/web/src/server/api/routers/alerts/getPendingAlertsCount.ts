import { privateProcedure } from "../../trpc";

export const getPendingAlertsCount = privateProcedure.query(async ({ ctx }) => {
  if (!ctx.user) {
    throw new Error("Not authorized");
  }

  const count = await ctx.db.alert.count({
    where: {
      userId: ctx.user.id,
      status: "open",
    },
  });

  return count ?? 0;
});