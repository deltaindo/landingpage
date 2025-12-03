export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>
        <h1>Admin Dashboard</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
