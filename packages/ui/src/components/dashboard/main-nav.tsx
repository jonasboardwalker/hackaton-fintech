import Link from "next/link"
import { ShieldCheck } from "lucide-react"

export function MainNav() {
  return (
    <div className="flex items-center gap-6 md:gap-10">
      <Link href="/dashboard" className="flex items-center space-x-2">
        <ShieldCheck className="h-6 w-6 text-emerald-600" />
        <span className="hidden font-bold sm:inline-block">TrustLimit</span>
      </Link>
    </div>
  )
}

