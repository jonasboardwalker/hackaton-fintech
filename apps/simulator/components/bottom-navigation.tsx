// file: components/bottom-navigation.tsx
"use client";

import { BarChart3, Home, Send, User, Wrench } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function BottomNavigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || (path !== "/" && pathname.startsWith(path));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background z-50 shadow-lg h-20">
      <div className="flex justify-around items-center max-w-md mx-auto pt-2">
        <Link
          href="/"
          className="flex flex-col items-center justify-center w-full h-full pb-10"
        >
          <div
            className={`flex flex-col items-center justify-center ${isActive("/") ? "text-primary" : "text-muted-foreground"}`}
          >
            <Home className="h-5 w-5 mb-1" />
            <span className="text-xs">Home</span>
          </div>
        </Link>

        <Link
          href="/pay"
          className="flex flex-col items-center justify-center w-full h-full pb-10"
        >
          <div
            className={`flex flex-col items-center justify-center ${isActive("/pay") ? "text-primary" : "text-muted-foreground"}`}
          >
            <Send className="h-5 w-5 mb-1" />
            <span className="text-xs">Pay</span>
          </div>
        </Link>

        <Link
          href="/profile"
          className="flex flex-col items-center justify-center w-full h-full pb-10"
        >
          <div
            className={`flex flex-col items-center justify-center ${isActive("/profile") ? "text-primary" : "text-muted-foreground"}`}
          >
            <User className="h-5 w-5 mb-1" />
            <span className="text-xs">Profile</span>
          </div>
        </Link>

        <Link
          href="/devtools"
          className="flex flex-col items-center justify-center w-full h-full pb-10"
        >
          <div
            className={`flex flex-col items-center justify-center ${isActive("/devtools") ? "text-primary" : "text-muted-foreground"}`}
          >
            <Wrench className="h-5 w-5 mb-1" />
            <span className="text-xs">DevTools</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
