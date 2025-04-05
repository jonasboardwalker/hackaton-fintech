"use client"

import type { ReactNode } from "react"
import { DevToolsProvider } from "@/context/dev-tools-context"
import { Toaster } from "@/components/ui/toaster"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <DevToolsProvider>
      {children}
      <Toaster />
    </DevToolsProvider>
  )
}

