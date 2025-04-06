import { PlusIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/app/_components/ui/accordion";
import { cn } from "~/app/_lib/utils";

const faq = [
  {
    question: "How does TrustLimit prevent internal fraud?",
    answer:
      "TrustLimit provides real-time transaction controls based on roles, time, amount, and context. You can set limits on who can send money, when, and how much, preventing unauthorized transactions before they happen.",
  },
  {
    question: "How easy is it to integrate TrustLimit?",
    answer:
      "Integration is simple - just wrap your transaction code in trustLimit.check() and our API will instantly return allow, deny, or alert based on your configured policies. Most customers are up and running in hours, not days.",
  },
  {
    question: "What types of companies use TrustLimit?",
    answer:
      "TrustLimit is designed for fintech startups, B2B financial SaaS platforms, and compliance-focused companies. Our customers include neobanks, crypto wallets, expense platforms, payroll providers, and treasury management tools.",
  },
  {
    question: "How does pricing work?",
    answer:
      "We offer a SaaS API pricing model based on the volume of transaction checks. We have plans for startups, growing businesses, and enterprise customers with premium tiers that include webhook alerts, audit logs, and advanced analytics.",
  },
  {
    question: "Does TrustLimit help with compliance requirements?",
    answer:
      "Yes! TrustLimit helps you meet requirements under SOX, ISO, PCI, and SOC 2 by providing robust financial controls and detailed audit trails. This adds defensibility for fintech startups in front of investors, regulators, and enterprise customers.",
  },
  {
    question: "Can I customize the transaction policies?",
    answer:
      "Absolutely. Our admin dashboard allows you to define custom roles and rules based on your organization's specific needs. You can set policies based on user roles, time of day, transaction amounts, geographic locations, and more.",
  },
];

const FAQ = () => {
  return (
    <div id="faq" className="xs:py-16 mx-auto w-full max-w-screen-xl px-6 py-8">
      <h2 className="xs:text-4xl text-3xl !leading-[1.15] font-bold tracking-tight md:text-center md:text-5xl">
        Frequently Asked Questions
      </h2>
      <p className="xs:text-lg text-muted-foreground mt-1.5 md:text-center">
        Common questions about TrustLimit's transaction control platform.
      </p>

      <div className="min-h-[550px] md:min-h-[320px] xl:min-h-[300px]">
        <Accordion
          type="single"
          collapsible
          className="mt-8 gap-4 space-y-4 md:columns-2"
        >
          {faq.map(({ question, answer }, index) => (
            <AccordionItem
              key={question}
              value={`question-${index}`}
              className="bg-accent !mt-0 !mb-4 break-inside-avoid rounded-xl border-none px-4 py-1"
            >
              <AccordionTrigger
                className={cn(
                  "flex flex-1 items-center justify-between py-4 font-semibold tracking-tight transition-all hover:underline [&[data-state=open]>svg]:rotate-45",
                  "text-start text-lg",
                )}
              >
                {question}
                <PlusIcon className="text-muted-foreground h-5 w-5 shrink-0 transition-transform duration-200" />
              </AccordionTrigger>
              <AccordionContent className="text-[15px]">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
