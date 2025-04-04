import { usePathname } from "~/i18n/routing";
import { type RoutePath, ROUTES } from "~/lib/routes";

export const useIsActiveRoute = (href: RoutePath) => {
  const pathname = usePathname();

  return (
    pathname === href || // Exact match
    (href !== ROUTES.DASHBOARD &&
      pathname.startsWith(href) &&
      pathname[href.length] === "/") // Valid child route, excluding /dashboard
  );
};
