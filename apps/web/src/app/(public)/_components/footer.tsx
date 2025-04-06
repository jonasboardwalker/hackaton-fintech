import { Github, Linkedin, Twitter, Shield } from "lucide-react";
import Link from "next/link";
import { Separator } from "~/app/_components/ui/separator";

const footerSections = [
  {
    title: "Product",
    links: [
      {
        title: "Overview",
        href: "#",
      },
      {
        title: "Features",
        href: "#features",
      },
      {
        title: "Pricing",
        href: "#pricing",
      },
      {
        title: "API Documentation",
        href: "#",
      },
      {
        title: "Integrations",
        href: "#",
      },
      {
        title: "Changelog",
        href: "#",
      },
    ],
  },
  {
    title: "Company",
    links: [
      {
        title: "About us",
        href: "#",
      },
      {
        title: "Careers",
        href: "#",
      },
      {
        title: "Blog",
        href: "#",
      },
      {
        title: "Security",
        href: "#",
      },
      {
        title: "Compliance",
        href: "#",
      },
      {
        title: "Contact",
        href: "#",
      },
    ],
  },
  {
    title: "Resources",
    links: [
      {
        title: "Documentation",
        href: "#",
      },
      {
        title: "Guides",
        href: "#",
      },
      {
        title: "Case Studies",
        href: "#",
      },
      {
        title: "Webinars",
        href: "#",
      },
      {
        title: "Help Center",
        href: "#",
      },
      {
        title: "Support",
        href: "#",
      },
    ],
  },
  {
    title: "Legal",
    links: [
      {
        title: "Terms",
        href: "#",
      },
      {
        title: "Privacy",
        href: "#",
      },
      {
        title: "Cookies",
        href: "#",
      },
      {
        title: "DPA",
        href: "#",
      },
      {
        title: "SOC 2",
        href: "#",
      },
      {
        title: "GDPR",
        href: "#",
      },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="xs:mt-20 dark bg-background mt-12 border-t">
      <div className="mx-auto grid max-w-screen-xl grid-cols-2 gap-x-8 gap-y-10 px-6 py-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
        <div className="col-span-full xl:col-span-2">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            <span className="text-2xl font-bold">TrustLimit</span>
          </div>
          <p className="text-muted-foreground mt-4">
            Smart transaction throttling for fintechs. Prevent internal fraud,
            misuse, and compliance violations with programmable transaction
            controls.
          </p>
        </div>

        {footerSections.map(({ title, links }) => (
          <div key={title} className="xl:justify-self-end">
            <h6 className="text-foreground font-semibold">{title}</h6>
            <ul className="mt-6 space-y-4">
              {links.map(({ title, href }) => (
                <li key={title}>
                  <Link
                    href={href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Separator />
      <div className="mx-auto flex max-w-screen-xl flex-col-reverse items-center justify-between gap-x-2 gap-y-5 px-6 py-8 sm:flex-row">
        {/* Copyright */}
        <span className="text-muted-foreground xs:text-start text-center">
          &copy; {new Date().getFullYear()}{" "}
          <Link href="#" target="_blank">
            TrustLimit
          </Link>
          . All rights reserved.
        </span>

        <div className="text-muted-foreground flex items-center gap-5">
          <Link href="#" target="_blank">
            <Twitter className="h-5 w-5" />
          </Link>
          <Link href="#" target="_blank">
            <Linkedin className="h-5 w-5" />
          </Link>
          <Link href="#" target="_blank">
            <Github className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
