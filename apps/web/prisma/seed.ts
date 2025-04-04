// prisma/seed.ts

import { PrismaClient } from "@prisma/client";
import { randomBytes } from "crypto";

const prisma = new PrismaClient();

function generateApiKey() {
  // returns a 64-char hex string
  return randomBytes(32).toString("hex");
}

async function main() {
  console.log("Seeding database...");

  // 1. Create a sample user (if you want an internal user)
  const user = await prisma.user.create({
    data: {
      email: "testuser@example.com",
      role: "employee",
    },
  });
  console.log("Created user:", user);

  // 2. Create a client with an API key
  const newApiKey = generateApiKey();
  const client = await prisma.client.create({
    data: {
      name: "Acme Inc",
      apiKey: newApiKey,
    },
  });
  console.log("Created client:", {
    ...client,
    apiKey: newApiKey, // The raw key you can hand out
  });

  // 3. Create a sample rule
  const rule = await prisma.rule.create({
    data: {
      name: "Hourly limit for employees",
      description: "Employees can only perform up to 5 transactions/hour",
      role: "employee",
      maxCount: 5,
      period: "hour",
      action: "deny",
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
