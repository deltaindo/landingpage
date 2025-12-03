"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

interface Window {
  gtag?: (
    event: string,
    action: string,
    params?: Record<string, unknown>
  ) => void;
}

declare global {
  interface Window {
    gtag?: (
      event: string,
      action: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Extract tenant from pathname
    const tenantMatch = pathname.match(/^\/([a-z0-9-]+)/);
    const tenant = tenantMatch?.[1] || "unknown";

    // Send page view event to Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("pageview", {
        page_path: pathname,
        page_title: document.title,
        tenant_id: tenant,
      });
    }

    // You can also log to custom analytics service
    // Example: fetch('/api/analytics', { method: 'POST', body: JSON.stringify({ pathname, tenant }) })
  }, [pathname]);

  return null;
}
