import { z } from "zod";
import { type Rule, type Transaction } from "@prisma/client";
import { ruleSchema } from "~/utils/rules/rules.schema";

type TransactionCheckInput = {
  transaction: {
    amount: number;
    metadata: Record<string, unknown>;
  };
  previousTransactions: Transaction[];
  rules: Rule[];
};

type BrokenRule = {
  ruleId: string;
  action: "approve" | "block" | "hold";
  alert: boolean;
  reason: string;
};

type Location = {
  lat: number;
  lng: number;
};

type TransactionMetadata = {
  role?: string;
  location?: Location;
  timestamp?: string;
  [key: string]: unknown;
};

type TransactionWithMetadata = {
  amount: number;
  metadata: TransactionMetadata;
};

type RuleWithActive = Rule & {
  active: boolean;
};

type RulePart = z.infer<typeof ruleSchema>["parts"][number];

type CheckFunction = (
  part: RulePart,
  transaction: TransactionWithMetadata,
  previousTransactions: Transaction[],
) => boolean;

// Helper function to calculate window start date
const getWindowStartDate = (windowSize: { type: string; count?: number }) => {
  const now = new Date();

  if (windowSize.type === "days") {
    return new Date(
      now.getTime() - (windowSize.count ?? 0) * 24 * 60 * 60 * 1000,
    );
  } else if (windowSize.type === "months") {
    return new Date(
      now.getFullYear(),
      now.getMonth() - (windowSize.count ?? 0),
      now.getDate(),
    );
  } else {
    // Handle fixed windows
    switch (windowSize.type) {
      case "thisDay":
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
      case "thisWeek":
        return new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - now.getDay(),
        );
      case "thisMonth":
        return new Date(now.getFullYear(), now.getMonth(), 1);
      default:
        return now;
    }
  }
};

// Check amount range rule
const checkAmountRange: CheckFunction = (part, transaction) => {
  if (part.rulePartType !== "amountUsdRange") return true;
  const { min, max } = part;
  if (min !== null && transaction.amount < min) return false;
  if (max !== null && transaction.amount > max) return false;
  return true;
};

// Check transaction velocity rule
const checkTransactionVelocity: CheckFunction = (
  part,
  _,
  previousTransactions,
) => {
  if (part.rulePartType !== "transactionVelocity") return true;
  const { windowSize, count } = part;
  const windowStart = getWindowStartDate(windowSize);
  const transactionsInWindow = previousTransactions.filter(
    (t) => new Date(t.createdAt) >= windowStart,
  );
  return transactionsInWindow.length >= count;
};

// Check transaction amount rule
const checkTransactionAmount: CheckFunction = (
  part,
  _,
  previousTransactions,
) => {
  if (part.rulePartType !== "transactionAmount") return true;
  const { windowSize, amount } = part;
  const windowStart = getWindowStartDate(windowSize);
  const totalAmountInWindow = previousTransactions
    .filter((t) => new Date(t.createdAt) >= windowStart)
    .reduce((sum, t) => sum + t.amount, 0);
  return totalAmountInWindow >= amount;
};

// Check traveling speed rule
const checkTravelingSpeed: CheckFunction = (
  part,
  transaction,
  previousTransactions,
) => {
  if (part.rulePartType !== "travelingSpeed") return true;
  const { maxKmh } = part;
  const currentLocation = transaction.metadata.location;
  if (!currentLocation) return true; // Skip check if no location data

  // Get last transaction with location
  const lastTransaction = previousTransactions.find(
    (t) => (t.metadata as TransactionMetadata).location,
  );
  if (!lastTransaction) return true; // Skip check if no previous location

  const lastLocation = (lastTransaction.metadata as TransactionMetadata)
    .location;
  if (!lastLocation) return true;

  const lastTime = new Date(lastTransaction.createdAt).getTime();
  const currentTime = new Date().getTime();
  const timeDiffHours = (currentTime - lastTime) / (1000 * 60 * 60);

  // Calculate distance using Haversine formula
  const R = 6371; // Earth's radius in km
  const dLat = (currentLocation.lat - lastLocation.lat) * (Math.PI / 180);
  const dLon = (currentLocation.lng - lastLocation.lng) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lastLocation.lat * (Math.PI / 180)) *
      Math.cos(currentLocation.lat * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  const speed = distance / timeDiffHours;
  return speed <= maxKmh;
};

// Check role rule
const checkRole: CheckFunction = (part, transaction) => {
  if (part.rulePartType !== "role") return true;
  const { roles } = part;
  const userRole = transaction.metadata.role;
  if (!userRole) return true; // Skip check if no role data
  return roles.includes(userRole);
};

// Map of rule part types to their check functions
const checkFunctions: Record<string, CheckFunction> = {
  amountUsdRange: checkAmountRange,
  transactionVelocity: checkTransactionVelocity,
  transactionAmount: checkTransactionAmount,
  travelingSpeed: checkTravelingSpeed,
  role: checkRole,
};

export const runTransactionCheck = ({
  transaction,
  previousTransactions,
  rules,
}: TransactionCheckInput): BrokenRule[] => {
  const brokenRules: BrokenRule[] = [];

  // Add fake metadata for testing and cast types once
  const transactionWithMetadata: TransactionWithMetadata = {
    amount: transaction.amount,
    metadata: {
      ...transaction.metadata,
      role: "user", // Example role
      location: { lat: 50.0755, lng: 14.4378 }, // Example location (Prague)
      timestamp: new Date().toISOString(),
    },
  };

  // Cast rules once
  const activeRules = rules.filter((rule) => (rule as RuleWithActive).active);

  for (const rule of activeRules) {
    const parsedRule = ruleSchema.parse(rule);
    let allPartsFulfilled = true;

    for (const part of parsedRule.parts) {
      const checkFunction = checkFunctions[part.rulePartType];
      if (!checkFunction) {
        console.warn(
          `No check function found for rule part type: ${part.rulePartType}`,
        );
        continue;
      }

      allPartsFulfilled = checkFunction(
        part,
        transactionWithMetadata,
        previousTransactions,
      );
      if (!allPartsFulfilled) break;
    }

    if (allPartsFulfilled) {
      brokenRules.push({
        ruleId: rule.id,
        action: parsedRule.action,
        alert: parsedRule.alert,
        reason: parsedRule.reason,
      });
    }
  }

  return brokenRules;
};
