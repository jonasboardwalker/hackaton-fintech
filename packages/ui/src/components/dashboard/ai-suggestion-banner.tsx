"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Lightbulb, X, ChevronRight, Check } from "lucide-react"

export function AiSuggestionBanner() {
  const [isVisible, setIsVisible] = React.useState(true)
  const [currentSuggestion, setCurrentSuggestion] = React.useState(0)

  // Mock AI suggestions based on resolved tickets
  const suggestions = [
    {
      id: "sugg-001",
      title: "Adjust After Hours Limit",
      description:
        "Based on 12 false positives in the last week, consider increasing the after-hours transaction limit from $1,000 to $2,500 for manager roles.",
      impact: "Would have prevented 9 out of 12 false positives",
      confidence: "high",
      ruleId: "RULE-002",
    },
    {
      id: "sugg-002",
      title: "Refine Geo-Restriction Rule",
      description:
        "Multiple legitimate transactions from Canada are being blocked. Consider adding Canada to your whitelist of approved countries.",
      impact: "Would have allowed 15 legitimate transactions",
      confidence: "medium",
      ruleId: "RULE-004",
    },
    {
      id: "sugg-003",
      title: "Optimize Velocity Control",
      description:
        "The current velocity control (>5 transactions in 10 min) is too restrictive for support agents during peak hours.",
      impact: "Would reduce alerts by approximately 35% during business hours",
      confidence: "high",
      ruleId: "RULE-005",
    },
  ]

  if (!isVisible || suggestions.length === 0) {
    return null
  }

  const suggestion = suggestions[currentSuggestion]
  if (!suggestion) {
    return null
  }

  return (
    <Card className="mb-6 border-l-4 border-l-amber-500">
      <CardHeader className="pb-2 flex flex-row items-start justify-between">
        <div className="flex items-center">
          <Lightbulb className="h-5 w-5 text-amber-500 mr-2" />
          <div>
            <CardTitle className="text-lg">AI-Suggested Rule Improvement</CardTitle>
            <CardDescription>Based on analysis of resolved alerts and false positives</CardDescription>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsVisible(false)}>
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-base">{suggestion.title}</h3>
            <Badge variant={suggestion.confidence === "high" ? "default" : "outline"} className="capitalize">
              {suggestion.confidence} confidence
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{suggestion.description}</p>
          <div className="text-sm bg-muted p-2 rounded-md">
            <span className="font-medium">Potential impact:</span> {suggestion.impact}
          </div>
          <div className="text-sm">
            <span className="font-medium">Applies to rule:</span> {suggestion.ruleId}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <div className="flex items-center text-sm text-muted-foreground">
          Suggestion {currentSuggestion + 1} of {suggestions.length}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentSuggestion((prev) => (prev + 1) % suggestions.length)}
            disabled={suggestions.length <= 1}
          >
            Next suggestion
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
          <Button size="sm">
            <Check className="mr-1 h-4 w-4" />
            Apply suggestion
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

