/** @type {import('next').NextConfig} */

const nextConfig = {
  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Performance headers
  async headers() {
    return [
      {
        source: "/(.*)\\.(js|css|png|jpg|jpeg|webp|svg|gif)$",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: "/",
        destination: "/delta-indonesia-pranenggar",
        permanent: false,
      },
    ];
  },

  // Rewrites
  async rewrites() {
    return {
      fallback: [
        {
          source: "/:path*",
          destination: "/not-found",
        },
      ],
    };
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  },

  // Compression
  compress: true,

  // Optimize for production
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  generateEtags: true,

  // React strict mode for development
  reactStrictMode: true,

  // SWC minification
  swcMinify: true,

  // Experimental features
  experimental: {
    optimizePackageImports: ["@/components", "@/lib"],
  },
};

module.exports = nextConfig;
