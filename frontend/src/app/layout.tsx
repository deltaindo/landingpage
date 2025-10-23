import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Delta Indonesia - Pelatihan & Sertifikasi K3 Terpercaya",
  description:
    "Perusahaan Jasa Keselamatan Kesehatan Kerja (PJK3) yang ditunjuk Kementerian Ketenagakerjaan RI",
  keywords:
    "pelatihan k3, sertifikasi k3, ahli k3, kemnaker, bnsp, delta indonesia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
