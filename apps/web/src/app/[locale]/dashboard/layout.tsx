import { SignedIn, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import {
  Button,
  Separator,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@admin-shad-template/ui";
import { AppSidebar } from "~/app/[locale]/dashboard/_components/app-sidebar";
import { NavHeader } from "~/app/[locale]/dashboard/_components/nav-header";
import { ModeSwitcher } from "~/app/[locale]/_components/mode-switcher";
import { Link } from "~/i18n/routing";
import { getTranslations } from "next-intl/server";
import { LogOut } from "lucide-react";
import { GlobeLocaleSwitcher } from "~/app/[locale]/_components/globe-locale-switcher";

const DashboardLayout = async ({
  admin,
  user,
}: Readonly<{
  admin: React.ReactNode;
  user: React.ReactNode;
}>) => {
  const { sessionClaims } = await auth();
  const userRole = sessionClaims?.metadata?.role;
  const t = await getTranslations();

  return (
    <SignedIn>
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <SidebarInset>
          <header className="bg-background sticky inset-x-0 top-0 isolate z-10 flex shrink-0 items-center gap-2 border-b">
            <div className="flex h-14 w-full items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1.5" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <NavHeader />

              <div className="ml-auto flex items-center gap-2">
                <Link href="/">
                  <Button size="sm" variant="ghost">
                    <LogOut className="mr-2 h-4 w-4" />
                    {t("navbar.exit_dashboard")}
                  </Button>
                </Link>
                <UserButton />
                <GlobeLocaleSwitcher />
                <ModeSwitcher />
              </div>
            </div>
          </header>
          {userRole === "admin" ? admin : user}
        </SidebarInset>
      </SidebarProvider>
    </SignedIn>
  );
};

export default DashboardLayout;
