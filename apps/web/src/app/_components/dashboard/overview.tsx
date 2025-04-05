import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";

interface OverviewProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Overview({ className, ...props }: OverviewProps) {
  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader>
        <CardTitle>Transaction Overview</CardTitle>
        <CardDescription>
          Summary of recent transaction activity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-[400px] items-center justify-center rounded-md border">
          <p className="text-muted-foreground">
            Transaction overview visualization would appear here.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}