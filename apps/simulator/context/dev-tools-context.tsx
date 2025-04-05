"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface DevToolsOverrides {
  isSuspicious: boolean
  isAfterHours: boolean
  location: string
  userRole: string
}

interface DevToolsContextType {
  devOverrides: DevToolsOverrides
  setDevOverrides: (overrides: DevToolsOverrides) => void
}

const DevToolsContext = createContext<DevToolsContextType | undefined>(undefined)

export function DevToolsProvider({ children }: { children: ReactNode }) {
  const [devOverrides, setDevOverrides] = useState<DevToolsOverrides>({
    isSuspicious: false,
    isAfterHours: false,
    location: "Germany",
    userRole: "junior",
  })

  return <DevToolsContext.Provider value={{ devOverrides, setDevOverrides }}>{children}</DevToolsContext.Provider>
}

export function useDevTools() {
  const context = useContext(DevToolsContext)
  if (context === undefined) {
    throw new Error("useDevTools must be used within a DevToolsProvider")
  }
  return context
}

