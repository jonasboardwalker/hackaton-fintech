// file: app/layout.tsx
import type React from "react";
import type { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import BottomNavigation from "@/components/bottom-navigation";
import { Providers } from "./providers";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "TrustLimit",
  description: "Smart Transaction Throttling for Fintech companies",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Simulator App",
    startupImage: [
      {
        url: "/icons/icon-512x512.png",
        media:
          "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)",
      },
    ],
  },
  formatDetection: {
    telephone: false,
  },
};

// Export viewport and themeColor separately as required by Next.js
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const themeColor = "#000000";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Simulator App" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body
        className={`${jakarta.variable} font-sans flex flex-col h-screen max-h-svh`}
      >
        <Providers>
          <main className="h-[calc(100%-theme(space.20))] overflow-y-scroll">
            {children}
          </main>
          <BottomNavigation />
        </Providers>
      </body>
    </html>
  );
}
