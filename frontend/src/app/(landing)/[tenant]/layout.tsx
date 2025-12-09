import React, { ReactNode } from "react";
import { headers } from "next/headers";

interface TenantLayoutProps {
  children: ReactNode;
  params: Promise<{ tenant: string }>;
}

export default async function TenantLayout({
  children,
  params,
}: TenantLayoutProps) {
  const { tenant } = await params;
  const headersList = await headers();
  const tenantId = headersList.get("x-tenant-id") || tenant;

  return (
    <div data-tenant={tenantId} style={{ minHeight: "100vh" }}>
      <header
        style={{
          background: "#667eea",
          color: "white",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h1>Tenant: {tenantId}</h1>
      </header>
      <main style={{ padding: "20px" }}>{children}</main>
    </div>
  );
}
