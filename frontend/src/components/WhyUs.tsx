// components/WhyUs.tsx - Enhanced with Background Image, Glass Effect & Slide-in Animation

import React from "react";
import Image from "next/image";

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
      icon: "🏫",
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
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "600px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 20px",
      }}
    >
      {/* Background Image with Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <Image
          src="/images/WhyUs1.jpg"
          alt="Why Us Background"
          fill
          priority
          quality={85}
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(135deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.25) 100%)",
            zIndex: 1,
          }}
        />
      </div>

      {/* Content Container */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: "60px",
          alignItems: "flex-start",
        }}
      >
        {/* Left Side - Heading */}
        <div style={{ color: "white", padding: "20px 0" }}>
          <h2
            style={{
              fontSize: "2.8rem",
              fontWeight: 700,
              lineHeight: 1.2,
              margin: "0 0 20px 0",
              letterSpacing: "-0.5px",
            }}
          >
            Mengapa Memilih{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0334a9 0%, #064ec0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                display: "block",
                marginTop: "10px",
              }}
            >
              Delta Indonesia?
            </span>
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              color: "rgba(255, 255, 255, 0.9)",
              lineHeight: 1.6,
              maxWidth: "400px",
              margin: 0,
              fontWeight: 300,
            }}
          >
            Keunggulan yang membuat kami menjadi pilihan terbaik untuk pelatihan
            K3
          </p>
        </div>

        {/* Right Side - Grid with White Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "24px",
          }}
        >
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="whyus-card"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>
                <span className="whyus-icon">{reason.icon}</span>
              </div>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: "#0034a9",
                  margin: "0 0 12px 0",
                  letterSpacing: "-0.3px",
                }}
              >
                {reason.title}
              </h3>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "#ffffff",
                  lineHeight: 1.5,
                  margin: 0,
                  fontWeight: 300,
                }}
              >
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
