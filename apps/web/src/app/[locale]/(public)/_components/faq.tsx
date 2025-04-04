import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionPrimitiveHeader,
  AccordionPrimitiveTrigger,
} from "@admin-shad-template/ui";
import { cn } from "@admin-shad-template/ui/utils";
import { PlusIcon } from "lucide-react";

const faq = [
  {
    question: "What is your return policy?",
    answer:
      "You can return unused items in their original packaging within 30 days for a refund or exchange. Contact support for assistance.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Track your order using the link provided in your confirmation email, or log into your account to view tracking details.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship worldwide. Shipping fees and delivery times vary by location, and customs duties may apply for some countries.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept Visa, MasterCard, American Express, PayPal, Apple Pay, and Google Pay, ensuring secure payment options for all customers.",
  },
  {
    question: "What if I receive a damaged item?",
    answer:
      "Please contact our support team within 48 hours of delivery with photos of the damaged item. We’ll arrange a replacement or refund.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can reach our support team via email at support@example.com or through the live chat on our website. We're available 24/7 to assist you.",
  },
];

const FAQ = () => {
  return (
    <div id="faq" className="xs:py-16 mx-auto w-full max-w-screen-xl px-6 py-8">
      <h2 className="xs:text-4xl text-3xl !leading-[1.15] font-bold tracking-tighter md:text-center md:text-5xl">
        Frequently Asked Questions
      </h2>
      <p className="xs:text-lg text-muted-foreground mt-1.5 md:text-center">
        Quick answers to common questions about our products and services.
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
              <AccordionPrimitiveHeader className="flex">
                <AccordionPrimitiveTrigger
                  className={cn(
                    "flex flex-1 items-center justify-between py-4 font-semibold tracking-tight transition-all hover:underline [&[data-state=open]>svg]:rotate-45",
                    "text-start text-lg",
                  )}
                >
                  {question}
                  <PlusIcon className="text-muted-foreground h-5 w-5 shrink-0 transition-transform duration-200" />
                </AccordionPrimitiveTrigger>
              </AccordionPrimitiveHeader>
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
