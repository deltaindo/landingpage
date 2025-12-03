import { notFound } from "next/navigation";

const VALID_TENANTS = ["delta-indonesia", "delta-indonesia-pranenggar"];

export default function TenantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { tenant: string };
}) {
  // Validate tenant exists
  if (!VALID_TENANTS.includes(params.tenant)) {
    notFound();
  }

  return <>{children}</>;
}

export function generateStaticParams() {
  return VALID_TENANTS.map((tenant) => ({
    tenant,
  }));
}
