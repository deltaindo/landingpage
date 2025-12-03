import type { Metadata } from "next";
import { getTenantBySlug } from "@/lib/getTenantData";
import { notFound } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/shared/Hero";
import Features from "@/components/shared/Features";
import Testimonials from "@/components/shared/Testimonials";
import CTA from "@/components/shared/CTA";
import Footer from "@/components/shared/Footer";

interface TenantPageProps {
  params: Promise<{ tenant: string }>;
}

export async function generateMetadata({
  params,
}: TenantPageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const tenant = await getTenantBySlug(resolvedParams.tenant);

    if (!tenant) {
      return {
        title: "404 - Not Found",
      };
    }

    return {
      title: tenant.branding.name,
      openGraph: {
        title: tenant.branding.name,
        images: tenant.branding.logo ? [tenant.branding.logo] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error",
    };
  }
}

export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    themeColor: "#000000",
  };
}

export default async function TenantPage({ params }: TenantPageProps) {
  const resolvedParams = await params;
  const tenant = await getTenantBySlug(resolvedParams.tenant);

  if (!tenant) {
    notFound();
  }

  return (
    <>
      <Navbar tenant={tenant} />
      <Hero tenant={tenant} />
      <Features tenant={tenant} />
      <Testimonials tenant={tenant} />
      <CTA tenant={tenant} />
      <Footer tenant={tenant} />
    </>
  );
}
