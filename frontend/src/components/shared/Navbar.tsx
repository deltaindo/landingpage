"use client";

import { TenantConfig } from "@/types/tenant";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "./Navbar.module.css";

interface NavbarProps {
  tenant: TenantConfig;
}

export default function Navbar({ tenant }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { branding } = tenant;

  return (
    <nav
      className={styles.navbar}
      style={{ borderBottomColor: branding.primaryColor + "20" }}
    >
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <Image
            src={branding.logo}
            alt={branding.logoAlt}
            width={40}
            height={40}
            priority
          />
          <span style={{ color: branding.primaryColor }}>{branding.name}</span>
        </Link>

        {/* Navigation Menu */}
        <ul className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
          <li>
            <Link href="#features" onClick={() => setIsOpen(false)}>
              Fitur
            </Link>
          </li>
          <li>
            <Link href="#testimonials" onClick={() => setIsOpen(false)}>
              Testimoni
            </Link>
          </li>
          <li>
            <Link href="/about" onClick={() => setIsOpen(false)}>
              Tentang
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={styles.ctaBtn}
              style={{ backgroundColor: branding.primaryColor }}
              onClick={() => setIsOpen(false)}
            >
              Hubungi Kami
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className={`${styles.toggle} ${isOpen ? styles.active : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
