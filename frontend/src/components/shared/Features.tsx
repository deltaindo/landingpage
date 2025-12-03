"use client";

import { TenantConfig } from "@/types/tenant";
import FeatureCard from "./FeatureCard";
import styles from "./Features.module.css";

interface FeaturesProps {
  tenant: TenantConfig;
}

export default function Features({ tenant }: FeaturesProps) {
  const { features, branding } = tenant;

  return (
    <section className={styles.features}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <h2 className={styles.title} style={{ color: branding.primaryColor }}>
            Fitur Unggulan
          </h2>
          <p className={styles.subtitle}>
            Solusi lengkap untuk kebutuhan bisnis Anda
          </p>
        </div>

        {/* Features Grid */}
        <div className={styles.grid}>
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              tenantColor={branding.primaryColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
