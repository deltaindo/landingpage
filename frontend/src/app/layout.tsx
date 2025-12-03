import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Delta Indonesia | Multi-Tenant Landing Pages",
  description:
    "Platform landing pages untuk Delta Indonesia, Delta Nusantara Persada, dan Biro Sertifikasi Indonesia",
  keywords: ["Delta Indonesia", "logistik", "sertifikasi", "warehouse"],
  authors: [{ name: "Delta Indonesia" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#0066CC",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0066CC" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
