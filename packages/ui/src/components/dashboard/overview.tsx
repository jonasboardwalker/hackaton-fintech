"use client"

import * as React from "react"

import { useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { cn } from "../../lib/utils"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"

interface OverviewProps extends React.HTMLAttributes<HTMLDivElement> {}

// Mock data for the chart - daily
const dailyData = [
  {
    name: "Mon",
    total: 120,
    blocked: 15,
    amount: 12500,
    blockedAmount: 4200,
  },
  {
    name: "Tue",
    total: 180,
    blocked: 22,
    amount: 18600,
    blockedAmount: 6800,
  },
  {
    name: "Wed",
    total: 240,
    blocked: 18,
    amount: 24300,
    blockedAmount: 5400,
  },
  {
    name: "Thu",
    total: 280,
    blocked: 32,
    amount: 29500,
    blockedAmount: 9800,
  },
  {
    name: "Fri",
    total: 300,
    blocked: 40,
    amount: 32000,
    blockedAmount: 12500,
  },
  {
    name: "Sat",
    total: 150,
    blocked: 12,
    amount: 15800,
    blockedAmount: 3600,
  },
  {
    name: "Sun",
    total: 90,
    blocked: 8,
    amount: 9500,
    blockedAmount: 2200,
  },
]

// Mock data for the chart - monthly
const monthlyData = [
  { name: "Jan", total: 2800, blocked: 320, amount: 285000, blockedAmount: 95000 },
  { name: "Feb", total: 3200, blocked: 380, amount: 320000, blockedAmount: 110000 },
  { name: "Mar", total: 3600, blocked: 420, amount: 365000, blockedAmount: 125000 },
  { name: "Apr", total: 3900, blocked: 450, amount: 395000, blockedAmount: 135000 },
  { name: "May", total: 4200, blocked: 480, amount: 425000, blockedAmount: 145000 },
  { name: "Jun", total: 4500, blocked: 510, amount: 455000, blockedAmount: 155000 },
]

// Mock data for the chart - hourly
const hourlyData = [
  { name: "00:00", total: 15, blocked: 2, amount: 1500, blockedAmount: 600 },
  { name: "04:00", total: 8, blocked: 1, amount: 800, blockedAmount: 300 },
  { name: "08:00", total: 45, blocked: 5, amount: 4500, blockedAmount: 1500 },
  { name: "12:00", total: 85, blocked: 10, amount: 8500, blockedAmount: 3000 },
  { name: "16:00", total: 95, blocked: 12, amount: 9500, blockedAmount: 3600 },
  { name: "20:00", total: 40, blocked: 6, amount: 4000, blockedAmount: 1800 },
]

export function Overview({ className }: OverviewProps) {
  const [timeframe, setTimeframe] = useState("daily")
  const [dataType, setDataType] = useState("count")

  // Select data based on timeframe
  const data = timeframe === "daily" ? dailyData : timeframe === "monthly" ? monthlyData : hourlyData

  // Determine which data keys to use based on dataType
  const primaryKey = dataType === "count" ? "total" : "amount"
  const secondaryKey = dataType === "count" ? "blocked" : "blockedAmount"
  const primaryLabel = dataType === "count" ? "Total Transactions" : "Total Amount ($)"
  const secondaryLabel = dataType === "count" ? "Blocked Transactions" : "Blocked Amount ($)"

  return (
    <Card className={cn("col-span-4", className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Transaction Overview</CardTitle>
          <CardDescription>Transaction volume and blocked transactions over time.</CardDescription>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <ToggleGroup type="single" value={timeframe} onValueChange={(value) => value && setTimeframe(value)}>
            <ToggleGroupItem value="hourly" aria-label="Toggle hourly view">
              Hourly
            </ToggleGroupItem>
            <ToggleGroupItem value="daily" aria-label="Toggle daily view">
              Daily
            </ToggleGroupItem>
            <ToggleGroupItem value="monthly" aria-label="Toggle monthly view">
              Monthly
            </ToggleGroupItem>
          </ToggleGroup>

          <ToggleGroup type="single" value={dataType} onValueChange={(value) => value && setDataType(value)}>
            <ToggleGroupItem value="count" aria-label="Show transaction count">
              Count
            </ToggleGroupItem>
            <ToggleGroupItem value="amount" aria-label="Show transaction amount">
              Amount
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => (dataType === "count" ? `${value}` : `$${value / 1000}k`)}
            />
            <Tooltip
              formatter={(value, name) => [
                dataType === "count" ? value : `$${value.toLocaleString()}`,
                name === primaryKey ? primaryLabel : secondaryLabel,
              ]}
            />
            <Bar dataKey={primaryKey} fill="#adfa1d" radius={[4, 4, 0, 0]} name={primaryLabel} />
            <Bar dataKey={secondaryKey} fill="#ef4444" radius={[4, 4, 0, 0]} name={secondaryLabel} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

