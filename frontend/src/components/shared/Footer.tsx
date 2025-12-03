"use client";

import { TenantConfig } from "@/types/tenant";
import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

interface FooterProps {
  tenant: TenantConfig;
}

export default function Footer({ tenant }: FooterProps) {
  const { branding, footer, slug } = tenant;
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={styles.footer}
      style={{ backgroundColor: branding.secondaryColor }}
    >
      <div className={styles.container}>
        {/* Footer Content */}
        <div className={styles.content}>
          {/* Company Info */}
          <div className={styles.column}>
            <Image
              src={branding.logo}
              alt={branding.logoAlt}
              width={50}
              height={50}
            />
            <h3 style={{ color: branding.primaryColor }}>{branding.name}</h3>
            <p>{footer.description}</p>
          </div>

          {/* Quick Links */}
          <div className={styles.column}>
            <h4>Navigasi</h4>
            <ul>
              <li>
                <Link href={`/${slug}`}>Beranda</Link>
              </li>
              <li>
                <Link href={`/${slug}#features`}>Fitur</Link>
              </li>
              <li>
                <Link href={`/${slug}#testimonials`}>Testimoni</Link>
              </li>
              <li>
                <Link href="/about">Tentang Kami</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.column}>
            <h4>Hubungi Kami</h4>
            <ul>
              <li>
                <a href={`mailto:${footer.contactEmail}`}>
                  📧 {footer.contactEmail}
                </a>
              </li>
              <li>
                <a href={`tel:${footer.contactPhone}`}>
                  📞 {footer.contactPhone}
                </a>
              </li>
              <li>📍 {footer.address}</li>
            </ul>
          </div>

          {/* Social Links */}
          {footer.socialLinks && (
            <div className={styles.column}>
              <h4>Ikuti Kami</h4>
              <div className={styles.socialLinks}>
                {footer.socialLinks.linkedin && (
                  <a
                    href={footer.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn"
                  >
                    🔗 LinkedIn
                  </a>
                )}
                {footer.socialLinks.instagram && (
                  <a
                    href={footer.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram"
                  >
                    📸 Instagram
                  </a>
                )}
                {footer.socialLinks.facebook && (
                  <a
                    href={footer.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Facebook"
                  >
                    👥 Facebook
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Bottom */}
        <div
          className={styles.bottom}
          style={{ borderTopColor: branding.primaryColor + "30" }}
        >
          <p>
            © {currentYear} {branding.name}. Semua hak dilindungi.
          </p>
          <div className={styles.links}>
            <Link href="/privacy">Kebijakan Privasi</Link>
            <Link href="/terms">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
