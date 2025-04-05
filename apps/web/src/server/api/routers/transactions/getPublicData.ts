import { publicProcedure } from "../../trpc";

export const getPublicData = publicProcedure.query(async ({ ctx }) => {
  return {
    info: "This is publicly accessible data. No auth required!",
    timestamp: new Date(),
  };
}); 