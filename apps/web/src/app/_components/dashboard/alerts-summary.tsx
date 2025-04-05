"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { AlertTriangle } from "lucide-react"

export function AlertsSummary() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Pending Alerts</CardTitle>
        <AlertTriangle className="h-4 w-4 text-amber-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">7</div>
        <p className="text-xs text-muted-foreground">3 high priority alerts</p>
      </CardContent>
    </Card>
  )
}

