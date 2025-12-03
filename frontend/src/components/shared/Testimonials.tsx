"use client";

import { TenantConfig } from "@/types/tenant";
import TestimonialCard from "./Testimonials";
import styles from "./Testimonials.module.css";

interface TestimonialsProps {
  tenant: TenantConfig;
}

export default function Testimonials({ tenant }: TestimonialsProps) {
  const { testimonials, branding } = tenant;

  return (
    <section
      className={styles.testimonials}
      style={{ backgroundColor: branding.primaryColor + "10" }} // 10% opacity
    >
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <h2 className={styles.title} style={{ color: branding.primaryColor }}>
            Apa Kata Klien Kami
          </h2>
          <p className={styles.subtitle}>
            Kepercayaan dari ribuan pelanggan di seluruh Indonesia
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className={styles.grid}>
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              tenantColor={branding.primaryColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
