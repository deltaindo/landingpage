"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

// Edit these items to change the card content
const serviceItems = [
  {
    subtitle: "Pelatihan dan Sertifikasi K3",
    description:
      "Pelatihan keselamatan dan kesehatan kerja bersertifikat BNSP dan Kemnaker RI",
  },
  {
    subtitle: "Riksa Uji Alat ",
    description: " Pemeriksaan dan pengujian alat K3 sesuai standar",
  },
  {
    subtitle: "Konsultasi dan Audit SMK3",
    description:
      "Konsultasi dan jasa audit sistem manajemen keselamatan dan kesehatan kerja",
  },
];

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Fade-in animation for cards
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const cards = Array.from(
      sectionEl.querySelectorAll<HTMLElement>(".service-card")
    );
    if (cards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full bg-[#226be5] py-8 md:py-12 overflow-hidden"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="max-w-3xl mb-6">
          <h2 className="text-white text-4xl font-bold tracking-tight md:text-5xl">
            Layanan Kami
          </h2>
          <p className="mt-2 text-lg text-white/90 md:text-xl">
            Layanan komprehensif untuk kebutuhan K3 perusahaan anda
          </p>
        </div>

        {/* Layout: Cards (left) + Image (right) */}
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_auto] gap-8 items-center">
          {/* Service Cards - centered vertically */}
          <div className="flex flex-col gap-5 justify-center">
            {serviceItems.map((item, idx) => (
              <article
                key={item.subtitle + idx}
                className="service-card rounded-2xl bg-white px-6 py-5 shadow transition duration-300 hover:-translate-y-1"
              >
                <h4 className="text-xl font-semibold text-[#226be5]">
                  {item.subtitle}
                </h4>
                <p className="text-slate-700 mt-2 text-base">
                  {item.description}
                </p>
              </article>
            ))}
          </div>

          {/* Image - larger size, positioned to touch bottom */}
          <div className="flex justify-end items-end -mb-8 md:-mb-12">
            <div className="relative w-[320px] md:w-[400px] lg:w-[480px] h-auto">
              <Image
                src="/images/services.png" // Replace this path with your image
                alt="Engineer"
                width={480}
                height={600}
                className="w-full h-auto object-contain object-bottom"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;