// prisma/seed.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const transactionTypes = ['payment', 'transfer', 'deposit', 'withdrawal'] as const;
const categories = ['groceries', 'entertainment', 'utilities', 'transport', 'shopping', 'dining'] as const;
const locations = ['Germany', 'France', 'Spain', 'Italy', 'UK', 'Netherlands'] as const;

async function main() {
  console.log("Seeding database...");

  // 1. Find the last user
  const user = await prisma.user.findFirst({
    where: {
      id: "a8057685-8109-4442-a960-1972c0a5aa5b",
    },
  });

  if (!user) throw new Error("No user in db");
  console.log("Found user:", user);

  // Create multiple transactions
  const numberOfTransactions = 50000;
  const transactions = [];

  for (let i = 0; i < numberOfTransactions; i++) {
    const type = transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    
    // Generate a date within the last 6 months, with more recent dates being more likely
    const daysAgo = Math.floor(Math.random() * 400);
    const hoursAgo = Math.floor(Math.random() * 24);
    const minutesAgo = Math.floor(Math.random() * 60);

    const status = Math.floor(Math.random() * 1000) < 15 ? 'denied' : 'allowed';

    const createdAt = new Date(
      Date.now() - (daysAgo * 24 * 60 * 60 * 1000) - (hoursAgo * 60 * 60 * 1000) - (minutesAgo * 60 * 1000)
    );

    // Generate amount based on transaction type and category
    let amount = 0; // Default value
    switch (type) {
      case 'payment':
        amount = Math.floor(Math.random() * 5000) + 1;
        break;
      case 'transfer':
        amount = Math.floor(Math.random() * 10000) + 1000;
        break;
      case 'deposit':
        amount = Math.floor(Math.random() * 20000) + 5000;
        break;
      case 'withdrawal':
        amount = Math.floor(Math.random() * 2000) + 100;
        break;
      default:
        amount = Math.floor(Math.random() * 1000) + 1;
    }

    transactions.push({
      userId: user.id,
      clientId: "a655a3c6-338c-4d6c-9149-b2f0ffd98c51",
      createdAt,
      amount,
      status,
      metadata: JSON.stringify({
        type,
        category,
        location,
        merchant: `Merchant ${Math.floor(Math.random() * 1000)}`,
        description: `${type} for ${category} in ${location}`,
      }),
    });
  }

  // Create all transactions in a single batch
  await prisma.transaction.createMany({
    data: transactions,
  });

  console.log(`Created ${transactions.length} transactions`);
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
