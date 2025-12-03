export default async function TenantPage({
  params,
}: {
  params: Promise<{ tenant: string }>;
}) {
  // AWAIT the params!
  const { tenant } = await params;

  return (
    <div>
      <h1>Landing Page: {tenant}</h1>
      <p>Welcome to {tenant.replace(/-/g, " ")}</p>
    </div>
  );
}
