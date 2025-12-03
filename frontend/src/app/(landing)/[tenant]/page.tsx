import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getTenantBySlug, generateTenantMetadata } from "@/lib/getTenantData";
import { getAllTenantSlugs } from "@/config/tenants";
import Hero from "@/components/shared/Hero";
import Features from "@/components/shared/Features";
import CTA from "@/components/shared/CTA";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Testimonials from "@/components/shared/Testimonials";

interface TenantPageProps {
  params: {
    tenant: string;
  };
}

/**
 * Generate static metadata for each tenant page
 */
export async function generateMetadata({
  params,
}: TenantPageProps): Promise<Metadata> {
  try {
    const tenant = await getTenantBySlug(params.tenant);
    return generateTenantMetadata(tenant);
  } catch {
    return {
      title: "Page Not Found",
      description: "The requested tenant page could not be found.",
    };
  }
}

/**
 * Generate static paths for all tenant landing pages
 */
export async function generateStaticParams() {
  return getAllTenantSlugs().map((slug) => ({
    tenant: slug,
  }));
}

/**
 * Main Landing Page Component
 */
export default async function TenantLandingPage({ params }: TenantPageProps) {
  let tenant;

  try {
    tenant = await getTenantBySlug(params.tenant);
  } catch {
    notFound();
  }

  return (
    <div
      style={
        {
          "--tenant-primary": tenant.branding.primaryColor,
          "--tenant-secondary": tenant.branding.secondaryColor,
          "--tenant-accent": tenant.branding.accentColor,
        } as React.CSSProperties
      }
    >
      <Navbar tenant={tenant} />

      <main>
        {/* Hero Section */}
        <Hero tenant={tenant} />

        {/* Features Section */}
        {tenant.sections.showFeatures && <Features tenant={tenant} />}

        {/* Testimonials Section */}
        {tenant.sections.showTestimonials && <Testimonials tenant={tenant} />}

        {/* CTA Section */}
        {tenant.sections.showCTA && <CTA tenant={tenant} />}
      </main>

      <Footer tenant={tenant} />
    </div>
  );
}
