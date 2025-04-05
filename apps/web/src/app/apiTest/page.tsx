"use client";

import { api } from "~/trpc/react";
import { useState } from "react";
import Link from "next/link";

const ApiTest = () => {
  const [amount, setAmount] = useState<number>(0);
  const checkTransaction =
    api.transaction.checkTransactionFromApp.useMutation();

  const handleCheckTransaction = () => {
    checkTransaction.mutate({
      amount,
      metadata: {
        location: "Prague",
      },
      clientId: "abc", // TODO: Replace with actual client ID
    });
  };

  const links = [
    { href: "/apiTest/transactions", label: "Transactions" },
    { href: "/apiTest/alerts", label: "Alerts" },
    { href: "/apiTest/dashboard", label: "Dashboard Statistics" },
    { href: "/apiTest/rules", label: "Rules" },
  ];

  return (
    <div className="flex min-h-screen flex-col gap-8 bg-gray-50 p-8">
      <div className="flex w-[400px] flex-col gap-4 border-1 p-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          min="0"
          step="0.01"
        />
        <button
          onClick={handleCheckTransaction}
          className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
          disabled={checkTransaction.isPending}
        >
          {checkTransaction.isPending ? "Checking..." : "Check Transaction"}
        </button>
      </div>
      <div className="max-w-[800px]">
        <h1 className="mb-8 text-3xl font-bold">Browse DB data</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-lg bg-white p-6 shadow-md transition-shadow duration-200 hover:shadow-lg"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {link.label}
              </h2>
              <p className="mt-2 text-gray-600">
                View {link.label.toLowerCase()} data in a table format
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApiTest;
