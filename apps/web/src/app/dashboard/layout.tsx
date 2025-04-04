import { SignedIn, UserButton } from "@clerk/nextjs";
import {
  Button,
  Separator,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@admin-shad-template/ui";
import { AppSidebar } from "~/app/dashboard/_components/app-sidebar";
import { ModeSwitcher } from "~/app/_components/mode-switcher";
import { LogOut } from "lucide-react";
import Link from "next/link";

const DashboardLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
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

              <div className="ml-auto flex items-center gap-2">
                <Link href="/">
                  <Button size="sm" variant="ghost">
                    <LogOut className="mr-2 h-4 w-4" />
                    Exit
                  </Button>
                </Link>
                <UserButton />
                <ModeSwitcher />
              </div>
            </div>
          </header>

          {children}
        </SidebarInset>
      </SidebarProvider>
    </SignedIn>
  );
};

export default DashboardLayout;
