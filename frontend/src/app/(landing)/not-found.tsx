import Link from "next/link";
import { getAllTenantSlugs } from "@/config/tenants";

export default function NotFound() {
  const tenants = getAllTenantSlugs();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        backgroundColor: "#f8f9fa",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "700px",
          backgroundColor: "white",
          padding: "4rem 2rem",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div
          style={{
            fontSize: "5rem",
            marginBottom: "1rem",
          }}
        >
          404
        </div>

        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 700,
            marginBottom: "0.5rem",
            color: "#333",
          }}
        >
          Page Not Found
        </h1>

        <p
          style={{
            fontSize: "1.1rem",
            color: "#666",
            marginBottom: "3rem",
            lineHeight: 1.6,
          }}
        >
          Maaf, tenant atau halaman yang Anda cari tidak ditemukan. Silakan
          pilih salah satu dari perusahaan di bawah ini.
        </p>

        {/* Available Tenants */}
        <div
          style={{
            marginBottom: "3rem",
            padding: "2rem",
            backgroundColor: "#f5f7fa",
            borderRadius: "8px",
          }}
        >
          <p
            style={{
              fontSize: "0.9rem",
              color: "#666",
              marginBottom: "1.5rem",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              fontWeight: 600,
            }}
          >
            Available Landing Pages:
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            {tenants.map((slug) => (
              <Link
                key={slug}
                href={`/${slug}`}
                style={{
                  padding: "1rem",
                  backgroundColor: "white",
                  border: "2px solid #0066CC",
                  borderRadius: "8px",
                  textDecoration: "none",
                  color: "#0066CC",
                  fontWeight: 600,
                  transition: "all 0.3s ease",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLAnchorElement).style.backgroundColor =
                    "#0066CC";
                  (e.target as HTMLAnchorElement).style.color = "white";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLAnchorElement).style.backgroundColor =
                    "white";
                  (e.target as HTMLAnchorElement).style.color = "#0066CC";
                }}
              >
                {slug.replace(/-/g, " ")}
              </Link>
            ))}
          </div>
        </div>

        {/* Return Home Button */}
        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            fontWeight: 500,
            backgroundColor: "#0066CC",
            color: "white",
            border: "none",
            borderRadius: "8px",
            textDecoration: "none",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLAnchorElement).style.backgroundColor = "#0052A3";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLAnchorElement).style.backgroundColor = "#0066CC";
          }}
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
