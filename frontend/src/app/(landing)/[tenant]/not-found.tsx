import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "100px 20px",
        fontFamily: "sans-serif",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>404</h1>
      <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>
        Tenant Not Found
      </h2>
      <p style={{ fontSize: "16px", color: "#666", marginBottom: "30px" }}>
        The tenant you're looking for doesn't exist.
      </p>
      <Link href="/">
        <button
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            transition: "background 0.3s",
          }}
        >
          Go Home
        </button>
      </Link>
    </div>
  );
}
