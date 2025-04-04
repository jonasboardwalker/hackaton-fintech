"use client";

import { Link, usePathname } from "~/i18n/routing";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@admin-shad-template/ui";
import { ChevronRight } from "lucide-react";
import { Fragment } from "react";
import { ROUTES } from "~/app/_lib/routes";

export const Breadcrumbs = () => {
  const pathname = usePathname();

  // Remove `/dashboard` from the path and split into segments
  const breadcrumbItems = pathname
    .replace(ROUTES.DASHBOARD, "")
    .split("/")
    .filter((segment) => segment); // Remove empty segments

  // Do not show breadcrumbs for first-level routes (e.g., /dashboard/courses)
  if (breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <Breadcrumb className="hidden md:block">
      <BreadcrumbList>
        {breadcrumbItems.map((segment, idx) => {
          const href = `${ROUTES.DASHBOARD}/${breadcrumbItems
            .slice(0, idx + 1)
            .join("/")}`;

          // Check if this is the last breadcrumb (non-navigable)
          const isLast = idx === breadcrumbItems.length - 1;

          return (
            <Fragment key={href}>
              {!!idx && (
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
              )}
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>
                    {segment.charAt(0).toUpperCase() + segment.slice(1)}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>
                      {segment.charAt(0).toUpperCase() + segment.slice(1)}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
