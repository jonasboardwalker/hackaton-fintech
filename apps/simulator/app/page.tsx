import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpRight,
  BarChart3,
  Clock,
  CreditCard,
  DollarSign,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { mockTransactions } from "@/lib/mock-data";
import { TransactionCard } from "@/components/transaction-card";
import { ScrollArea } from "@/components/ui/scroll-area";

type TransactionMetadata = {
  // Transaction core
  transactionId: string;
  userId: string;
  amount: number; // in EUR
  currency: string;
  timestamp: string; // ISO 8601
  paymentMethod: "card" | "bank_transfer";

  // User context
  accountAgeDays: number;

  // Device info
  deviceId: string;
  deviceFingerprint: string;
  isNewDevice: boolean;

  // Network info, Geo behavior
  ipAddress: string;
  location: string; // e.g., 'DE', 'FR', 'CZ'

  // Timing
  isNightTime: boolean; // 00:00–04:00 local time
};

export default function Home() {
  return (
    <div className="flex flex-col h-[calc(100svh-theme(space.20))] overflow-hidden">
      <div className="flex-none p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground">Your financial dashboard</p>
          </div>
          <Avatar>
            <AvatarImage src="/placeholder.svg" alt="Avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>

        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Available Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">€4,750.00</div>
            <div className="flex items-center mt-1 text-xs text-muted-foreground">
              <Badge variant="outline" className="mr-1">
                Junior
              </Badge>
              Daily limit: €1,000
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-3 gap-3">
          <Link href="/pay" className="block">
            <Button
              className="w-full h-20 flex flex-col group hover:bg-primary/10 hover:text-foreground hover:border-primary"
              variant="outline"
            >
              <DollarSign className="h-5 w-5 mb-1 text-primary" />
              <span className="text-xs">Send</span>
            </Button>
          </Link>

          <Button
            className="w-full h-20 flex flex-col group hover:bg-secondary/10 hover:text-foreground hover:border-secondary"
            variant="outline"
          >
            <CreditCard className="h-5 w-5 mb-1 text-secondary" />
            <span className="text-xs">Cards</span>
          </Button>

          <Button
            className="w-full h-20 flex flex-col group hover:bg-accent/10 hover:text-foreground hover:border-accent"
            variant="outline"
          >
            <BarChart3 className="h-5 w-5 mb-1 text-accent" />
            <span className="text-xs">Spending</span>
          </Button>
        </div>

        <div className="flex flex-col gap-y-1">
          <h2 className="text-xl font-bold">Recent Activity</h2>
          <p className="text-sm text-gray-500">
            Your recent transactions and activity
          </p>
        </div>
      </div>

      <div className="relative flex-1 px-4 pb-4 overflow-hidden">
        {/* Top gradient overlay */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-background to-transparent z-10"></div>

        {/* Scrollable content */}
        <ScrollArea data-state="hidden" className="h-full">
          <div className="space-y-4">
            {mockTransactions.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </ScrollArea>

        {/* Bottom gradient overlay */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-background to-transparent z-10"></div>
      </div>
    </div>
  );
}
