import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";

interface RulesTableProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RulesTable({ className, ...props }: RulesTableProps) {
  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader>
        <CardTitle>Transaction Rules</CardTitle>
        <CardDescription>
          Manage your transaction rules and thresholds
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-[400px] items-center justify-center rounded-md border">
          <p className="text-muted-foreground">
            Rules table would appear here.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}