import { TenantConfig } from "@/types/tenant";

export const tenantConfigurations: Record<string, TenantConfig> = {
  "delta-indonesia-pranenggar": {
    slug: "delta-indonesia-pranenggar",
    branding: {
      name: "Delta Indonesia Pranenggar",
      tagline: "Solusi Logistik Terdepan Indonesia",
      logo: "/logos/delta-pranenggar-logo.png",
      logoAlt: "Delta Indonesia Pranenggar Logo",
      favicon: "/favicons/delta-pranenggar.ico",
      primaryColor: "#0066CC",
      secondaryColor: "#003D7A",
      accentColor: "#00BFFF",
    },
    metadata: {
      title: "Delta Indonesia Pranenggar | Solusi Logistik & Distribusi",
      description:
        "Perusahaan logistik terkemuka dengan jaringan distribusi tersebar di seluruh Indonesia. Layanan pengiriman cepat, aman, dan terpercaya.",
      keywords: [
        "logistik",
        "distribusi",
        "pengiriman",
        "Delta Indonesia Pranenggar",
      ],
      ogTitle: "Delta Indonesia Pranenggar - Mitra Logistik Anda",
      ogDescription:
        "Solusi logistik terpadu untuk kebutuhan bisnis Anda di seluruh Indonesia.",
    },
    hero: {
      title: "Logistik Indonesia Masa Depan",
      subtitle: "Percayakan Pengiriman Anda kepada Ahlinya",
      description:
        "Delta Indonesia Pranenggar menyediakan solusi logistik komprehensif dengan teknologi terkini dan jaringan distribusi terluas.",
      ctaText: "Mulai Kiriman Anda",
      ctaLink: "/contact",
      secondaryCtaText: "Pelajari Lebih Lanjut",
      secondaryCtaLink: "/services",
      backgroundImage: "/images/hero-logistics.jpg",
    },
    features: [
      {
        id: "fast-delivery",
        title: "Pengiriman Cepat",
        description:
          "Jangkauan ke seluruh kepulauan Indonesia dengan kecepatan pengiriman optimal.",
        icon: "rocket",
      },
      {
        id: "real-time-tracking",
        title: "Tracking Real-Time",
        description:
          "Monitor paket Anda secara real-time melalui platform digital kami.",
        icon: "map-pin",
      },
      {
        id: "secure-handling",
        title: "Penanganan Aman",
        description:
          "Asuransi penuh dan penanganan barang dengan standar internasional.",
        icon: "shield",
      },
      {
        id: "competitive-rates",
        title: "Tarif Kompetitif",
        description:
          "Harga transparan tanpa biaya tersembunyi dengan berbagai pilihan layanan.",
        icon: "dollar-sign",
      },
    ],
    testimonials: [
      {
        id: "testimonial-1",
        name: "Budi Santoso",
        position: "Kepala Operasional",
        company: "PT Retail Indonesia",
        content:
          "Layanan Delta Indonesia Pranenggar sangat handal. Pengiriman tepat waktu dan customer service responsif.",
        avatar: "/avatars/budi.jpg",
      },
      {
        id: "testimonial-2",
        name: "Siti Nurhaliza",
        position: "Founder",
        company: "Toko Online Sukses",
        content:
          "Kerjasama dengan Delta Indonesia Pranenggar meningkatkan kepuasan pelanggan kami drastis.",
      },
    ],
    footer: {
      description:
        "Delta Indonesia Pranenggar adalah mitra logistik terpercaya untuk bisnis Anda di seluruh nusantara.",
      contactEmail: "info@delta-pranenggar.id",
      contactPhone: "+62 21 1234 5678",
      address: "Jl. Sudirman No. 123, Jakarta Pusat, Indonesia",
      socialLinks: {
        linkedin: "https://linkedin.com/company/delta-indonesia-pranenggar",
        instagram: "https://instagram.com/delta_pranenggar",
        facebook: "https://facebook.com/deltapranenggar",
      },
    },
    sections: {
      showFeatures: true,
      showTestimonials: true,
      showCTA: true,
      showBlog: true,
    },
  },

  "delta-nusantara-persada": {
    slug: "delta-nusantara-persada",
    branding: {
      name: "Delta Nusantara Persada",
      tagline: "Solusi Penyimpanan & Distribusi Terpadu",
      logo: "/logos/delta-nusantara-logo.png",
      logoAlt: "Delta Nusantara Persada Logo",
      favicon: "/favicons/delta-nusantara.ico",
      primaryColor: "#00AA44",
      secondaryColor: "#006622",
      accentColor: "#00DD66",
    },
    metadata: {
      title: "Delta Nusantara Persada | Warehouse & Distribution Solutions",
      description:
        "Penyedia solusi warehouse management dan distribusi dengan teknologi IoT terkini untuk efisiensi maksimal.",
      keywords: [
        "warehouse",
        "distribusi",
        "penyimpanan",
        "logistics",
        "Delta Nusantara",
      ],
      ogTitle: "Delta Nusantara Persada - Solusi Warehouse Terpadu",
      ogDescription:
        "Sistem manajemen gudang terintegrasi untuk optimalkan operasional logistik Anda.",
    },
    hero: {
      title: "Warehouse Management Revolusioner",
      subtitle: "Teknologi IoT untuk Efisiensi Distribusi",
      description:
        "Platform warehouse management terpadu dengan teknologi IoT, robotika, dan AI untuk mengoptimalkan supply chain Anda.",
      ctaText: "Demo Platform",
      ctaLink: "/demo",
      secondaryCtaText: "Hubungi Sales",
      secondaryCtaLink: "/sales",
      backgroundImage: "/images/hero-warehouse.jpg",
    },
    features: [
      {
        id: "iot-integration",
        title: "Integrasi IoT",
        description:
          "Sensor pintar dan monitoring real-time untuk setiap lokasi warehouse.",
        icon: "wifi",
      },
      {
        id: "inventory-management",
        title: "Manajemen Inventori",
        description:
          "Sistem otomatis untuk tracking barang dengan akurasi 99.9%.",
        icon: "box",
      },
      {
        id: "automation",
        title: "Otomasi Penuh",
        description:
          "Robot dan conveyor system untuk efisiensi operasional maksimal.",
        icon: "cpu",
      },
      {
        id: "data-analytics",
        title: "Analytics Dashboard",
        description:
          "Insights mendalam untuk optimasi keputusan bisnis berbasis data.",
        icon: "bar-chart-2",
      },
    ],
    testimonials: [
      {
        id: "testimonial-1",
        name: "Hendra Kusuma",
        position: "Supply Chain Manager",
        company: "PT Manufaktur Besar",
        content:
          "Platform Delta Nusantara mengurangi biaya operasional warehouse kami sebesar 35%.",
        avatar: "/avatars/hendra.jpg",
      },
      {
        id: "testimonial-2",
        name: "Rina Wijaya",
        position: "Direktur Operasional",
        company: "Distributor Elektronik",
        content:
          "Implementasi sistem mereka sangat smooth dan ROI terbukti dalam 6 bulan pertama.",
      },
    ],
    footer: {
      description:
        "Delta Nusantara Persada membantu bisnis mengoptimalkan warehouse dan supply chain mereka dengan teknologi terdepan.",
      contactEmail: "support@delta-nusantara.id",
      contactPhone: "+62 274 1234 567",
      address: "Jl. Malioboro No. 456, Yogyakarta, Indonesia",
      socialLinks: {
        linkedin: "https://linkedin.com/company/delta-nusantara-persada",
        instagram: "https://instagram.com/delta_nusantara",
        facebook: "https://facebook.com/deltanusantara",
      },
    },
    sections: {
      showFeatures: true,
      showTestimonials: true,
      showCTA: true,
      showBlog: true,
    },
  },

  "biro-sertifikasi-indonesia": {
    slug: "biro-sertifikasi-indonesia",
    branding: {
      name: "Biro Sertifikasi Indonesia",
      tagline: "Lembaga Sertifikasi & Standarisasi Terpercaya",
      logo: "/logos/biro-sertifikasi-logo.png",
      logoAlt: "Biro Sertifikasi Indonesia Logo",
      favicon: "/favicons/biro-sertifikasi.ico",
      primaryColor: "#D4AF37",
      secondaryColor: "#8B7500",
      accentColor: "#FFD700",
    },
    metadata: {
      title: "Biro Sertifikasi Indonesia | Akreditasi & Standarisasi",
      description:
        "Lembaga sertifikasi independen yang terakreditasi memberikan layanan audit, sertifikasi, dan pelatihan standar internasional.",
      keywords: [
        "sertifikasi",
        "ISO",
        "akreditasi",
        "standar",
        "audit",
        "Biro Sertifikasi",
      ],
      ogTitle: "Biro Sertifikasi Indonesia - Jaminan Kualitas & Kepercayaan",
      ogDescription:
        "Lembaga sertifikasi terakreditasi untuk memastikan produk dan layanan memenuhi standar internasional.",
    },
    hero: {
      title: "Sertifikasi Internasional dengan Kepercayaan Lokal",
      subtitle: "Jaminan Kualitas untuk Kesuksesan Bisnis Anda",
      description:
        "Biro Sertifikasi Indonesia memberikan layanan sertifikasi terakreditasi, audit, dan pelatihan untuk meningkatkan standar bisnis Anda.",
      ctaText: "Konsultasi Gratis",
      ctaLink: "/consultation",
      secondaryCtaText: "Lihat Paket Kami",
      secondaryCtaLink: "/pricing",
      backgroundImage: "/images/hero-certification.jpg",
    },
    features: [
      {
        id: "iso-certification",
        title: "Sertifikasi ISO",
        description:
          "Layanan sertifikasi ISO 9001, 14001, 45001, dan standar internasional lainnya.",
        icon: "award",
      },
      {
        id: "audit-services",
        title: "Jasa Audit",
        description:
          "Audit Internal dan eksternal oleh auditor bersertifikat dan berpengalaman.",
        icon: "check-circle",
      },
      {
        id: "training-program",
        title: "Program Pelatihan",
        description:
          "Training karyawan untuk pemahaman dan implementasi standar internasional.",
        icon: "book-open",
      },
      {
        id: "consulting",
        title: "Konsultasi Bisnis",
        description:
          "Bimbingan mendalam untuk implementasi sistem manajemen kualitas yang efektif.",
        icon: "briefcase",
      },
    ],
    testimonials: [
      {
        id: "testimonial-1",
        name: "Dr. Imam Setiawan",
        position: "Direktur",
        company: "PT Industri Maju Indonesia",
        content:
          "Biro Sertifikasi Indonesia profesional dan membantu kami mencapai sertifikasi ISO dalam waktu singkat.",
        avatar: "/avatars/imam.jpg",
      },
      {
        id: "testimonial-2",
        name: "Lina Hartono",
        position: "QA Manager",
        company: "Pabrik Makanan Berkualitas",
        content:
          "Tim mereka sangat detail dan memberikan rekomendasi yang praktis untuk meningkatkan standar kami.",
      },
    ],
    footer: {
      description:
        "Biro Sertifikasi Indonesia adalah mitra terpercaya dalam perjalanan transformasi kualitas bisnis Anda menuju standar internasional.",
      contactEmail: "info@biro-sertifikasi.id",
      contactPhone: "+62 31 7654 321",
      address: "Jl. Ahmad Yani No. 789, Surabaya, Indonesia",
      socialLinks: {
        linkedin: "https://linkedin.com/company/biro-sertifikasi-indonesia",
        instagram: "https://instagram.com/biro_sertifikasi",
        facebook: "https://facebook.com/birosertifikasi",
      },
    },
    sections: {
      showFeatures: true,
      showTestimonials: true,
      showCTA: true,
      showBlog: true,
    },
  },
};

export function getTenantConfig(slug: string): TenantConfig | null {
  return tenantConfigurations[slug] || null;
}

export function getAllTenantSlugs(): string[] {
  return Object.keys(tenantConfigurations);
}
