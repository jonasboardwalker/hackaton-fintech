import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@admin-shad-template/ui"
import { cn } from "@admin-shad-template/ui"

interface TransactionWorldMapProps extends React.HTMLAttributes<HTMLDivElement> {}

export function TransactionWorldMap({ className, ...props }: TransactionWorldMapProps) {
  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader>
        <CardTitle>Transaction World Map</CardTitle>
        <CardDescription>Geographic distribution of transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] flex items-center justify-center border rounded-md">
          <p className="text-muted-foreground">World map visualization would appear here.</p>
        </div>
      </CardContent>
    </Card>
  )
} 