import type React from "react";
import { DashboardNav, MainNav, MobileNav } from "@admin-shad-template/ui";
import { UserButton } from "@clerk/nextjs";
import { ModeSwitcher } from "../_components/mode-switcher";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-background sticky top-0 z-40 border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          <div className="hidden gap-x-4 md:flex">
            <ModeSwitcher />
            <UserButton />
          </div>
          <MobileNav />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex lg:w-[240px]">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
