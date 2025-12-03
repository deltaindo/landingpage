import { TenantConfig } from "@/types/tenant";
import { getTenantConfig } from "@/config/tenants";

/**
 * Fetch tenant configuration by slug
 * @param slug - Tenant slug identifier
 * @returns TenantConfig or throws error if not found
 */
export async function getTenantBySlug(slug: string): Promise<TenantConfig> {
  if (!slug) {
    throw new Error("Tenant slug is required");
  }

  const config = getTenantConfig(slug);

  if (!config) {
    throw new Error(`Tenant '${slug}' not found`);
  }

  return config;
}

/**
 * Validate tenant slug format
 */
export function isValidTenantSlug(slug: string): boolean {
  // Slug should be kebab-case and only contain lowercase letters, numbers, and hyphens
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

/**
 * Generate metadata for Next.js generateMetadata
 */
export function generateTenantMetadata(tenant: TenantConfig) {
  return {
    title: tenant.metadata.title,
    description: tenant.metadata.description,
    keywords: tenant.metadata.keywords.join(", "),
    openGraph: {
      title: tenant.metadata.ogTitle || tenant.metadata.title,
      description: tenant.metadata.ogDescription || tenant.metadata.description,
      images: tenant.metadata.ogImage ? [{ url: tenant.metadata.ogImage }] : [],
    },
    icons: {
      icon: tenant.branding.favicon || "/favicon.ico",
    },
  };
}

/**
 * Get CSS variables for tenant branding
 */
export function getTenantCSSVariables(tenant: TenantConfig) {
  return {
    "--tenant-primary": tenant.branding.primaryColor,
    "--tenant-secondary": tenant.branding.secondaryColor,
    "--tenant-accent": tenant.branding.accentColor,
  } as React.CSSProperties;
}
