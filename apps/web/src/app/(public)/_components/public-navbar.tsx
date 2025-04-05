import { Logo } from "~/app/_components/logo";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ROUTES } from "~/app/_lib/routes";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";

export const PublicNavbar = async () => {
  return (
    <nav className="flex items-center justify-between gap-x-2 bg-white p-4 shadow-xs">
      <Link href="/" className="flex items-center space-x-2">
        <Logo />
      </Link>

      <div className="flex gap-x-2">
        <Input
          className="max-w-96 rounded-full py-1.5"
          type="search"
          placeholder="Search..."
        />

        <SignedIn>
          <Link href={ROUTES.DASHBOARD}>
            <Button variant="outline">Dashboard</Button>
          </Link>
        </SignedIn>

        <Button variant="ghost" size="icon">
          <ShoppingCart className="h-5 w-5" />
        </Button>

        <SignedIn>
          <UserButton />
        </SignedIn>

        <SignedOut>
          <Link href={ROUTES.LOG_IN}>
            <Button variant="ghost">Login</Button>
          </Link>

          <Link href={ROUTES.SIGN_UP}>
            <Button>Sign Up</Button>
          </Link>
        </SignedOut>
      </div>
    </nav>
  );
};
