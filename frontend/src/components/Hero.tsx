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
    },
    {
      type: "image",
      src: "/images/internal-11.jpg",
      title: "Riksa Uji Alat",
      subtitle: "Dengan Tim Ahli Profesional",
      description: "Pengujian Kelayakan Alat oleh Tim Ahli",
      countdownText: "Inspection",
    },
    {
      type: "image",
      src: "/images/internal-6.jpeg",
      title: "Konsultasi dan Audit SMK3",
      subtitle: "Tim Ahli Profesional",
      description: "Lebih dari 19 tahun pengalaman di industri K3",
      countdownText: "Consultant",
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

  return (
    <div className="relative w-full h-screen">
      {/* Slides Container */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
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
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                  🖼️
                  <p className="text-white ml-2">
                    Image not found: {slide.src}
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Video Background */}
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
              >
                <source src={slide.src} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/40"></div>
            </>
          )}

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {slide.title}
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-white-400">
              {slide.subtitle}
            </h2>
            {slide.description && (
              <p className="text-base md:text-lg text-gray-200 max-w-2xl mb-8">
                {slide.description}
              </p>
            )}

            {/* CTA Buttons - NOW ON ALL SLIDES */}
            {slide.type === "image" && (
              <div className="flex gap-4 flex-wrap justify-center">
                <button
                  onClick={() => scrollToSection("services")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
                >
                  Daftar Pelatihan
                </button>
                <button
                  onClick={() => scrollToSection("kontak")}
                  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-slate-900 transition"
                >
                  Hubungi Kami
                </button>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Navigation Controls - Arrow Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 text-white hover:text-gray-300 transition"
        aria-label="Previous slide"
      >
        <FaChevronLeft size={32} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 text-white hover:text-gray-300 transition"
        aria-label="Next slide"
      >
        <FaChevronRight size={32} />
      </button>

      {/* Bottom Navigation Tabs - WITH COUNTDOWN PROGRESS */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-4">
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

              {/* Progress Bar Below Tab - ONLY ON ACTIVE TAB */}
              {index === currentSlide && (
                <div
                  className="absolute bottom-0 left-0 h-1 bg-white rounded-full transition-all duration-100"
                  style={{ width: `${progress}%` }}
                ></div>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
