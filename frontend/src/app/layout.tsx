import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Delta Indonesia",
  description: "Landing page with admin CMS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
