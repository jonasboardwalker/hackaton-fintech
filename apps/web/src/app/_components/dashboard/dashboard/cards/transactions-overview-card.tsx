"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { TransactionStatsEntrySchema } from "~/server/api/routers/dashboard/getTransactionStats.schema";

export const description = "A stacked bar chart with a legend";

const chartConfig = {
  desktop: {
    label: "Allowed",
    color: "var(--positive)",
  },
  mobile: {
    label: "Denied",
    color: "var(--destructive)",
  },
} satisfies ChartConfig;

type Props = {
  data: TransactionStatsEntrySchema[];
  className?: string;
  scope: "daily" | "weekly" | "monthly";
};

export function TransactionsOverviewCard({ className, data, scope }: Props) {
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);

    switch (scope) {
      case "daily":
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      case "weekly":
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      case "monthly":
        return date.toLocaleDateString("en-US", { month: "short" });
      default:
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Transaction Overview</CardTitle>
        <CardDescription>
          {scope === "daily" && "Last 7 days of transactions"}
          {scope === "weekly" && "Last 4 weeks of transactions"}
          {scope === "monthly" && "Last 12 months of transactions"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={formatDate}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="count.allowed"
              stackId="a"
              fill="var(--color-desktop)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="count.denied"
              stackId="a"
              fill="var(--color-mobile)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/*<CardFooter className="flex-col items-start gap-2 text-sm">*/}
      {/*  <div className="flex gap-2 leading-none font-medium">*/}
      {/*    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />*/}
      {/*  </div>*/}
      {/*  <div className="text-muted-foreground leading-none">*/}
      {/*    Showing total visitors for the last 6 months*/}
      {/*  </div>*/}
      {/*</CardFooter>*/}
    </Card>
  );
}
