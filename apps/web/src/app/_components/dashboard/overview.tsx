import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@admin-shad-template/ui"
import { cn } from "@admin-shad-template/ui"

interface OverviewProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Overview({ className, ...props }: OverviewProps) {
  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader>
        <CardTitle>Transaction Overview</CardTitle>
        <CardDescription>Summary of recent transaction activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] flex items-center justify-center border rounded-md">
          <p className="text-muted-foreground">Transaction overview visualization would appear here.</p>
        </div>
      </CardContent>
    </Card>
  )
} 