import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SpendingTrendChart } from "@/components/charts/spending-trend-chart"
import Link from "next/link"

export default function SpendingPage() {
  return (
    <div className="container px-4 py-6 max-w-md mx-auto">
      <div className="flex items-center mb-6">
        <Link href="/">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Spending Analysis</h1>
      </div>

      <SpendingTrendChart />
    </div>
  )
}

