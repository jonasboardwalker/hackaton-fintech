"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components//ui/card";
import { ShieldCheck } from "lucide-react";

type Props = {
  count: number;
};

export function TransactionsSummaryCard(props: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Active Rules</CardTitle>
        <ShieldCheck className="h-4 w-4 text-emerald-600" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{props.count}</div>
      </CardContent>
    </Card>
  );
}
