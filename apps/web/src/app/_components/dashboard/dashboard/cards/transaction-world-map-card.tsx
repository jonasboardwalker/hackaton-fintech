import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import FaultyTransactionsMap from "./heat-map/heat-map";
import { TransactionStatsEntrySchema } from "~/server/api/routers/dashboard/getTransactionStats.schema";

type Props = {
  data: TransactionStatsEntrySchema[];
  className?: string;
  scope: "daily" | "weekly" | "monthly";
};

export function TransactionWorldMapCard(props: Props) {
  return (
    <Card className={props.className}>
      <CardHeader>
        <CardTitle>Transaction World Map</CardTitle>
        <CardDescription>
          {props.scope === "daily" && "Last 7 days of transaction activity"}
          {props.scope === "weekly" && "Last 4 weeks of transaction activity"}
          {props.scope === "monthly" && "Last 12 months of transaction activity"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-[400px] items-center justify-center rounded-md border">
          <FaultyTransactionsMap scope={props.scope} data={props.data} />
        </div>
      </CardContent>
    </Card>
  );
}