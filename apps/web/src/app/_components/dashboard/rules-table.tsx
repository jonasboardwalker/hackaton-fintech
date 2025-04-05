import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@admin-shad-template/ui"
import { cn } from "@admin-shad-template/ui"

interface RulesTableProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RulesTable({ className, ...props }: RulesTableProps) {
  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader>
        <CardTitle>Transaction Rules</CardTitle>
        <CardDescription>Manage your transaction rules and thresholds</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] flex items-center justify-center border rounded-md">
          <p className="text-muted-foreground">Rules table would appear here.</p>
        </div>
      </CardContent>
    </Card>
  )
} 