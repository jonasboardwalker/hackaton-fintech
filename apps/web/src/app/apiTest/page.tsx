"use client";

import { api } from "~/trpc/react";
import { useState } from "react";

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

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Admin Dashboard</h1>

      <div className="space-y-4">
        <div>
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
        </div>

        <button
          onClick={handleCheckTransaction}
          className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
          disabled={checkTransaction.isPending}
        >
          {checkTransaction.isPending ? "Checking..." : "Check Transaction"}
        </button>

        {checkTransaction.data && (
          <div className="mt-4 rounded-md border p-4">
            <p className="font-medium">
              Status: {checkTransaction.data.status}
            </p>
            <p className="text-gray-600">{checkTransaction.data.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiTest;
