import { BarChart } from "lucide-react";
import { env } from "~/env";
import { NavigationItemType } from "~/types/navigation.types";

export const API = "/api";
const DASHBOARD = "/dashboard";
const LOG_IN = (env.NEXT_PUBLIC_CLERK_SIGN_IN_URL as "/sign-in") ?? "/sign-in";
const SIGN_UP = (env.NEXT_PUBLIC_CLERK_SIGN_UP_URL as "/sign-up") ?? "/sign-up";
const SEARCH = "/search";

export const ROUTES = {
  LOG_IN,
  SIGN_UP,
  DASHBOARD,
  SEARCH,
} as const;

const DASHBOARD_NAV_ITEM: NavigationItemType = {
  icon: BarChart,
  label: "Dashboard",
  href: ROUTES.DASHBOARD,
};

export const DESKTOP_ADMIN_ROUTES: NavigationItemType[] = [DASHBOARD_NAV_ITEM];

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
