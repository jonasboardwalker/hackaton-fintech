import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@admin-shad-template/ui";
import FaultyTransactionsMap from "../heat-map/heat-map";

type Props = {
  className?: string;
};

export function TransactionWorldMap({ className }: Props) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Transaction World Map</CardTitle>
        <CardDescription>
          Geographic distribution of transactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-[400px] items-center justify-center rounded-md border">
          <FaultyTransactionsMap />
        </div>
      </CardContent>
    </Card>
  );
}
