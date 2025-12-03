import { NextRequest, NextResponse } from "next/server";
import { getAllTenantSlugs } from "@/config/tenants";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for API routes and Next.js internals
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Extract tenant slug from URL
  const tenantMatch = pathname.match(/^\/([a-z0-9-]+)/);

  if (tenantMatch) {
    const slug = tenantMatch[1];
    const validTenants = getAllTenantSlugs();

    // If tenant slug is invalid, rewrite to 404
    if (!validTenants.includes(slug)) {
      return NextResponse.rewrite(new URL("/not-found", request.url));
    }

    // Add tenant to response headers for logging/analytics
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-tenant-slug", slug);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
