import type { Metadata } from "next"
import { DashboardHeader } from "../../_components/dashboard/dashboard-header"
import { DashboardShell } from "../../_components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@admin-shad-template/ui"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@admin-shad-template/ui"
import { Overview } from "../../_components/dashboard/overview"
import { TransactionWorldMap } from "../../_components/dashboard/transaction-world-map"

export const metadata: Metadata = {
  title: "Analytics | TrustLimit",
  description: "Transaction analytics and insights",
}

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Analytics" text="Detailed transaction analytics and insights." />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
          <TabsTrigger value="rules">Rule Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <Overview className="col-span-1" />
          <TransactionWorldMap className="col-span-1" />
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Transaction Patterns</CardTitle>
              <CardDescription>Identify patterns and anomalies in transaction behavior.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Pattern analysis visualization would appear here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Rule Performance</CardTitle>
              <CardDescription>Analyze the effectiveness of your transaction rules.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Rule performance metrics would appear here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

