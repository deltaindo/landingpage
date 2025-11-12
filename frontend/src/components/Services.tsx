"use client";

import { useEffect, useRef } from "react";

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll(".service-card");
      cards.forEach((card) => observer.observe(card));
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: "📚",
      title: "Pelatihan K3",
      description:
        "Pelatihan keselamatan dan kesehatan kerja bersertifikat Kemnaker RI",
    },
    {
      icon: "🎓",
      title: "Sertifikasi K3",
      description:
        "Sertifikasi kompetensi BNSP dan Kemnaker untuk berbagai bidang",
    },
    {
      icon: "🔧",
      title: "Riksa Uji Alat",
      description: "Pemeriksaan dan pengujian alat K3 sesuai standar",
    },
    {
      icon: "💼",
      title: "Konsultan K3",
      description: "Konsultasi sistem manajemen K3 dan produktivitas",
    },
    {
      icon: "📋",
      title: "Audit SMK3",
      description: "Audit Sistem Manajemen K3 sesuai PP No. 50 Tahun 2012",
    },
    {
      icon: "🏗️",
      title: "Kajian Teknik",
      description: "Kajian teknik untuk SKK, SLF, dan perizinan",
    },
  ];

  return (
    <section id="layanan" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark mb-4">Layanan Kami</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Layanan komprehensif untuk kebutuhan K3 perusahaan Anda
          </p>
        </div>

        <div
          ref={sectionRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card opacity-0 bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
