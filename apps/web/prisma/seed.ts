// prisma/seed.ts

import { PrismaClient, type Prisma } from "@prisma/client";
import { ruleSchema } from "~/utils/rules/rules.schema";
import z from "zod";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Find the last user
  const user = await prisma.user.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!user) throw new Error("No user in db");
  console.log("Found user:", user);

  // 2. Create a client
  const client = await prisma.client.create({
    data: {
      email: "client@example.com",
      user: {
        connect: {
          id: user.id,
        },
      },
    } satisfies Prisma.ClientCreateInput,
  });
  console.log("Created client:", {
    ...client,
  });

  // 3. Create sample rules
  const rules = await Promise.all([
    // High Value Transaction Rule
    prisma.rule.create({
      data: {
        ...({
          name: "High Value Transaction Alert",
          description: "Alert on transactions over $10,000",
          parts: [
            {
              rulePartType: "amountUsdRange",
              min: 10000,
              max: null,
            },
          ],
          action: "hold",
          active: true,
          alert: true,
          reason: "High value transaction detected",
        } satisfies z.infer<typeof ruleSchema>),
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    }),
    // Transaction Velocity Rule
    prisma.rule.create({
      data: {
        ...({
          name: "Suspicious Transaction Frequency",
          description: "Alert on more than 10 transactions in a day",
          parts: [
            {
              rulePartType: "transactionVelocity",
              windowSize: {
                type: "days",
                count: 1,
              },
              count: 10,
            },
          ],
          action: "block",
          active: true,
          alert: true,
          reason: "Suspicious transaction frequency detected",
        } satisfies z.infer<typeof ruleSchema>),
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    }),
    // Combined Rule
    prisma.rule.create({
      data: {
        ...({
          name: "Complex Transaction Monitoring",
          description: "Monitor large transactions with velocity checks",
          parts: [
            {
              rulePartType: "amountUsdRange",
              min: 5000,
              max: null,
            },
            {
              rulePartType: "transactionVelocity",
              windowSize: {
                type: "days",
                count: 7,
              },
              count: 5,
            },
          ],
          action: "hold",
          active: true,
          alert: true,
          reason: "Complex transaction monitoring triggered",
        } satisfies z.infer<typeof ruleSchema>),
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    }),
  ]);

  console.log("Created rules:", rules);

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
