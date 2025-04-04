"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import { ROUTES } from "~/app/_lib/routes";
import { BREAKPOINTS } from "@admin-shad-template/shared";

export default function AccountPage() {
  const router = useRouter();
  const isDesktop = useMediaQuery({ minWidth: BREAKPOINTS.md });

  useEffect(() => {
    if (isDesktop) {
      router.push(ROUTES.DASHBOARD);
    }
  }, [isDesktop, router]);

  return <div>Account Page</div>;
}
