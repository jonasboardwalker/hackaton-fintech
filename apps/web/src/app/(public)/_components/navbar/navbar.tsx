import { Logo } from "../../../_components/logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { ModeSwitcher } from "~/app/_components/mode-switcher";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ROUTES } from "~/app/_lib/routes";
import Link from "next/link";
import { Button } from "~/components/ui/button";

const Navbar = async () => {
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
              <Button variant="outline">Dashboard</Button>
            </Link>
          </SignedIn>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Link href={ROUTES.LOG_IN}>
              <Button variant="outline" className="hidden sm:inline-flex">
                Login
              </Button>
            </Link>
            <Link href={ROUTES.SIGN_UP}>
              <Button className="xs:inline-flex hidden">Sign Up</Button>
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
