"use client";

import { useEffect, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    "Sertifikasi Resmi Kemnaker RI & BNSP",
    "Instruktur Berpengalaman & Bersertifikat",
    "Fasilitas Training Modern",
    "Konsultasi Gratis",
  ];

  return (
    <section id="tentang" className="py-20 bg-gray-50" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-primary to-blue-700 rounded-2xl shadow-2xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-white text-6xl font-bold">
                DI
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary rounded-2xl opacity-20"></div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-dark">
              Tentang Delta Indonesia
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              PT Delta Indonesia Pranenggar adalah Perusahaan Jasa Keselamatan
              Kesehatan Kerja (PJK3) yang ditunjuk oleh Kementerian
              Ketenagakerjaan Republik Indonesia untuk menyelenggarakan
              pelatihan dan sertifikasi K3.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Dengan pengalaman lebih dari 19 tahun, kami telah membantu ribuan
              profesional dan perusahaan dalam meningkatkan standar keselamatan
              dan kesehatan kerja.
            </p>

            {/* Features */}
            <div className="space-y-4 mt-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <FaCheckCircle className="text-primary text-xl flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <button className="mt-8 bg-primary text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition transform hover:scale-105">
              Selengkapnya
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
