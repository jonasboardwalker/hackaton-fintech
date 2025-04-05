import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";

interface TransactionWorldMapProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function TransactionWorldMap({
  className,
  ...props
}: TransactionWorldMapProps) {
  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader>
        <CardTitle>Transaction World Map</CardTitle>
        <CardDescription>
          Geographic distribution of transactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-[400px] items-center justify-center rounded-md border">
          <p className="text-muted-foreground">
            World map visualization would appear here.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}