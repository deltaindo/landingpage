"use client";

import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

interface Slide {
  type: "image" | "video";
  src: string;
  title: string;
  subtitle: string;
  description?: string;
  countdownText: string;
  ctaButtons?: Array<{
    label: string;
    action: string;
    style: "primary" | "secondary";
  }>;
}

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const intervalRef = useRef(null);
  const [imageError, setImageError] = useState<{ [key: number]: boolean }>({});
  const progressIntervalRef = useRef(null);

  // ALL slides use 5 seconds duration (including video)
  const SLIDE_DURATION = 5000; // 5 seconds for ALL slides
  const PROGRESS_INTERVAL = 50; // Update every 50ms for smooth animation

  const slides: Slide[] = [
    {
      type: "image",
      src: "/images/internal-13.jpeg",
      title: "Pelatihan dan Sertifikasi K3",
      subtitle: "Dengan Instruktur Tersertifikasi",
      description: "Pelatihan & Sertifikasi K3 Terpercaya",
      countdownText: "Training",
      ctaButtons: [
        {
          label: "Daftar Pelatihan",
          action: "daftar-pelatihan",
          style: "primary",
        },
        {
          label: "Hubungi Kami",
          action: "kontak",
          style: "secondary",
        },
      ],
    },
    {
      type: "image",
      src: "/images/internal-11.jpg",
      title: "Riksa Uji Alat",
      subtitle: "Dengan Tim Ahli Profesional",
      description: "Pengujian Kelayakan Alat oleh Tim Ahli",
      countdownText: "Inspection",
      ctaButtons: [
        {
          label: "Pesan Inspeksi",
          action: "pesan-inspeksi",
          style: "primary",
        },
        {
          label: "Info Lebih Lanjut",
          action: "kontak",
          style: "secondary",
        },
      ],
    },
    {
      type: "image",
      src: "/images/internal-6.jpeg",
      title: "Konsultasi dan Audit SMK3",
      subtitle: "Tim Ahli Profesional",
      description: "Lebih dari 19 tahun pengalaman di industri K3",
      countdownText: "Consultant",
      ctaButtons: [
        {
          label: "Konsultasi Gratis",
          action: "konsultasi-gratis",
          style: "primary",
        },
        {
          label: "Jadwal Audit",
          action: "jadwal-audit",
          style: "secondary",
        },
      ],
    },
  ];

  // Auto play with progress tracking - ALL slides 5 seconds
  useEffect(() => {
    setProgress(0);

    intervalRef.current = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const increment = (PROGRESS_INTERVAL / SLIDE_DURATION) * 100;
        return Math.min(prev + increment, 100);
      });
    }, PROGRESS_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }

      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [currentSlide, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCTAAction = (action: string) => {
    scrollToSection(action);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {slide.type === "image" ? (
              <>
                {/* Image Background */}
                {!imageError[index] ? (
                  <>
                    <Image
                      src={slide.src}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      priority={index === 0}
                      onError={() => {
                        console.error(`Failed to load image: ${slide.src}`);
                        setImageError((prev) => ({ ...prev, [index]: true }));
                      }}
                      onLoad={() => {
                        console.log(`Successfully loaded: ${slide.src}`);
                      }}
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/40"></div>
                  </>
                ) : (
                  // Fallback gradient
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 flex items-center justify-center">
                    <div className="text-center text-white">
                      <p className="text-2xl">🖼️ Image not found</p>
                      <p className="text-sm text-gray-400">{slide.src}</p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Video Background */}
                <video
                  ref={videoRef}
                  src={slide.src}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                />
                <div className="absolute inset-0 bg-black/40"></div>
              </>
            )}

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 md:px-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                {slide.title}
              </h1>

              <h2 className="text-xl md:text-2xl font-semibold mb-2 drop-shadow-md">
                {slide.subtitle}
              </h2>

              {slide.description && (
                <p className="text-sm md:text-base text-gray-200 mb-8 drop-shadow-md max-w-2xl">
                  {slide.description}
                </p>
              )}

              {/* CTA Buttons */}
              {slide.ctaButtons && slide.ctaButtons.length > 0 && (
                <div className="flex gap-4 flex-wrap justify-center mt-6">
                  {slide.ctaButtons.map((btn, btnIndex) => (
                    <button
                      key={btnIndex}
                      onClick={() => handleCTAAction(btn.action)}
                      className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                        btn.style === "primary"
                          ? "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
                          : "bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 active:bg-gray-200"
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls - Arrow Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 md:p-3 rounded-full transition-all"
        aria-label="Previous slide"
      >
        <FaChevronLeft size={20} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 md:p-3 rounded-full transition-all"
        aria-label="Next slide"
      >
        <FaChevronRight size={20} />
      </button>

      {/* Bottom Navigation Tabs - WITH COUNTDOWN PROGRESS */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 md:gap-4 py-4 md:py-6 px-4 z-20 bg-gradient-to-t from-black/50 to-transparent">
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            {/* Tab Button with Progress Bar */}
            <button
              onClick={() => setCurrentSlide(index)}
              className={`relative text-xs md:text-sm font-medium transition-all duration-300 px-4 py-2 rounded ${
                index === currentSlide
                  ? "text-white bg-white/10 backdrop-blur-sm"
                  : "text-white/60 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              {slide.countdownText}
            </button>

            {/* Progress Bar Below Tab - ONLY ON ACTIVE TAB */}
            {index === currentSlide && (
              <div
                className="absolute bottom-0 left-0 h-1 bg-blue-500 rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
