export interface TenantFeature {
  id: string;
  title: string;
  description: string;
  icon: string; // SVG path or icon name
}

export interface TenantTestimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  avatar?: string;
}

export interface TenantHeroContent {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImage?: string;
}

export interface TenantBranding {
  name: string;
  tagline: string;
  logo: string;
  logoAlt: string;
  favicon?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export interface TenantMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
}

export interface TenantConfig {
  slug: string;
  branding: TenantBranding;
  metadata: TenantMetadata;
  hero: TenantHeroContent;
  features: TenantFeature[];
  testimonials: TenantTestimonial[];
  footer: {
    description: string;
    contactEmail: string;
    contactPhone: string;
    address: string;
    socialLinks?: {
      twitter?: string;
      linkedin?: string;
      instagram?: string;
      facebook?: string;
    };
  };
  sections: {
    showFeatures: boolean;
    showTestimonials: boolean;
    showCTA: boolean;
    showBlog?: boolean;
  };
}

export type TenantSlug =
  | "delta-indonesia-pranenggar"
  | "delta-nusantara-persada"
  | "biro-sertifikasi-indonesia";
