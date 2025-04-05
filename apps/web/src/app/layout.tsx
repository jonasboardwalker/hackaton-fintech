import type { Metadata, Viewport } from "next";
import "./globals.css";

import { META_THEME_COLORS } from "~/app/_hooks/use-meta-color";
import { AppProviders } from "./dashboard/providers";

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
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
