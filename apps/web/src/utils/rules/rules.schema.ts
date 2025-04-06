import z from "zod";

const stringListSchema = z.array(z.string().nullable());

export const roleRulePartSchema = z.array(
  z.object({
    rulePartType: z.literal("role"),
    stringListSchema,
  }),
);

export const amountUsdRangeRulePartSchema = z.array(
  z.object({
    rulePartType: z.literal("amountUsdRange"),
    min: z.number().nullable(),
    max: z.number().nullable(),
  }),
);

export const windowSizeFixedSchema = z.object({
  type: z.enum(["thisDay, thisWeek, thisMonth"]),
});
export const windowSizeSlidingSchema = z.object({
  type: z.enum(["days", "months"]),
  count: z.number(),
});

export const windowSizeSchema = z.union([
  windowSizeFixedSchema,
  windowSizeSlidingSchema,
]);

export const transactionVelocityRuleTypeSchema = z.array(
  z.object({
    rulePartType: z.literal("transactionVelocity"),
    windowSizeSchema,
    count: z.number(),
  }),
);

export const transactionAmountRuleTypeSchema = z.array(
  z.object({
    rulePartType: z.literal("transactionAmount"),
    windowSizeSchema,
    amount: z.number(),
  }),
);

const rulePartSchema = z.union([
  roleRulePartSchema,
  amountUsdRangeRulePartSchema,
  transactionVelocityRuleTypeSchema,
  transactionAmountRuleTypeSchema,
]);

export const ruleSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  active: z.boolean(),

  parts: z.array(rulePartSchema),

  action: z.enum(["approve", "block", "hold"]),
  alert: z.boolean(),
  reason: z.string(),
});
