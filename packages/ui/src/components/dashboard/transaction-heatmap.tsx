"use client"

import * as React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { cn } from "../../lib/utils"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"

interface TransactionHeatmapProps extends React.HTMLAttributes<HTMLDivElement> {}

// Generate mock data for the heatmap
const generateHeatmapData = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const hours = Array.from({ length: 24 }, (_, i) => i)

  const heatmapData = days.map((day) => {
    const hourData = hours.map((hour) => {
      // Generate random values with higher values during business hours
      const isBusinessHour = hour >= 9 && hour <= 17
      const isWeekend = day === "Sat" || day === "Sun"

      const baseValue = isBusinessHour ? (isWeekend ? 30 : 70) : isWeekend ? 10 : 25
      const randomFactor = Math.random() * 0.5 + 0.75 // 0.75 to 1.25

      const count = Math.floor(baseValue * randomFactor)
      const amount = count * (Math.random() * 100 + 50) // Average $50-150 per transaction

      return {
        hour,
        count,
        amount,
        // Calculate intensity on a scale of 0-9 for CSS classes
        countIntensity: Math.min(9, Math.floor(count / 10)),
        amountIntensity: Math.min(9, Math.floor(amount / 1000)),
      }
    })

    return {
      day,
      hours: hourData,
    }
  })

  return heatmapData
}

const heatmapData = generateHeatmapData()

export function TransactionHeatmap({ className }: TransactionHeatmapProps) {
  const [dataType, setDataType] = useState("count")

  return (
    <Card className={cn("col-span-1", className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Transaction Heatmap</CardTitle>
          <CardDescription>Transaction activity patterns by day and hour.</CardDescription>
        </div>
        <ToggleGroup type="single" value={dataType} onValueChange={(value) => value && setDataType(value)}>
          <ToggleGroupItem value="count" aria-label="Show transaction count">
            Count
          </ToggleGroupItem>
          <ToggleGroupItem value="amount" aria-label="Show transaction amount">
            Amount
          </ToggleGroupItem>
        </ToggleGroup>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="flex mb-1">
              <div className="w-12"></div>
              {Array.from({ length: 24 }, (_, i) => (
                <div key={i} className="w-8 text-center text-xs text-muted-foreground">
                  {i}h
                </div>
              ))}
            </div>

            {heatmapData.map((dayData, dayIndex) => (
              <div key={dayIndex} className="flex mb-1">
                <div className="w-12 flex items-center text-sm font-medium">{dayData.day}</div>
                {dayData.hours.map((hourData, hourIndex) => {
                  const intensity = dataType === "count" ? hourData.countIntensity : hourData.amountIntensity

                  return (
                    <div
                      key={hourIndex}
                      className={`w-8 h-8 rounded-sm m-[1px] flex items-center justify-center text-xs font-medium transition-colors bg-emerald-${intensity}00 hover:bg-emerald-${intensity}00/80`}
                      style={{
                        backgroundColor: `rgba(16, 185, 129, ${intensity / 10})`,
                        color: intensity > 5 ? "white" : "inherit",
                      }}
                      title={`${dayData.day} ${hourData.hour}:00 - ${dataType === "count" ? hourData.count + " transactions" : "$" + hourData.amount.toFixed(0)}`}
                    >
                      {intensity > 0 &&
                        (dataType === "count" ? hourData.count : "$" + (hourData.amount / 1000).toFixed(0) + "k")}
                    </div>
                  )
                })}
              </div>
            ))}

            <div className="flex items-center mt-4">
              <div className="text-xs text-muted-foreground mr-2">Low</div>
              <div className="flex">
                {Array.from({ length: 10 }, (_, i) => (
                  <div key={i} className="w-6 h-4" style={{ backgroundColor: `rgba(16, 185, 129, ${i / 10})` }}></div>
                ))}
              </div>
              <div className="text-xs text-muted-foreground ml-2">High</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

