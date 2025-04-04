import { GlobeLocaleSwitcher } from "~/app/_components/globe-locale-switcher";
import { Logo } from "~/app/_components/logo";
import { Button, Input } from "@admin-shad-template/ui";
import { ROUTES } from "~/app/_lib/routes";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";

export const PublicNavbar = async () => {
  const t = await getTranslations();

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
            <Button variant="outline">{t("dashboard_routes.dashboard")}</Button>
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
            <Button variant="ghost">{t("ui.login")}</Button>
          </Link>

          <Link href={ROUTES.SIGN_UP}>
            <Button>{t("ui.sign_up")}</Button>
          </Link>
        </SignedOut>

        <GlobeLocaleSwitcher />
      </div>
    </nav>
  );
};
