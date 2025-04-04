import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { NextIntlClientProvider } from "next-intl";
import { cn } from "@admin-shad-template/ui/utils";
import { Toaster } from "@admin-shad-template/ui";
import { getMessages } from "next-intl/server";
import { TRPCReactProvider } from "~/trpc/react";
import "@admin-shad-template/ui/globals.css";

import { ruRU, enUS, csCZ } from "@clerk/localizations";
import { type Locale } from "~/app/_lib/types";
import { ThemeProvider } from "next-themes";
import { META_THEME_COLORS } from "~/app/_hooks/use-meta-color";

const localizationMap = {
  ru: ruRU,
  en: enUS,
  cs: csCZ,
};

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin ShadCN template",
  description:
    "A modern and scalable admin template built with Next.js, Turbo, Tailwind CSS, and ShadCN. Featuring role-based access control, responsive UI, and high-performance architecture for seamless dashboard management.",
};

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light,
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  const { locale } = await params;
  return (
    <NextIntlClientProvider messages={messages}>
      <ClerkProvider localization={localizationMap[locale]}>
        <html
          className="h-dvh md:h-full"
          lang={locale}
          suppressHydrationWarning
        >
          <head>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                    try {
                      if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                        document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                      }
                    } catch (_) {}
                  `,
              }}
            />
          </head>
          <body
            className={cn(
              "bg-background overscroll-none font-sans antialiased",
              inter.className,
            )}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <TRPCReactProvider>{children}</TRPCReactProvider>
              <Toaster />
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </NextIntlClientProvider>
  );
}
