export default function TenantPage({ params }: { params: { tenant: string } }) {
  return (
    <div>
      <h1>Landing Page: {params.tenant}</h1>
      <p>Welcome to {params.tenant.replace(/-/g, " ")}</p>
    </div>
  );
}
