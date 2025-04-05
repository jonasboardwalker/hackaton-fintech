"use client"

import * as React from "react"
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
import { Badge } from "../ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Globe } from "lucide-react"

interface TransactionWorldMapProps extends React.HTMLAttributes<HTMLDivElement> {}

// Mock data for transactions by country
const countryData = [
  { id: "US", name: "United States", count: 1250, amount: 1250000, risk: "low" },
  { id: "CA", name: "Canada", count: 450, amount: 450000, risk: "low" },
  { id: "GB", name: "United Kingdom", count: 780, amount: 780000, risk: "low" },
  { id: "DE", name: "Germany", count: 620, amount: 620000, risk: "low" },
  { id: "FR", name: "France", count: 520, amount: 520000, risk: "low" },
  { id: "ES", name: "Spain", count: 320, amount: 320000, risk: "low" },
  { id: "IT", name: "Italy", count: 280, amount: 280000, risk: "low" },
  { id: "NL", name: "Netherlands", count: 210, amount: 210000, risk: "low" },
  { id: "AU", name: "Australia", count: 380, amount: 380000, risk: "low" },
  { id: "JP", name: "Japan", count: 420, amount: 420000, risk: "low" },
  { id: "CN", name: "China", count: 350, amount: 350000, risk: "medium" },
  { id: "IN", name: "India", count: 290, amount: 290000, risk: "medium" },
  { id: "BR", name: "Brazil", count: 180, amount: 180000, risk: "medium" },
  { id: "MX", name: "Mexico", count: 150, amount: 150000, risk: "medium" },
  { id: "RU", name: "Russia", count: 120, amount: 120000, risk: "high" },
  { id: "ZA", name: "South Africa", count: 90, amount: 90000, risk: "medium" },
  { id: "NG", name: "Nigeria", count: 40, amount: 40000, risk: "high" },
  { id: "UA", name: "Ukraine", count: 60, amount: 60000, risk: "high" },
  { id: "TR", name: "Turkey", count: 110, amount: 110000, risk: "medium" },
  { id: "AE", name: "United Arab Emirates", count: 130, amount: 130000, risk: "low" },
]

// Group countries by region for visualization
const regions = [
  { name: "North America", countries: ["US", "CA", "MX"] },
  { name: "Europe", countries: ["GB", "DE", "FR", "ES", "IT", "NL", "UA", "TR"] },
  { name: "Asia", countries: ["JP", "CN", "IN", "AE"] },
  { name: "South America", countries: ["BR"] },
  { name: "Africa", countries: ["ZA", "NG"] },
  { name: "Oceania", countries: ["AU"] },
]

// Function to get color based on risk level
const getRiskColor = (risk: string) => {
  switch (risk) {
    case "high":
      return "bg-red-500"
    case "medium":
      return "bg-amber-500"
    case "low":
      return "bg-emerald-500"
    default:
      return "bg-emerald-500"
  }
}

