"use client";

import { TenantConfig } from "@/types/tenant";
import Link from "next/link";
import Image from "next/image";
import styles from "./Hero.module.css";

interface HeroProps {
  tenant: TenantConfig;
}

export default function Hero({ tenant }: HeroProps) {
  const { hero, branding } = tenant;

  return (
    <section
      className={styles.hero}
      style={{
        backgroundImage: hero.backgroundImage
          ? `url(${hero.backgroundImage})`
          : undefined,
      }}
    >
      <div className={styles.overlay} />

      <div className={styles.container}>
        <div className={styles.content}>
          {/* Subtitle / Badge */}
          <p className={styles.subtitle}>{hero.subtitle}</p>

          {/* Main Title */}
          <h1 className={styles.title} style={{ color: branding.primaryColor }}>
            {hero.title}
          </h1>

          {/* Description */}
          <p className={styles.description}>{hero.description}</p>

          {/* CTA Buttons */}
          <div className={styles.buttonGroup}>
            <Link
              href={hero.ctaLink}
              className={styles.primaryBtn}
              style={{ backgroundColor: branding.primaryColor }}
            >
              {hero.ctaText}
            </Link>

            {hero.secondaryCtaText && (
              <Link
                href={hero.secondaryCtaLink || "#"}
                className={styles.secondaryBtn}
                style={{
                  borderColor: branding.primaryColor,
                  color: branding.primaryColor,
                }}
              >
                {hero.secondaryCtaText}
              </Link>
            )}
          </div>
        </div>

        {/* Hero Image / Graphic */}
        <div className={styles.imageContainer}>
          <Image
            src={hero.backgroundImage || "/images/hero-default.svg"}
            alt={branding.name}
            width={500}
            height={400}
            priority
          />
        </div>
      </div>
    </section>
  );
}
