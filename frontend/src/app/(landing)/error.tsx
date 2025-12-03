"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter();

  useEffect(() => {
    // Log error to external service (e.g., Sentry)
    console.error("Landing page error:", error);
  }, [error]);

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
          maxWidth: "600px",
          backgroundColor: "white",
          padding: "3rem 2rem",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div
          style={{
            fontSize: "4rem",
            marginBottom: "1rem",
          }}
        >
          ⚠️
        </div>

        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            marginBottom: "0.5rem",
            color: "#333",
          }}
        >
          Oops! Something went wrong
        </h1>

        <p
          style={{
            fontSize: "1rem",
            color: "#666",
            marginBottom: "2rem",
            lineHeight: 1.6,
          }}
        >
          {error.message ||
            "An unexpected error occurred while loading the landing page."}
        </p>

        {error.digest && (
          <p
            style={{
              fontSize: "0.85rem",
              color: "#999",
              marginBottom: "2rem",
              fontFamily: "monospace",
              backgroundColor: "#f5f5f5",
              padding: "0.5rem",
              borderRadius: "4px",
            }}
          >
            Error ID: {error.digest}
          </p>
        )}

        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => reset()}
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              fontWeight: 500,
              backgroundColor: "#0066CC",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor = "#0052A3";
            }}
            onMouseOut={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor = "#0066CC";
            }}
          >
            Try Again
          </button>

          <button
            onClick={() => router.push("/")}
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              fontWeight: 500,
              backgroundColor: "transparent",
              color: "#0066CC",
              border: "2px solid #0066CC",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor = "#f0f7ff";
            }}
            onMouseOut={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor =
                "transparent";
            }}
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
