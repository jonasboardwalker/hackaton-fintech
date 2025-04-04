"use client";

import { useMemo } from "react";
import { useUserRole } from "~/hooks/use-user-role";
import { NavigationItemType } from "~/types/navigation.types";

export const useNavigationRoutes = ({
  userRoutes,
  adminRoutes,
}: {
  userRoutes: NavigationItemType[];
  adminRoutes: NavigationItemType[];
}): NavigationItemType[] => {
  const userRole = useUserRole();

  return useMemo(() => {
    if (userRole === "admin") {
      return adminRoutes;
    } else if (userRole === "user") {
      return userRoutes;
    }
    return [];
  }, [userRole, adminRoutes, userRoutes]);
};
