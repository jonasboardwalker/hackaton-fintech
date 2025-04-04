import { BarChart, Menu } from "lucide-react";
import { env } from "~/env";
import { NavigationItemType } from "~/types/navigation.types";

export const API = "/api";
const ACCOUNT = "/account";
const DASHBOARD = "/dashboard";
const LOG_IN = (env.NEXT_PUBLIC_CLERK_SIGN_IN_URL as "/sign-in") ?? "/sign-in";
const SIGN_UP = (env.NEXT_PUBLIC_CLERK_SIGN_UP_URL as "/sign-up") ?? "/sign-up";
const SEARCH = "/search";

export const ROUTES = {
  LOG_IN,
  SIGN_UP,
  DASHBOARD,
  ACCOUNT: `${DASHBOARD}${ACCOUNT}`,
  SEARCH,
} as const;

const DASHBOARD_NAV_ITEM: NavigationItemType = {
  icon: BarChart,
  label: "dashboard_routes.dashboard",
  href: ROUTES.DASHBOARD,
};

const USER_ACCOUNT_NAV_ITEM: NavigationItemType = {
  icon: Menu,
  label: "dashboard_routes.account",
  href: ROUTES.ACCOUNT,
};

export const MOBILE_ADMIN_ROUTES: NavigationItemType[] = [DASHBOARD_NAV_ITEM];

export const MOBILE_USER_ROUTES: NavigationItemType[] = [
  DASHBOARD_NAV_ITEM,
  USER_ACCOUNT_NAV_ITEM,
];

export const DESKTOP_ADMIN_ROUTES: NavigationItemType[] = [DASHBOARD_NAV_ITEM];

export const DESKTOP_USER_ROUTES: NavigationItemType[] = [DASHBOARD_NAV_ITEM];

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
