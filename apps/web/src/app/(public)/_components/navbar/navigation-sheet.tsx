import { Link, Menu } from "lucide-react";
import { Logo } from "../../../_components/logo";
import { NavMenu } from "./nav-menu";
import { SignedOut } from "@clerk/nextjs";
import { ROUTES } from "~/app/_lib/routes";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export const NavigationSheet = async () => {
  return (
    <Sheet>
      <VisuallyHidden>
        <SheetTitle>Navigation Drawer</SheetTitle>
      </VisuallyHidden>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <Logo />
        <NavMenu orientation="vertical" className="mt-12" />

        <div className="mt-8 space-y-4">
          <SignedOut>
            <Link href={ROUTES.LOG_IN}>
              <Button variant="outline" className="w-full sm:hidden">
                Login
              </Button>
            </Link>
          </SignedOut>
          <SignedOut>
            <Link href={ROUTES.SIGN_UP}>
              <Button className="xs:hidden w-full">Sign Up</Button>
            </Link>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
};
