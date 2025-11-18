// components/WhyUs.tsx - Version 6: Full-Width Image with Glass Effect
import React from "react";
import Image from "next/image";

interface Benefit {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

interface WhyUsProps {
  title?: string;
  subtitle?: string;
  benefits?: Benefit[];
}

const WhyUs: React.FC<WhyUsProps> = ({
  title = "Mengapa Memilih Delta Indonesia?",
  subtitle = "Semua keunggulan yang Anda butuhkan dalam satu tempat",
  benefits = [
    {
      title: "Terakreditasi Resmi",
      description: "Kementerian Ketenagakerjaan RI dan BNSP",
      image: "/slides/slide1.jpg",
      imageAlt: "Sertifikasi Resmi",
    },
    {
      title: "Instruktur Profesional",
      description: "Bersertifikat dan berpengalaman",
      image: "/slides/slide1.jpg",
      imageAlt: "Instruktur",
    },
    {
      title: "Fasilitas Modern",
      description: "Alat praktik standar industri",
      image: "/slides/slide1.jpg",
      imageAlt: "Fasilitas",
    },
    {
      title: "Training Fleksibel",
      description: "Public & in-house training",
      image: "/slides/slide1.jpg",
      imageAlt: "Training Fleksibel",
    },
    {
      title: "Konsultasi Gratis",
      description: "Tanpa biaya konsultasi program",
      image: "/slides/slide1.jpg",
      imageAlt: "Konsultasi",
    },
    {
      title: "Terpercaya",
      description: "BUMN, pemerintah, dan swasta",
      image: "/slides/slide1.jpg",
      imageAlt: "Terpercaya",
    },
  ],
}) => {
  return (
    <section className="why-us-section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>

        {/* Benefits List */}
        <div className="benefits-list">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-row">
              {/* Full-Width Image with Glass Effect */}
              <div className="image-container">
                {benefit.image ? (
                  <div className="image-wrapper">
                    <Image
                      src={benefit.image}
                      alt={benefit.imageAlt || benefit.title}
                      fill
                      sizes="100%"
                      objectFit="cover"
                      className="benefit-image"
                    />
                    {/* Glass Effect Overlay on Hover */}
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
                    <span className="placeholder-text">Image</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="content-container">
                <div className="check-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#0066cc" />
                    <path
                      d="M7 12l3 3 7-7"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-content">
                  <h3 className="benefit-title">{benefit.title}</h3>
                  <p className="benefit-description">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .why-us-section {
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
          margin-bottom: 48px;
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

        /* Benefits List */
        .benefits-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* Benefit Row */
        .benefit-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
        }

        .benefit-row:hover {
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
          transform: translateY(-4px);
        }

        /* Image Container - Full Width */
        .image-container {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 280px;
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .benefit-image {
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
        }

        /* Hover Glass Effect */
        .benefit-row:hover .glass-overlay {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
        }

        /* Slight zoom on image hover */
        .benefit-row:hover .benefit-image {
          transform: scale(1.03);
        }

        .image-placeholder {
          width: 100%;
          height: 100%;
          min-height: 280px;
          background: linear-gradient(135deg, #f0f0f0, #e8e8e8);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #999;
          border: 2px dashed #ddd;
        }

        .placeholder-text {
          font-size: 0.875rem;
          font-weight: 500;
        }

        /* Content Container */
        .content-container {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 32px;
        }

        .check-icon {
          flex-shrink: 0;
        }

        .text-content {
          flex: 1;
        }

        .benefit-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 12px 0;
        }

        .benefit-description {
          font-size: 1rem;
          color: #666;
          line-height: 1.6;
          margin: 0;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .benefit-row {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .image-container {
            min-height: 240px;
          }

          .content-container {
            padding: 24px;
          }
        }

        @media (max-width: 768px) {
          .why-us-section {
            padding: 60px 0;
          }

          .section-title {
            font-size: 2rem;
          }

          .image-container {
            min-height: 200px;
          }

          .content-container {
            padding: 20px;
          }

          .benefit-title {
            font-size: 1.25rem;
          }

          .benefit-description {
            font-size: 0.9375rem;
          }
        }

        @media (max-width: 480px) {
          .section-title {
            font-size: 1.75rem;
          }

          .image-container {
            min-height: 160px;
          }

          .content-container {
            padding: 16px;
            gap: 12px;
          }

          .benefit-title {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </section>
  );
};

export default WhyUs;
