"use client";

import { formatDistanceToNow } from "date-fns";
import { CheckCircle2, Clock, CreditCard, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export type Transaction = {
  id: string;
  amount: number;
  currency: string;
  timestamp: string;
  paymentMethod: "card" | "bank_transfer";
  status: "approved" | "denied" | "pending";
  reason?: string;
  merchantName: string;
  location: string;
  isNightTime: boolean;
};

interface TransactionCardProps {
  transaction: Transaction;
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  const {
    amount,
    currency,
    timestamp,
    paymentMethod,
    status,
    reason,
    merchantName,
    location,
    isNightTime,
  } = transaction;

  const formattedAmount = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency,
  }).format(amount);

  const timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true });

  const getStatusIcon = () => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "denied":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
            Approved
          </span>
        );
      case "denied":
        return (
          <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
            Denied
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
            Pending
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="mb-3">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">{merchantName}</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>
                  {paymentMethod === "card" ? "Card Payment" : "Bank Transfer"}
                </span>
                <span className="mx-1">•</span>
                <span>{location}</span>
                {isNightTime && (
                  <>
                    <span className="mx-1">•</span>
                    <span>Night time</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-medium">{formattedAmount}</div>
            <div className="text-sm text-muted-foreground">{timeAgo}</div>
          </div>
        </div>

        <div className="mt-3 flex justify-between items-center">
          <div className="flex items-center">
            {getStatusIcon()}
            <span className="ml-2 text-sm font-medium">{getStatusBadge()}</span>
          </div>
          {status === "denied" && reason && (
            <div className="text-sm text-muted-foreground max-w-[60%] text-right">
              {reason}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
