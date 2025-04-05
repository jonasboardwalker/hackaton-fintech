// prisma/seed.ts

import { PrismaClient } from "@prisma/client";
import { generateApiKey } from "~/utils/common";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Create a sample user with Clerk ID
  const user = await prisma.user.create({
    data: {
      clerkId: "user_2test123", // This would typically come from Clerk
      apiKey: generateApiKey(),
    },
  });
  console.log("Created user:", user);

  // 2. Create a client
  const client = await prisma.client.create({
    data: {
      email: "client@example.com",
      role: "admin",
      userId: user.id,
    },
  });
  console.log("Created client:", {
    ...client,
  });

  // 3. Create a sample rule
  const rule = await prisma.rule.create({
    data: {
      name: "High Value Transaction Alert",
      description: "Alert on transactions over $10,000",
      parameters: {
        threshold: 10000,
        currency: "USD",
      },
      action: "alert",
      userId: user.id,
    },
  });
  console.log("Created rule:", rule);

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
