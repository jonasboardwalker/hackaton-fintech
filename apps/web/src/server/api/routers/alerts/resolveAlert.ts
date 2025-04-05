import { z } from "zod";
import { privateProcedure } from "../../trpc";

export const resolveAlertInputSchema = z.object({
  id: z.string(),
  resolution: z.enum(["approved", "rejected"]),
  notes: z.string().optional(),
});

export const resolveAlert = privateProcedure
  .input(resolveAlertInputSchema)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.user) {
      throw new Error("Not authorized");
    }

    const { id, resolution, notes } = input;

    // First verify the alert belongs to the user
    const existingAlert = await ctx.db.alert.findFirst({
      where: {
        id,
        userId: ctx.user.id,
      },
    });

    if (!existingAlert) {
      throw new Error("Alert not found or not authorized");
    }

    const updatedAlert = await ctx.db.alert.update({
      where: {
        id,
      },
      data: {
        status: "resolved",
        resolution,
        notes,
        resolvedAt: new Date(),
      },
    });

    return updatedAlert;
  }); 