"use client";

import { useEffect, useRef } from "react";
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

  const trainingService: ServiceCategory = {
    items: [
      {
        subtitle: "Pelatihan K3",
        description:
          "Pelatihan keselamatan dan kesehatan kerja bersertifikat Kemnaker RI",
        image: "/images/training.jpg",
        imageAlt: "Pelatihan K3",
      },
      {
        subtitle: "Sertifikasi K3",
        description:
          "Sertifikasi kompetensi BNSP dan Kemnaker untuk berbagai bidang",
        image: "/images/certification.jpg",
        imageAlt: "Sertifikasi K3",
      },
    ],
  };

  const testingService: ServiceItem = {
    subtitle: "Riksa Uji Alat",
    description: "Pemeriksaan dan pengujian alat K3 sesuai standar",
    image: "/images/testing.jpg",
    imageAlt: "Riksa Uji Alat",
  };

  return (
    <section className="services-section" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <h2 className="section-title">Layanan Kami</h2>
          <p className="section-subtitle">
            Layanan komprehensif untuk kebutuhan K3 perusahaan Anda
          </p>
        </div>

        {/* Services Grid Layout */}
        <div className="services-grid">
          {/* Left Side - Training & Consultation */}
          <div className="left-column">
            {/* Training & Sertifikasi Block */}
            <div className="service-category">
              <h3 className="category-title">{trainingService.title}</h3>
              <div className="cards-group">
                {trainingService.items.map((item, index) => (
                  <div key={index} className="service-card">
                    {/* Full-Width Image Container */}
                    <div className="image-container">
                      {item.image ? (
                        <div className="image-wrapper">
                          <Image
                            src={item.image}
                            alt={item.imageAlt || item.subtitle}
                            fill
                            sizes="100%"
                            objectFit="cover"
                            className="service-image"
                          />
                          <div className="glass-overlay"></div>
                        </div>
                      ) : (
                        <div className="image-placeholder">
                          <svg
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <rect
                              x="3"
                              y="3"
                              width="18"
                              height="18"
                              rx="2"
                              stroke="#ccc"
                              strokeWidth="2"
                            />
                            <circle cx="8.5" cy="8.5" r="1.5" fill="#ccc" />
                            <path
                              d="M3 14l5-5 7 7 9-9"
                              stroke="#ccc"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                      )}

                      {/* Text Overlay - No White Space */}
                      <div className="content-overlay">
                        <h4 className="card-title">{item.subtitle}</h4>
                        <p className="card-description">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Testing Service (Tall Block) */}
          <div className="right-column">
            <div className="service-card service-card-tall">
              {/* Full-Width Image Container */}
              <div className="image-container">
                {testingService.image ? (
                  <div className="image-wrapper">
                    <Image
                      src={testingService.image}
                      alt={testingService.imageAlt || testingService.subtitle}
                      fill
                      sizes="100%"
                      objectFit="cover"
                      className="service-image"
                    />
                    <div className="glass-overlay"></div>
                  </div>
                ) : (
                  <div className="image-placeholder">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                        stroke="#ccc"
                        strokeWidth="2"
                      />
                      <circle cx="8.5" cy="8.5" r="1.5" fill="#ccc" />
                      <path
                        d="M3 14l5-5 7 7 9-9"
                        stroke="#ccc"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                )}

                {/* Text Overlay - No White Space */}
                <div className="content-overlay content-overlay-tall">
                  <h4 className="card-title">{testingService.subtitle}</h4>
                  <p className="card-description">
                    {testingService.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .services-section {
          padding: 80px 0;
          background: #f8f9fa;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* Header */
        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 16px;
        }

        .section-subtitle {
          font-size: 1.125rem;
          color: #666;
          margin: 0;
        }

        /* Grid Layout */
        .services-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }

        .left-column {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .right-column {
          display: flex;
          flex-direction: column;
        }

        /* Service Category */
        .service-category {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .category-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 12px 0;
        }

        .cards-group {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* Service Card */
        .service-card {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
          background: white;
          min-height: 240px;
        }

        .service-card:hover {
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
          transform: translateY(-4px);
        }

        .service-card-tall {
          min-height: 560px;
        }

        /* Image Container */
        .image-container {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 240px;
        }

        .service-card-tall .image-container {
          min-height: 560px;
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .service-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }

        /* Glass Overlay Effect */
        .glass-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0);
          backdrop-filter: blur(0px);
          transition: all 0.3s ease;
          pointer-events: none;
          z-index: 1;
        }

        .service-card:hover .glass-overlay {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
        }

        .service-card:hover .service-image {
          transform: scale(1.03);
        }

        .image-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #f0f0f0, #e8e8e8);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #999;
        }

        /* Content Overlay - No White Space */
        .content-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          top: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.4) 50%,
            rgba(0, 0, 0, 0.6) 100%
          );
          padding: 32px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          z-index: 2;
          transition: all 0.3s ease;
        }

        .content-overlay-tall {
          padding: 40px;
        }

        .service-card:hover .content-overlay {
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.2) 50%,
            rgba(0, 0, 0, 0.7) 100%
          );
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: white;
          margin: 0 0 12px 0;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .content-overlay-tall .card-title {
          font-size: 1.75rem;
        }

        .card-description {
          font-size: 0.9375rem;
          color: rgba(255, 255, 255, 0.95);
          line-height: 1.6;
          margin: 0;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
        }

        .content-overlay-tall .card-description {
          font-size: 1.125rem;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .services-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .service-card-tall {
            min-height: 360px;
          }

          .service-card-tall .image-container {
            min-height: 360px;
          }
        }

        @media (max-width: 768px) {
          .services-section {
            padding: 60px 0;
          }

          .section-title {
            font-size: 2rem;
          }

          .category-title {
            font-size: 1.25rem;
          }

          .service-card {
            min-height: 200px;
          }

          .service-card-tall {
            min-height: 280px;
          }

          .service-card-tall .image-container {
            min-height: 280px;
          }

          .content-overlay {
            padding: 20px;
          }

          .card-title {
            font-size: 1.125rem;
          }

          .card-description {
            font-size: 0.875rem;
          }
        }

        @media (max-width: 480px) {
          .section-title {
            font-size: 1.75rem;
          }

          .cards-group {
            gap: 12px;
          }

          .service-card {
            min-height: 160px;
          }

          .service-card-tall {
            min-height: 200px;
          }

          .service-card-tall .image-container {
            min-height: 200px;
          }

          .content-overlay {
            padding: 16px;
          }

          .card-title {
            font-size: 1rem;
          }

          .card-description {
            font-size: 0.8125rem;
          }
        }

        /* Animation */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .service-card.animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Services;
