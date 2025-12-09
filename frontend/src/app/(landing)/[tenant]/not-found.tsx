import Link from "next/link";

export default function TenantNotFound() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1 style={{ fontSize: "2em" }}>404 - Page Not Found</h1>
      <p>This page does not exist for this tenant.</p>
      <Link href="/">
        <a>Return to home</a>
      </Link>
    </div>
  );
}
