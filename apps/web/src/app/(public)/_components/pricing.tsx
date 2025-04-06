import { CircleCheck } from "lucide-react";
import { Badge } from "~/app/_components/ui/badge";
import { Button } from "~/app/_components/ui/button";
import { Separator } from "~/app/_components/ui/separator";
import { cn } from "~/app/_lib/utils";

const plans = [
  {
    name: "Startup",
    price: 199,
    description:
      "Perfect for early-stage fintechs and small financial platforms.",
    features: [
      "Up to 10,000 transaction checks/month",
      "Basic role-based controls",
      "Standard time-based rules",
      "Email alerts for violations",
      "7-day audit log retention",
      "Standard support",
    ],
    buttonText: "Start your free trial",
  },
  {
    name: "Growth",
    price: 499,
    isRecommended: true,
    description:
      "For growing fintechs with increasing transaction volumes and compliance needs.",
    features: [
      "Up to 100,000 transaction checks/month",
      "Advanced role-based controls",
      "Custom time and amount rules",
      "Webhook alerts and notifications",
      "30-day audit log retention",
      "Priority support",
    ],
    buttonText: "Start your free trial",
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: 999,
    description:
      "For established fintechs with complex compliance requirements.",
    features: [
      "Unlimited transaction checks",
      "Custom approval workflows",
      "Advanced policy engine",
      "Real-time dashboard and analytics",
      "1-year audit log retention",
      "Dedicated support manager",
    ],
    buttonText: "Contact sales",
  },
];

const Pricing = () => {
  return (
    <div id="pricing" className="xs:py-20 mx-auto max-w-screen-lg px-6 py-12">
      <h1 className="xs:text-5xl text-center text-4xl font-bold tracking-tight">
        Pricing
      </h1>
      <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-center text-lg">
        Simple, transparent pricing that scales with your business.
      </p>
      <div className="xs:mt-14 mt-8 grid grid-cols-1 items-center gap-8 lg:grid-cols-3 lg:gap-0">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "bg-accent/50 relative rounded-xl border p-7 lg:rounded-none lg:first:rounded-l-xl lg:last:rounded-r-xl",
              {
                "bg-background border-primary !rounded-xl border-[2px] py-12":
                  plan.isPopular,
              },
            )}
          >
            {plan.isPopular && (
              <Badge className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100">
                Most Popular
              </Badge>
            )}
            <h3 className="text-lg font-medium">{plan.name}</h3>
            <p className="mt-2 text-4xl font-bold">
              ${plan.price}
              <span className="text-muted-foreground text-lg font-normal">
                /mo
              </span>
            </p>
            <p className="text-muted-foreground mt-4 font-medium">
              {plan.description}
            </p>
            <Separator className="my-6" />
            <ul className="space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <CircleCheck className="mt-1 h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              variant={plan.isPopular ? "default" : "outline"}
              size="lg"
              className="mt-6 w-full rounded-full"
            >
              {plan.buttonText}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
