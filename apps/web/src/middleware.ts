import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "~/i18n/routing";
import { ROUTES } from "~/lib/routes";
import { NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

const dashboardMatcher = createRouteMatcher([`${ROUTES.DASHBOARD}(.*)`]);

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims } = await auth();
  const userRole = sessionClaims?.metadata?.role;
  if (dashboardMatcher(req)) {
    // Protect access to the dashboard
    if (userRole !== "admin" && userRole !== "user") {
      // Redirect to the home page if no user role is found
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Allow access to the dashboard based on role
    await auth.protect();
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
