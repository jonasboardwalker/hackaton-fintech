"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@admin-shad-template/ui";
import { useTranslations } from "next-intl";
import { useNavigationRoutes } from "~/app/[locale]/_hooks/use-navigation-routes";
import {
  DESKTOP_ADMIN_ROUTES,
  DESKTOP_USER_ROUTES,
} from "~/app/[locale]/_lib/routes";
import { Link } from "~/i18n/routing";

export function AppSidebar() {
  const t = useTranslations();
  const routes = useNavigationRoutes({
    userRoutes: DESKTOP_USER_ROUTES,
    adminRoutes: DESKTOP_ADMIN_ROUTES,
  });
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{t(item.label)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
