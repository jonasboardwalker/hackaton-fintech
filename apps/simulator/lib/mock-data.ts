import { Transaction } from "@/components/transaction-card";
import { subDays, subHours, subMinutes } from "date-fns";

// Generate a random amount between min and max
const randomAmount = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Generate a random merchant name
const merchants = [
  "Amazon",
  "Netflix",
  "Spotify",
  "Uber",
  "Airbnb",
  "Apple",
  "Google",
  "Microsoft",
  "Facebook",
  "Twitter",
  "Instagram",
  "LinkedIn",
  "YouTube",
  "Twitch",
  "Discord",
  "Slack",
  "Zoom",
  "Shopify",
  "Stripe",
  "PayPal",
];

// Generate a random location
const locations = ["DE", "FR", "UK", "US", "ES", "IT", "NL", "BE", "CH", "AT"];

// Generate a random reason for denial
const denialReasons = [
  "Suspicious activity",
  "Amount exceeds daily limit",
  "Unusual location",
  "Night time transaction",
  "New device",
  "Account age too low",
  "Multiple failed attempts",
  "IP address flagged",
  "Device fingerprint mismatch",
  "Transaction pattern anomaly",
];

// Generate mock transactions
export const mockTransactions: Transaction[] = [
  {
    id: "tx_1",
    amount: 29.99,
    currency: "EUR",
    timestamp: subMinutes(new Date(), 5).toISOString(),
    paymentMethod: "card",
    status: "approved",
    merchantName: "Netflix",
    location: "DE",
    isNightTime: false,
  },
  {
    id: "tx_2",
    amount: 49.99,
    currency: "EUR",
    timestamp: subHours(new Date(), 2).toISOString(),
    paymentMethod: "card",
    status: "denied",
    reason: "Amount exceeds daily limit",
    merchantName: "Amazon",
    location: "US",
    isNightTime: false,
  },
  {
    id: "tx_3",
    amount: 9.99,
    currency: "EUR",
    timestamp: subHours(new Date(), 5).toISOString(),
    paymentMethod: "card",
    status: "approved",
    merchantName: "Spotify",
    location: "DE",
    isNightTime: false,
  },
  {
    id: "tx_4",
    amount: 120.5,
    currency: "EUR",
    timestamp: subHours(new Date(), 8).toISOString(),
    paymentMethod: "bank_transfer",
    status: "pending",
    merchantName: "Airbnb",
    location: "FR",
    isNightTime: false,
  },
  {
    id: "tx_5",
    amount: 999.99,
    currency: "EUR",
    timestamp: subDays(new Date(), 1).toISOString(),
    paymentMethod: "card",
    status: "denied",
    reason: "Suspicious activity",
    merchantName: "Apple",
    location: "UK",
    isNightTime: true,
  },
  {
    id: "tx_6",
    amount: 15.0,
    currency: "EUR",
    timestamp: subDays(new Date(), 1).toISOString(),
    paymentMethod: "card",
    status: "approved",
    merchantName: "Uber",
    location: "DE",
    isNightTime: true,
  },
  {
    id: "tx_7",
    amount: 75.25,
    currency: "EUR",
    timestamp: subDays(new Date(), 2).toISOString(),
    paymentMethod: "card",
    status: "approved",
    merchantName: "Google",
    location: "US",
    isNightTime: false,
  },
  {
    id: "tx_8",
    amount: 250.0,
    currency: "EUR",
    timestamp: subDays(new Date(), 2).toISOString(),
    paymentMethod: "bank_transfer",
    status: "denied",
    reason: "Unusual location",
    merchantName: "Microsoft",
    location: "ES",
    isNightTime: false,
  },
  {
    id: "tx_9",
    amount: 5.99,
    currency: "EUR",
    timestamp: subDays(new Date(), 3).toISOString(),
    paymentMethod: "card",
    status: "approved",
    merchantName: "Facebook",
    location: "DE",
    isNightTime: false,
  },
  {
    id: "tx_10",
    amount: 199.99,
    currency: "EUR",
    timestamp: subDays(new Date(), 3).toISOString(),
    paymentMethod: "card",
    status: "denied",
    reason: "Night time transaction",
    merchantName: "Twitter",
    location: "UK",
    isNightTime: true,
  },
  {
    id: "tx_11",
    amount: 45.0,
    currency: "EUR",
    timestamp: subDays(new Date(), 4).toISOString(),
    paymentMethod: "card",
    status: "approved",
    merchantName: "Instagram",
    location: "FR",
    isNightTime: false,
  },
  {
    id: "tx_12",
    amount: 89.99,
    currency: "EUR",
    timestamp: subDays(new Date(), 4).toISOString(),
    paymentMethod: "bank_transfer",
    status: "pending",
    merchantName: "LinkedIn",
    location: "DE",
    isNightTime: false,
  },
  {
    id: "tx_13",
    amount: 12.99,
    currency: "EUR",
    timestamp: subDays(new Date(), 5).toISOString(),
    paymentMethod: "card",
    status: "approved",
    merchantName: "YouTube",
    location: "US",
    isNightTime: false,
  },
  {
    id: "tx_14",
    amount: 1500.0,
    currency: "EUR",
    timestamp: subDays(new Date(), 5).toISOString(),
    paymentMethod: "bank_transfer",
    status: "denied",
    reason: "Amount exceeds daily limit",
    merchantName: "Twitch",
    location: "DE",
    isNightTime: true,
  },
  {
    id: "tx_15",
    amount: 8.99,
    currency: "EUR",
    timestamp: subDays(new Date(), 6).toISOString(),
    paymentMethod: "card",
    status: "approved",
    merchantName: "Discord",
    location: "UK",
    isNightTime: false,
  },
];

// Generate random transactions for testing
export const generateRandomTransactions = (count: number): Transaction[] => {
  const transactions: Transaction[] = [];

  for (let i = 0; i < count; i++) {
    const id = `tx_${Math.random().toString(36).substring(2, 9)}`;
    const amount = randomAmount(5, 2000);
    const currency = "EUR";
    const timestamp = subMinutes(
      new Date(),
      randomAmount(5, 60 * 24 * 7),
    ).toISOString();
    const paymentMethod = Math.random() > 0.7 ? "bank_transfer" : "card";
    const status =
      Math.random() > 0.7
        ? "denied"
        : Math.random() > 0.9
          ? "pending"
          : "approved";
    const merchantName =
      merchants[Math.floor(Math.random() * merchants.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const isNightTime = Math.random() > 0.8;

    const transaction: Transaction = {
      id,
      amount,
      currency,
      timestamp,
      paymentMethod,
      status,
      merchantName,
      location,
      isNightTime,
    };

    if (status === "denied") {
      transaction.reason =
        denialReasons[Math.floor(Math.random() * denialReasons.length)];
    }

    transactions.push(transaction);
  }

  return transactions.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );
};
