"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Sample data for spending trend
const fullData = [
  { month: "Jan", actual: 1200, projected: 1200 },
  { month: "Feb", actual: 1350, projected: 1350 },
  { month: "Mar", actual: 1100, projected: 1100 },
  { month: "Apr", actual: 1450, projected: 1450 },
  { month: "May", actual: 1300, projected: 1300 },
  { month: "Jun", actual: 1600, projected: 1600 },
  { month: "Jul", actual: 1800, projected: 1800 },
  { month: "Aug", actual: null, projected: 1700 },
  { month: "Sep", actual: null, projected: 1900 },
  { month: "Oct", actual: null, projected: 1850 },
  { month: "Nov", actual: null, projected: 2000 },
  { month: "Dec", actual: null, projected: 2200 },
]

export function SpendingTrendChart() {
  const [data, setData] = useState<typeof fullData>([])
  const [animationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    // Reset animation when component mounts
    setData([])
    setAnimationComplete(false)

    // Animate the chart by gradually adding data points
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex < fullData.length) {
        setData((prev) => [...prev, fullData[currentIndex]])
        currentIndex++
      } else {
        clearInterval(interval)
        setAnimationComplete(true)
      }
    }, 300)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Spending Trend</CardTitle>
        <CardDescription>Actual vs projected spending for the year</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            actual: {
              label: "Actual Spending",
              color: "hsl(var(--primary))",
            },
            projected: {
              label: "Projected Spending",
              color: "hsl(var(--secondary))",
            },
          }}
        >
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 10 }}>
                <XAxis
                  dataKey="month"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  angle={-45}
                  textAnchor="end"
                  height={50}
                  interval={0}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `€${value}`}
                  width={60}
                />
                <ChartTooltip
                  content={<ChartTooltipContent formatValue={(value) => `€${value}`} />}
                  cursor={{ stroke: "hsl(var(--muted-foreground))", strokeWidth: 1, strokeDasharray: "5 5" }}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="var(--color-actual)"
                  strokeWidth={3}
                  dot={{
                    fill: "var(--color-actual)",
                    r: 4,
                    strokeWidth: 0,
                  }}
                  activeDot={{
                    fill: "var(--color-actual)",
                    r: 6,
                    stroke: "hsl(var(--background))",
                    strokeWidth: 2,
                  }}
                  isAnimationActive={true}
                  animationDuration={1000}
                />
                <Line
                  type="monotone"
                  dataKey="projected"
                  stroke="var(--color-projected)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{
                    fill: "var(--color-projected)",
                    r: 4,
                    strokeWidth: 0,
                  }}
                  activeDot={{
                    fill: "var(--color-projected)",
                    r: 6,
                    stroke: "hsl(var(--background))",
                    strokeWidth: 2,
                  }}
                  isAnimationActive={true}
                  animationDuration={1000}
                  animationBegin={500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>

        <div className="mt-6 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-primary mr-2" />
            <span className="text-sm">
              Actual: €{data.reduce((sum, item) => sum + (item.actual || 0), 0).toLocaleString()}
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-secondary mr-2" />
            <span className="text-sm">
              Projected: €
              {animationComplete ? fullData.reduce((sum, item) => sum + item.projected, 0).toLocaleString() : "..."}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

