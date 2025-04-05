import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, BarChart3, Clock, CreditCard, DollarSign, Shield } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="container px-4 py-6 space-y-6 max-w-md mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">Your financial dashboard</p>
        </div>
        <Avatar>
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>

      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">€4,750.00</div>
          <div className="flex items-center mt-1 text-xs text-muted-foreground">
            <Badge variant="outline" className="mr-1">
              Junior
            </Badge>
            Daily limit: €1,000
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-3">
        <Link href="/pay" className="block">
          <Button
            className="w-full h-20 flex flex-col group hover:bg-primary/10 hover:text-foreground hover:border-primary"
            variant="outline"
          >
            <DollarSign className="h-5 w-5 mb-1 text-primary" />
            <span className="text-xs">Send</span>
          </Button>
        </Link>

        <Button
          className="w-full h-20 flex flex-col group hover:bg-secondary/10 hover:text-foreground hover:border-secondary"
          variant="outline"
        >
          <CreditCard className="h-5 w-5 mb-1 text-secondary" />
          <span className="text-xs">Cards</span>
        </Button>

        <Link href="/spending" className="block">
          <Button
            className="w-full h-20 flex flex-col group hover:bg-accent/10 hover:text-foreground hover:border-accent"
            variant="outline"
          >
            <BarChart3 className="h-5 w-5 mb-1 text-accent" />
            <span className="text-xs">Spending</span>
          </Button>
        </Link>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <ArrowUpRight className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Transfer to Alex</p>
                    <p className="text-xs text-muted-foreground">Today, 10:30 AM</p>
                  </div>
                </div>
                <p className="font-semibold">-€50.00</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mr-3">
                    <Shield className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium">Salary Deposit</p>
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                  </div>
                </div>
                <p className="font-semibold text-primary">+€2,500.00</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center mr-3">
                    <Clock className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <p className="font-medium">Transaction Denied</p>
                    <p className="text-xs text-muted-foreground">Yesterday, 9:45 PM</p>
                  </div>
                </div>
                <Badge variant="destructive">After hours</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

