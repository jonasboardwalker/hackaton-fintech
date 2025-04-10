"use client";

import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "~/app/_components/ui/carousel";
import { cn } from "~/app/_lib/utils";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    designation: "CFO",
    company: "NeoBank Inc.",
    testimonial:
      "TrustLimit has completely transformed how we manage internal financial controls. The ability to set granular permissions based on roles and time has prevented several potentially costly mistakes. " +
      "Our compliance team loves the detailed audit trails, and implementation was surprisingly quick.",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    name: "Michael Chen",
    designation: "Head of Engineering",
    company: "PayFast Solutions",
    testimonial:
      "As the technical lead, I was impressed by how easy it was to integrate TrustLimit. The API is well-documented, and wrapping our transaction code in trustLimit.check() was seamless. " +
      "The real-time alerts have already helped us catch several unusual transaction patterns that would have gone unnoticed.",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    designation: "Compliance Officer",
    company: "CryptoWallet Pro",
    testimonial:
      "In the crypto space, preventing internal misuse is critical. TrustLimit gives us the controls we need to satisfy regulators while maintaining operational efficiency. " +
      "The customizable rules engine lets us adapt quickly to new compliance requirements, and the dashboard provides the visibility we need.",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: 4,
    name: "David Kim",
    designation: "Product Manager",
    company: "ExpenseTrack",
    testimonial:
      "Our expense management platform needed robust controls to give our enterprise clients confidence. TrustLimit provided exactly what we needed - a financial firewall that prevents misuse while being easy to configure. " +
      "It's become a key selling point in our enterprise sales conversations.",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: 5,
    name: "Jessica Taylor",
    designation: "CTO",
    company: "B2B Payments Ltd",
    testimonial:
      "TrustLimit is now an essential part of our infrastructure. The ability to enforce financial policies across different teams and geographies has eliminated the manual approval workflows we used to rely on. " +
      "Our development team particularly appreciates the webhook integration for real-time alerts.",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    id: 6,
    name: "Robert Singh",
    designation: "CEO",
    company: "FinControl Systems",
    testimonial:
      "As a financial controls platform ourselves, we know good fintech infrastructure when we see it. TrustLimit has saved us months of development time by providing a ready-made solution for transaction controls. " +
      "It's helped us focus on our core product while still offering robust financial guardrails to our clients.",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
  },
];

const Testimonial = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div
      id="testimonials"
      className="xs:py-12 mx-auto w-full max-w-screen-xl px-6 py-6"
    >
      <h2 className="xs:mb-14 mb-8 text-center text-4xl font-bold tracking-tight md:text-5xl">
        Trusted by Fintech Leaders
      </h2>
      <div className="container mx-auto w-full">
        <Carousel setApi={setApi}>
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn("h-3.5 w-3.5 rounded-full border-2", {
                "bg-primary border-primary": current === index + 1,
              })}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const TestimonialCard = ({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) => (
  <div className="bg-accent mb-8 rounded-xl px-6 py-8 sm:py-6">
    <div className="flex items-center justify-between gap-20">
      <div className="bg-muted-foreground/20 relative hidden aspect-[3/4] w-full max-w-[18rem] shrink-0 rounded-xl lg:block">
        <Image
          src="/placeholder.svg?height=400&width=300"
          fill
          alt=""
          className="rounded-xl object-cover"
        />

        <div className="bg-primary absolute top-1/4 right-0 flex h-12 w-12 translate-x-1/2 items-center justify-center rounded-full">
          <svg
            width="102"
            height="102"
            viewBox="0 0 102 102"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
          >
            <path
              d="M26.0063 19.8917C30.0826 19.8625 33.7081 20.9066 36.8826 23.024C40.057 25.1414 42.5746 28.0279 44.4353 31.6835C46.2959 35.339 47.2423 39.4088 47.2744 43.8927C47.327 51.2301 44.9837 58.4318 40.2444 65.4978C35.4039 72.6664 28.5671 78.5755 19.734 83.2249L2.54766 74.1759C8.33598 71.2808 13.2548 67.9334 17.3041 64.1335C21.2515 60.3344 23.9203 55.8821 25.3105 50.7765C20.5179 50.4031 16.6348 48.9532 13.6612 46.4267C10.5864 44.0028 9.03329 40.5999 9.00188 36.2178C8.97047 31.8358 10.5227 28.0029 13.6584 24.7192C16.693 21.5381 20.809 19.9289 26.0063 19.8917ZM77.0623 19.5257C81.1387 19.4965 84.7641 20.5406 87.9386 22.6581C91.1131 24.7755 93.6306 27.662 95.4913 31.3175C97.3519 34.9731 98.2983 39.0428 98.3304 43.5268C98.383 50.8642 96.0397 58.0659 91.3004 65.1319C86.4599 72.3005 79.6231 78.2095 70.79 82.859L53.6037 73.8099C59.392 70.9149 64.3108 67.5674 68.3601 63.7676C72.3075 59.9685 74.9763 55.5161 76.3665 50.4105C71.5739 50.0372 67.6908 48.5873 64.7172 46.0608C61.6424 43.6369 60.0893 40.2339 60.0579 35.8519C60.0265 31.4698 61.5787 27.6369 64.7145 24.3532C67.7491 21.1722 71.865 19.563 77.0623 19.5257Z"
              className="fill-primary-foreground"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex items-center justify-between gap-1">
          <div className="hidden items-center gap-4 sm:flex md:hidden">
            <Avatar className="h-8 w-8 md:h-10 md:w-10">
              <AvatarFallback className="bg-primary text-primary-foreground text-xl font-medium">
                {testimonial.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold">{testimonial.name}</p>
              <p className="text-sm text-gray-500">{testimonial.designation}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="fill-muted-foreground stroke-muted-foreground h-5 w-5"
              />
            ))}
          </div>
        </div>
        <p className="mt-6 text-lg leading-normal font-semibold tracking-tight sm:text-2xl lg:text-[1.75rem] lg:!leading-normal xl:text-3xl">
          &quot;{testimonial.testimonial}&quot;
        </p>
        <div className="mt-6 flex items-center gap-4 sm:hidden md:flex">
          <Avatar>
            <AvatarFallback className="bg-primary text-primary-foreground text-xl font-medium">
              {testimonial.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-semibold">{testimonial.name}</p>
            <p className="text-sm text-gray-500">{testimonial.designation}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Testimonial;
