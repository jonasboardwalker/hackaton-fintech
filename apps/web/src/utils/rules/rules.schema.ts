import z from "zod";

const stringListSchema = z.array(z.string().nullable());

export const roleRulePartSchema = z.object({
  rulePartType: z.literal("role"),
  roles: stringListSchema,
});

export const amountUsdRangeRulePartSchema = z.object({
  rulePartType: z.literal("amountUsdRange"),
  min: z.number().nullable(),
  max: z.number().nullable(),
});

export const windowSizeFixedSchema = z.object({
  type: z.enum(["thisDay", "thisWeek", "thisMonth"]),
});
export const windowSizeSlidingSchema = z.object({
  type: z.enum(["days", "months"]),
  count: z.number(),
});
export const windowSizeSchema = z.union([
  windowSizeFixedSchema,
  windowSizeSlidingSchema,
]);

export const transactionVelocityRulePartSchema = z.object({
  rulePartType: z.literal("transactionVelocity"),
  windowSize: windowSizeSchema,
  count: z.number(),
});

export const transactionAmountRulePartSchema = z.object({
  rulePartType: z.literal("transactionAmount"),
  windowSize: windowSizeSchema,
  amount: z.number(),
});

// New schema for travelingSpeed rule part
export const travelingSpeedRulePartSchema = z.object({
  rulePartType: z.literal("travelingSpeed"),
  maxKmh: z.number(),
});

export const rulePartSchema = z.union([
  roleRulePartSchema,
  amountUsdRangeRulePartSchema,
  transactionVelocityRulePartSchema,
  transactionAmountRulePartSchema,
  travelingSpeedRulePartSchema,
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
