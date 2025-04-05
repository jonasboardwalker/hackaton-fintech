"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider, useTheme } from "next-themes";
import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "@admin-shad-template/ui";
import React from "react";
import { dark } from "@clerk/themes";

function InnerProviders({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? { baseTheme: dark } : undefined;

  return (
    <ClerkProvider appearance={theme}>
      <TRPCReactProvider>{children}</TRPCReactProvider>
      <Toaster />
    </ClerkProvider>
  );
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <InnerProviders>{children}</InnerProviders>
    </ThemeProvider>
  );
}
