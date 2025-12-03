"use client";

import { TenantConfig } from "@/types/tenant";
import Link from "next/link";
import styles from "./CTA.module.css";

interface CTAProps {
  tenant: TenantConfig;
}

export default function CTA({ tenant }: CTAProps) {
  const { hero, branding } = tenant;

  return (
    <section
      className={styles.cta}
      style={{ backgroundColor: branding.primaryColor }}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Siap memulai?</h2>
          <p className={styles.description}>
            Bergabunglah dengan ribuan pelanggan yang telah mempercayai kami.
          </p>

          <div className={styles.buttons}>
            <Link
              href={hero.ctaLink}
              className={styles.primaryBtn}
              style={{
                backgroundColor: branding.accentColor,
                color: branding.secondaryColor,
              }}
            >
              {hero.ctaText}
            </Link>

            {hero.secondaryCtaText && (
              <Link
                href={hero.secondaryCtaLink || "#"}
                className={styles.secondaryBtn}
                style={{
                  backgroundColor: "white",
                  color: branding.primaryColor,
                }}
              >
                {hero.secondaryCtaText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
