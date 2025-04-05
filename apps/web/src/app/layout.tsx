import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@admin-shad-template/ui";
import { TRPCReactProvider } from "~/trpc/react";
import "@admin-shad-template/ui/globals.css";

import { ThemeProvider } from "next-themes";
import { META_THEME_COLORS } from "~/app/_hooks/use-meta-color";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Providing all messages to the client
  // side is the easiest way to get started
  return (
    <ClerkProvider>
      <html className="h-dvh md:h-full" suppressHydrationWarning>
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
  );
}
