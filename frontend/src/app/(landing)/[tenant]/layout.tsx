import { notFound } from "next/navigation";

const VALID_TENANTS = ["delta-indonesia", "delta-indonesia-pranenggar"];

export default async function TenantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ tenant: string }>;
}) {
  const { tenant } = await params;

  if (!VALID_TENANTS.includes(tenant)) {
    notFound();
  }

  return <>{children}</>;
}

export function generateStaticParams() {
  return VALID_TENANTS.map((tenant) => ({
    tenant,
  }));
}
