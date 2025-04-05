"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { cn } from "~/lib/utils";

interface RecentTransactionsProps
  extends React.HTMLAttributes<HTMLDivElement> {}

// Mock data for recent transactions
const transactions = [
  {
    id: "TX123456",
    user: "Sarah Johnson",
    amount: "$1,250.00",
    status: "approved",
    date: "2023-04-23T18:25:43.511Z",
    rule: "Business Hours",
  },
  {
    id: "TX123457",
    user: "Michael Chen",
    amount: "$5,000.00",
    status: "blocked",
    date: "2023-04-23T20:43:23.511Z",
    rule: "After Hours Limit",
  },
  {
    id: "TX123458",
    user: "Alex Rodriguez",
    amount: "$750.00",
    status: "approved",
    date: "2023-04-23T15:25:43.511Z",
    rule: "Junior Staff Limit",
  },
  {
    id: "TX123459",
    user: "Emily Wong",
    amount: "$3,500.00",
    status: "pending",
    date: "2023-04-23T16:25:43.511Z",
    rule: "Manager Approval",
  },
  {
    id: "TX123460",
    user: "David Kim",
    amount: "$2,100.00",
    status: "approved",
    date: "2023-04-23T14:25:43.511Z",
    rule: "Business Hours",
  },
];

export function RecentTransactions({ className }: RecentTransactionsProps) {
  return (
    <Card className={cn("col-span-3", className)}>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>
          Latest transaction activity across your platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center">
              <div className="space-y-1">
                <p className="text-sm leading-none font-medium">
                  {transaction.user}
                </p>
                <p className="text-muted-foreground text-sm">
                  {transaction.amount}
                </p>
              </div>
              <div className="ml-auto flex flex-col items-end gap-1">
                <Badge
                  variant={
                    transaction.status === "approved"
                      ? "outline"
                      : transaction.status === "blocked"
                        ? "destructive"
                        : "secondary"
                  }
                  className="capitalize"
                >
                  {transaction.status}
                </Badge>
                <p className="text-muted-foreground text-xs">
                  {new Date(transaction.date).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
