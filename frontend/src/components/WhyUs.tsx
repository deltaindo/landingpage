// components/WhyUs.tsx - only layout changed

import React from "react";
import Image from "next/image";

interface Reason {
  title: string;
  description: string;
}

const WhyUs: React.FC = () => {
  const reasons: Reason[] = [
    {
      title: "Terakreditasi Resmi",
      description:
        "Ditunjuk dan diakui oleh Kementerian Ketenagakerjaan RI dan BNSP",
    },
    {
      title: "Instruktur Profesional",
      description: "Instruktur bersertifikat dan berpengalaman di bidangnya",
    },
    {
      title: "Fasilitas Modern",
      description:
        "Ruang pelatihan lengkap dengan alat praktik standar industri",
    },
    {
      title: "Fleksibel",
      description:
        "Public training dan in-house training sesuai kebutuhan perusahaan",
    },
    {
      title: "Konsultasi Gratis",
      description: "Konsultasi program pelatihan dan sertifikasi tanpa biaya",
    },
    {
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
          src="/images/WhyUs3.jpg"
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
          maxWidth: "1200px", // was 1400 – makes whole block a bit more centered
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.1fr 1.1fr", // slightly more balanced left/right
          columnGap: "40px",
          alignItems: "flex-start",
          padding: "0 24px", // nudges everything a bit to the right
        }}
      >
        {/* Left Side - Heading (moved a bit to the right via padding) */}
        <div
          style={{
            color: "white",
            padding: "20px 0 20px 16px", // extra left padding → heading moves right
          }}
        >
          <h2
            style={{
              fontSize: "2.6rem",
              fontWeight: 700,
              lineHeight: 1.2,
              margin: "0 0 20px 0",
              letterSpacing: "-0.5px",
            }}
          >
            Mengapa Memilih{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #ffffff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                display: "block",
                marginTop: "10px",
              }}
            >
              Delta Indonesia
            </span>
          </h2>
          <p
            style={{
              fontSize: "1.2rem", // bigger text
              color: "#ffffff", // full white
              lineHeight: 1.7,
              maxWidth: "520px", // slightly wider for readability
              margin: "8px 0 0 0",
              fontWeight: 400, // a bit bolder
              textShadow: "0 2px 6px rgba(0, 0, 0, 0.6)", // glow for contrast on photo
            }}
          >
            Keunggulan yang membuat kami menjadi pilihan terbaik untuk pelatihan
            K3
          </p>
        </div>

        {/* Right Side - 1x6 Cards (narrower + pulled left) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            rowGap: "12px",
            maxWidth: "640px", // makes cards narrower → look smaller
            margin: "0 auto 0 0", // align to the left of right column
          }}
        >
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="whyus-card"
              style={{
                animationDelay: `${index * 0.05}s`,
              }}
            >
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#1f2937",
                  margin: "0 0 6px 0",
                  letterSpacing: "-0.3px",
                }}
              >
                {reason.title}
              </h3>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#6b7280",
                  lineHeight: 1.4,
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
