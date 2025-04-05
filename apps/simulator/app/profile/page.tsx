import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, LogOut, Settings, Shield } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  return (
    <div className="container px-4 py-6 max-w-md mx-auto">
      <div className="flex items-center mb-6">
        <Link href="/">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>

      <div className="flex flex-col items-center mb-6">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src="/placeholder.svg" alt="Profile" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold">John Doe</h2>
        <p className="text-muted-foreground">john.doe@example.com</p>
        <Badge className="mt-2">Junior</Badge>
      </div>

      <Card className="mb-6 shadow-md">
        <CardHeader>
          <CardTitle>Transaction Limits</CardTitle>
          <CardDescription>Your current spending limits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>Daily limit</span>
            </div>
            <span className="font-medium">€1,000</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>Single transaction</span>
            </div>
            <span className="font-medium">€500</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>Monthly limit</span>
            </div>
            <span className="font-medium">€5,000</span>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Button variant="outline" className="w-full justify-start shadow-sm">
          <Settings className="mr-2 h-4 w-4 text-accent" />
          Account Settings
        </Button>
        <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive shadow-sm">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}

