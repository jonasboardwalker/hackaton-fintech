import type { Metadata } from "next";
import {
  DashboardHeader,
  DashboardShell,
  RuleForm,
} from "~/components/dashboard";

export const metadata: Metadata = {
  title: "New Rule | TrustLimit",
  description: "Create a new transaction control rule",
};

export default function NewRulePage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Create Rule"
        text="Define a new transaction control rule."
      />
      <div className="grid gap-8">
        <RuleForm />
      </div>
    </DashboardShell>
  );
}