export function TransactionWorldMap({ className }: TransactionWorldMapProps) {
  const [dataType, setDataType] = React.useState("count")
  const [riskFilter, setRiskFilter] = React.useState("all")

  // Filter data based on risk level
  const filteredData = riskFilter === "all" ? countryData : countryData.filter((country) => country.risk === riskFilter)

  // Find maximum values for scaling
  const maxCount = Math.max(...filteredData.map((country) => country.count))
  const maxAmount = Math.max(...filteredData.map((country) => country.amount))

  // Get top countries for the legend
  const topCountries = [...filteredData]
    .sort((a, b) => (dataType === "count" ? b.count - a.count : b.amount - a.amount))
    .slice(0, 5)

  return (
    <Card className={`col-span-1 ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Global Transaction Map</CardTitle>
          <CardDescription>Transaction distribution by country.</CardDescription>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <ToggleGroup type="single" value={dataType} onValueChange={(value) => value && setDataType(value)}>
            <ToggleGroupItem value="count" aria-label="Show transaction count">
              Count
            </ToggleGroupItem>
            <ToggleGroupItem value="amount" aria-label="Show transaction amount">
              Amount
            </ToggleGroupItem>
          </ToggleGroup>

          <Select value={riskFilter} onValueChange={setRiskFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Risk Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Risks</SelectItem>
              <SelectItem value="low">Low Risk</SelectItem>
              <SelectItem value="medium">Medium Risk</SelectItem>
              <SelectItem value="high">High Risk</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left side - Top countries */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-medium">Top Countries</h3>
            </div>
            <div className="space-y-3">
              {topCountries.map((country) => (
                <div key={country.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getRiskColor(country.risk)}`}></div>
                    <span>{country.name}</span>
                  </div>
                  <div className="font-medium">
                    {dataType === "count"
                      ? `${country.count.toLocaleString()} txns`
                      : `$${(country.amount / 1000).toLocaleString()}k`}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <h3 className="font-medium mb-2">Risk Levels</h3>
              <div className="flex gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  Low
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  Medium
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  High
                </Badge>
              </div>
            </div>
          </div>

          {/* Right side - Region visualization */}
          <div className="space-y-4">
            <div className="h-[400px] w-full">
              <ComposableMap>
                <ZoomableGroup>
                  <Geographies geography="/world-110m.json">
                    {({ geographies }) =>
                      geographies.map((geo) => {
                        const country = filteredData.find((c) => c.id === geo.properties.ISO_A2)
                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            style={{
                              default: {
                                fill: country ? getRiskColor(country.risk) : "#e2e8f0",
                                stroke: "#fff",
                                strokeWidth: 0.5,
                                outline: "none",
                              },
                              hover: {
                                fill: country ? getRiskColor(country.risk) : "#e2e8f0",
                                stroke: "#fff",
                                strokeWidth: 0.5,
                                outline: "none",
                                opacity: 0.8,
                              },
                            }}
                          />
                        )
                      })
                    }
                  </Geographies>
                </ZoomableGroup>
              </ComposableMap>
            </div>
            <h3 className="font-medium">Regional Distribution</h3>
            <div className="space-y-4">
              {regions.map((region) => {
                // Calculate region totals
                const regionCountries = filteredData.filter((country) => region.countries.includes(country.id))

                const regionTotal = regionCountries.reduce(
                  (sum, country) => sum + (dataType === "count" ? country.count : country.amount),
                  0,
                )

                // Calculate percentage of global total
                const globalTotal = filteredData.reduce(
                  (sum, country) => sum + (dataType === "count" ? country.count : country.amount),
                  0,
                )

                const percentage = globalTotal ? Math.round((regionTotal / globalTotal) * 100) : 0

                // Get risk level for region (highest risk of any country)
                const regionRisk = regionCountries.length
                  ? regionCountries.reduce((highest, country) => {
                      const riskLevel = { low: 1, medium: 2, high: 3 }
                      return riskLevel[country.risk as keyof typeof riskLevel] >
                        riskLevel[highest as keyof typeof riskLevel]
                        ? country.risk
                        : highest
                    }, "low")
                  : "low"

                return (
                  <div key={region.name} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{region.name}</span>
                      <span className="text-sm font-medium">
                        {dataType === "count"
                          ? `${regionTotal.toLocaleString()} txns`
                          : `$${(regionTotal / 1000).toLocaleString()}k`}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${getRiskColor(regionRisk as string)}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-muted-foreground">{percentage}% of total</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Country list with risk indicators */}
        <div className="mt-6 border-t pt-4">
          <h3 className="font-medium mb-3">All Countries</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {filteredData.map((country) => (
              <div key={country.id} className="flex items-center gap-1.5 text-sm">
                <div className={`w-2 h-2 rounded-full ${getRiskColor(country.risk)}`}></div>
                <span className="truncate">{country.name}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

