interface PageProps {
  params: Promise<{ tenant: string }>;
}

export default async function TenantPage({ params }: PageProps) {
  const { tenant } = await params;

  return (
    <div>
      <h1>Welcome to {tenant}</h1>
      <p>
        You are viewing content for the tenant: <strong>{tenant}</strong>
      </p>
      <p>
        This page is specific to {tenant} and will load different content based
        on the tenant identifier in the URL.
      </p>
    </div>
  );
}
