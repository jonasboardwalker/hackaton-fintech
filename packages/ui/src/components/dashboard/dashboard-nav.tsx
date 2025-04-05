"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "../../lib/utils"
import { AlertCircle, BarChart3, FileText, Home, Settings, ShieldAlert } from "lucide-react"

const items = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Rules",
    href: "/dashboard/rules",
    icon: ShieldAlert,
  },
  {
    title: "Transactions",
    href: "/dashboard/transactions",
    icon: FileText,
  },
  {
    title: "Alerts",
    href: "/dashboard/alerts",
    icon: AlertCircle,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="grid items-start gap-2 py-6">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
          )}
        >
          <item.icon className="mr-2 h-4 w-4" />
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  )
}

