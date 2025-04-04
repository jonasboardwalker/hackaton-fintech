import { useMemo } from "react";
import { useSession } from "@clerk/nextjs";
import { type Role } from "~/types/globals"; // Ensure you have this type defined

export const useUserRole = (): Role | undefined => {
  const { session } = useSession();

  return useMemo(() => {
    // Extract role from session if available
    const roleFromSession = session?.user?.publicMetadata?.role;

    return roleFromSession;
  }, [session]);
};
