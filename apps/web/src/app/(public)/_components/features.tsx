import {
  ShieldCheck,
  Clock,
  UserCheck,
  FileText,
  Code,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "~/app/_components/ui/card";

const features = [
  {
    icon: ShieldCheck,
    title: "Prevent Internal Fraud",
    description:
      "Stop unauthorized transactions with role-based permissions and smart transaction controls.",
  },
  {
    icon: Clock,
    title: "Time-Based Controls",
    description:
      "Set time windows for transactions to prevent unusual activity outside of business hours.",
  },
  {
    icon: UserCheck,
    title: "Role-Based Permissions",
    description:
      "Define transaction limits and approval workflows based on user roles and departments.",
  },
  {
    icon: FileText,
    title: "Compliance & Audit Trails",
    description:
      "Maintain detailed logs of all transaction attempts for regulatory compliance and auditing.",
  },
  {
    icon: Code,
    title: "Simple API Integration",
    description:
      "Implement with a single line of code - wrap your transactions in trustLimit.check() to instantly allow/deny/alert.",
  },
  {
    icon: Zap,
    title: "Real-Time Alerts",
    description:
      "Get instant notifications for suspicious transactions or policy violations via webhooks or dashboard.",
  },
];

const Features = () => {
  return (
    <div
      id="features"
      className="xs:py-20 mx-auto w-full max-w-screen-xl px-6 py-12"
    >
      <h2 className="xs:text-4xl text-3xl font-bold tracking-tight sm:mx-auto sm:max-w-xl sm:text-center md:text-5xl md:leading-[3.5rem]">
        Feature Flags for Money
      </h2>
      <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-center text-lg">
        TrustLimit provides programmable transaction controls that help fintechs
        prevent misuse and stay compliant.
      </p>
      <div className="xs:mt-14 mx-auto mt-8 grid w-full gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="flex flex-col overflow-hidden rounded-xl border shadow-none"
          >
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
                <feature.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-300" />
              </div>
              <h4 className="!mt-3 text-xl font-bold tracking-tight">
                {feature.title}
              </h4>
              <p className="text-muted-foreground xs:text-[17px] mt-1 text-sm">
                {feature.description}
              </p>
            </CardHeader>
            <CardContent className="mt-auto px-6 pb-6">
              <div className="bg-muted h-32 rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Features;
