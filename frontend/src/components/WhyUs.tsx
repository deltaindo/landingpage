// components/WhyUs.tsx - Version 3: Two-Column Layout
import React from "react";

interface Reason {
  icon: string;
  title: string;
  description: string;
}

const WhyUs: React.FC = () => {
  const reasons: Reason[] = [
    {
      icon: "✓",
      title: "Terakreditasi Resmi",
      description:
        "Ditunjuk dan diakui oleh Kementerian Ketenagakerjaan RI dan BNSP",
    },
    {
      icon: "👨‍🏫",
      title: "Instruktur Profesional",
      description: "Instruktur bersertifikat dan berpengalaman di bidangnya",
    },
    {
      icon: "🏢",
      title: "Fasilitas Modern",
      description:
        "Ruang pelatihan lengkap dengan alat praktik standar industri",
    },
    {
      icon: "🔄",
      title: "Fleksibel",
      description:
        "Public training dan in-house training sesuai kebutuhan perusahaan",
    },
    {
      icon: "💬",
      title: "Konsultasi Gratis",
      description: "Konsultasi program pelatihan dan sertifikasi tanpa biaya",
    },
    {
      icon: "🏆",
      title: "Terpercaya",
      description:
        "Dipercaya oleh BUMN, instansi pemerintah, dan perusahaan swasta",
    },
  ];

  return (
    <section className="why-us-section">
      <div className="container">
        <div className="content-wrapper">
          {/* Left Side - Heading */}
          <div className="heading-side">
            <h2 className="section-title">
              Mengapa Memilih <br />
              <span className="highlight">Delta Indonesia?</span>
            </h2>
            <p className="section-description">
              Keunggulan yang membuat kami menjadi pilihan terbaik untuk
              pelatihan K3
            </p>
          </div>

          {/* Right Side - Grid */}
          <div className="reasons-grid">
            {reasons.map((reason, index) => (
              <div key={index} className="reason-item">
                <span className="reason-icon">{reason.icon}</span>
                <div className="reason-text">
                  <h3 className="reason-title">{reason.title}</h3>
                  <p className="reason-description">{reason.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .why-us-section {
          padding: 80px 0;
          background: white;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .content-wrapper {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 60px;
          align-items: start;
        }

        /* Heading Side */
        .heading-side {
          position: sticky;
          top: 100px;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1a1a1a;
          line-height: 1.2;
          margin-bottom: 24px;
        }

        .highlight {
          color: #0066cc;
        }

        .section-description {
          font-size: 1rem;
          color: #666;
          line-height: 1.6;
          margin: 0;
        }

        /* Reasons Grid */
        .reasons-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .reason-item {
          display: flex;
          gap: 16px;
          padding: 24px;
          background: #f8f9fa;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .reason-item:hover {
          background: #e8f4f8;
          transform: translateY(-2px);
        }

        .reason-icon {
          flex-shrink: 0;
          font-size: 2rem;
          line-height: 1;
        }

        .reason-text {
          flex: 1;
        }

        .reason-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 8px 0;
        }

        .reason-description {
          font-size: 0.875rem;
          color: #666;
          line-height: 1.6;
          margin: 0;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .content-wrapper {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .heading-side {
            position: static;
          }

          .reasons-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .why-us-section {
            padding: 60px 0;
          }

          .section-title {
            font-size: 2rem;
          }

          .reason-item {
            padding: 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default WhyUs;
