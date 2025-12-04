"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

interface ServiceItem {
  icon?: string;
  subtitle: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

interface ServiceCategory {
  title: string;
  items: ServiceItem[];
  categoryImage?: string;
}

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Add fade-in when cards enter viewport
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

  const trainingService: ServiceCategory = {
    title: "",
    items: [
      {
        subtitle: "Pelatihan dan Sertifikasi K3",
        description:
          "Pelatihan keselamatan dan kesehatan kerja bersertifikat BNSP dan Kemnaker RI",
        image: "/images/Services1.jpg",
        imageAlt: "Pelatihan K3",
      },
      {
        subtitle: "Konsultasi dan Audit SMK3",
        description:
          "Konsultasi dan jasa audit sistem manajemen keselamatan dan kesehatan kerja",
        image: "/images/Services2.jpg",
        imageAlt: "Konsultasi dan Audit SMK3",
      },
    ],
  };

  const testingService: ServiceItem = {
    subtitle: "Riksa Uji Alat",
    description: "Pemeriksaan dan pengujian alat K3 sesuai standar",
    image: "/images/Services4.jpg",
    imageAlt: "Riksa Uji Alat",
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full bg-slate-50 py-16 md:py-20"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 md:px-8">
        {/* Header */}
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Layanan Kami
          </h2>
          <p className="mt-3 text-base text-slate-600 md:text-lg">
            Layanan komprehensif untuk kebutuhan K3 perusahaan Anda.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid items-stretch gap-8 md:grid-cols-[1.2fr_minmax(0,1fr)]">
          {/* Left: Training & Consultation */}
          <div className="flex flex-col gap-5">
            <h3 className="text-lg font-semibold text-slate-800">
              {trainingService.title}
            </h3>

            {trainingService.items.map((item, index) => (
              <article
                key={item.subtitle + index}
                className="service-card flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-transform duration-300 hover:-translate-y-1"
              >
                {item.image && (
                  <div className="relative h-32 w-full md:h-36 lg:h-40">
                    <Image
                      src={item.image}
                      alt={item.imageAlt ?? item.subtitle}
                      fill
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                )}

                <div className="p-3 md:p-4">
                  <h4 className="text-sm font-semibold text-slate-900 md:text-base">
                    {item.subtitle}
                  </h4>
                  <p className="mt-1 text-xs text-slate-600 md:text-sm leading-snug">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Right: Testing Service */}
          <article className="service-card flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-transform duration-300 hover:-translate-y-1">
            {testingService.image && (
              <div className="relative flex-1 w-full min-h-[260px] md:min-h-[320px]">
                <Image
                  src={testingService.image}
                  alt={testingService.imageAlt ?? testingService.subtitle}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            )}

            <div className="p-5 md:p-6">
              <h3 className="text-base font-semibold text-slate-900 md:text-lg">
                {testingService.subtitle}
              </h3>
              <p className="mt-2 text-sm text-slate-600 md:text-base">
                {testingService.description}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Services;
