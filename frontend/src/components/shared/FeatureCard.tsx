"use client";

import { TenantFeature } from "@/types/tenant";
import styles from "./FeatureCard.module.css";

interface FeatureCardProps {
  feature: TenantFeature;
  primaryColor: string;
}

export default function FeatureCard({
  feature,
  primaryColor,
}: FeatureCardProps) {
  return (
    <div className={styles.card}>
      <div
        className={styles.icon}
        style={{ backgroundColor: primaryColor + "20" }}
      >
        <span style={{ color: primaryColor }}>{feature.icon}</span>
      </div>
      <h3 className={styles.title}>{feature.title}</h3>
      <p className={styles.description}>{feature.description}</p>
    </div>
  );
}
