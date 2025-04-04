import { Button } from "@admin-shad-template/ui";
import { Logo } from "../../../_components/logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { ModeSwitcher } from "~/app/[locale]/_components/mode-switcher";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ROUTES } from "~/app/[locale]/_lib/routes";
import { Link } from "~/i18n/routing";
import { getTranslations } from "next-intl/server";

const Navbar = async () => {
  const t = await getTranslations();
  return (
    <nav className="bg-background border-accent h-16 border-b">
      <div className="mx-auto flex h-full max-w-screen-xl items-center justify-between px-4 sm:px-6">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          <ModeSwitcher />
          <SignedIn>
            <Link href={ROUTES.DASHBOARD}>
              <Button variant="outline">
                {t("dashboard_routes.dashboard")}
              </Button>
            </Link>
          </SignedIn>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Link href={ROUTES.LOG_IN}>
              <Button variant="outline" className="hidden sm:inline-flex">
                {t("ui.login")}
              </Button>
            </Link>
            <Link href={ROUTES.SIGN_UP}>
              <Button className="xs:inline-flex hidden">
                {t("ui.sign_up")}
              </Button>
            </Link>
          </SignedOut>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
