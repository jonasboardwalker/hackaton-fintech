import { usePathname } from "next/navigation";
import { type RoutePath, ROUTES } from "~/app/_lib/routes";

export const useIsActiveRoute = (href: RoutePath) => {
  const pathname = usePathname();

  return (
    pathname === href || // Exact match
    (href !== ROUTES.DASHBOARD &&
      pathname.startsWith(href) &&
      pathname[href.length] === "/") // Valid child route, excluding /dashboard
  );
};
