"use client";

import { useEffect, useRef } from "react";

const Services = () => {
  const sectionRef = useRef(null);

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

  const trainingService = {
    title: "Pelatihan dan Sertifikasi K3",
    items: [
      {
        icon: "",
        subtitle: "Pelatihan K3",
        description:
          "Pelatihan keselamatan dan kesehatan kerja bersertifikat Kemnaker RI",
      },
      {
        icon: "",
        subtitle: "Sertifikasi K3",
        description:
          "Sertifikasi kompetensi BNSP dan Kemnaker untuk berbagai bidang",
      },
    ],
  };

  const consultationService = {
    title: "Konsultasi dan Audit SMK3",
    items: [
      {
        icon: "",
        subtitle: "Konsultan K3",
        description: "Konsultasi sistem manajemen K3 dan produktivitas",
      },
      {
        icon: "",
        subtitle: "Audit SMK3",
        description: "Audit Sistem Manajemen K3 sesuai PP No. 50 Tahun 2012",
      },
    ],
  };

  const testingService = {
    icon: "",
    title: "Riksa Uji Alat",
    description: "Pemeriksaan dan pengujian alat K3 sesuai standar",
  };

  return (
    <section ref={sectionRef} className="py-12 px-6 md:px-12 lg:px-24 bg-white">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Layanan Kami
        </h2>
        <p className="text-gray-600">
          Layanan komprehensif untuk kebutuhan K3 perusahaan Anda
        </p>
      </div>

      {/* Services Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Side - Training & Consultation (stacked, full width on left) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Training & Sertifikasi Services Block */}
          <div className="service-card bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              {trainingService.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trainingService.items.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h4 className="text-base font-semibold text-gray-800 mb-2">
                    {item.subtitle}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Consultation & Audit Services Block */}
          <div className="service-card bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              {consultationService.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {consultationService.items.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h4 className="text-base font-semibold text-gray-800 mb-2">
                    {item.subtitle}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Testing Service (expanded, tall block) */}
        <div className="lg:col-span-1 lg:row-span-2">
          <div className="service-card bg-white rounded-lg border border-gray-200 p-8 hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-center items-center text-center">
            <div className="text-6xl mb-6">{testingService.icon}</div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {testingService.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {testingService.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
