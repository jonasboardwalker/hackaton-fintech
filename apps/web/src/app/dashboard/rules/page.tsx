import type { Metadata } from "next";
import { DashboardHeader } from "../../_components/dashboard/dashboard-header";
import { DashboardShell } from "../../_components/dashboard/dashboard-shell";
import { RulesTable } from "../../_components/dashboard/rules-table";
import { Button } from "~/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { api } from "~/trpc/server";

export const metadata: Metadata = {
  title: "Rules | TrustLimit",
  description: "Manage transaction control rules",
};

export default async function RulesPage() {
  const rules = await api.rules.getRules();
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Rules"
        text="Create and manage transaction control rules."
      >
        <Button asChild>
          <Link href="/dashboard/rules/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Rule
          </Link>
        </Button>
      </DashboardHeader>
      <RulesTable rules={rules} />
    </DashboardShell>
  );
}
