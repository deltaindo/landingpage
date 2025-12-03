import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Delta Indonesia",
  description: "Multi-tenant landing pages platform",
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
