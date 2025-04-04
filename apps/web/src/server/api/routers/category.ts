// EXAMPLE OF PRODEDURE

// import { getLocale } from "~/lib/next-intl/server";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    // const _locale = await getLocale();
    // const categories = await ctx.db.category.findMany({
    //   include: {
    //     translations: {
    //       where: {
    //         locale,
    //       },
    //     },
    //   },
    //   orderBy: {
    //     translations: {
    //       _count: "asc",
    //     },
    //   },
    // });
    // return categories;
  }),
});
