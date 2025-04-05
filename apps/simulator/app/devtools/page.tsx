"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDevTools } from "@/context/dev-tools-context"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function DevToolsPage() {
  const { devOverrides, setDevOverrides } = useDevTools()

  const toggleSuspicious = () => {
    setDevOverrides({
      ...devOverrides,
      isSuspicious: !devOverrides.isSuspicious,
    })
  }

  const toggleAfterHours = () => {
    setDevOverrides({
      ...devOverrides,
      isAfterHours: !devOverrides.isAfterHours,
    })
  }

  const setLocation = (location: string) => {
    setDevOverrides({
      ...devOverrides,
      location,
    })
  }

  const setUserRole = (role: string) => {
    setDevOverrides({
      ...devOverrides,
      userRole: role,
    })
  }

  return (
    <div className="container px-4 py-6 max-w-md mx-auto">
      <div className="flex items-center mb-6">
        <Link href="/">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">DevTools</h1>
      </div>

      <Card className="mb-6 shadow-md">
        <CardHeader>
          <CardTitle>Transaction Overrides</CardTitle>
          <CardDescription>Configure test scenarios for TrustLimit checks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="suspicious">Mark as Suspicious</Label>
              <p className="text-sm text-muted-foreground">Flag transaction for additional review</p>
            </div>
            <Switch id="suspicious" checked={devOverrides.isSuspicious} onCheckedChange={toggleSuspicious} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="after-hours">After Hours</Label>
              <p className="text-sm text-muted-foreground">Simulate transaction outside business hours</p>
            </div>
            <Switch id="after-hours" checked={devOverrides.isAfterHours} onCheckedChange={toggleAfterHours} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">User Location</Label>
            <Select value={devOverrides.location} onValueChange={setLocation}>
              <SelectTrigger id="location">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Germany">Germany</SelectItem>
                <SelectItem value="France">France</SelectItem>
                <SelectItem value="Ukraine">Ukraine</SelectItem>
                <SelectItem value="United States">United States</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">User Role</Label>
            <Select value={devOverrides.userRole} onValueChange={setUserRole}>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="intern">Intern</SelectItem>
                <SelectItem value="junior">Junior</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="executive">Executive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Current Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-md overflow-auto text-xs">{JSON.stringify(devOverrides, null, 2)}</pre>
        </CardContent>
      </Card>
    </div>
  )
}

