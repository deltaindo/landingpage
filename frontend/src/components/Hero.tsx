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
  const videoRef = useRef<HTMLIFrameElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [imageError, setImageError] = useState<{ [key: number]: boolean }>({});
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // ALL slides use 5 seconds duration (including video)
  const SLIDE_DURATION = 5000; // 5 seconds for ALL slides
  const PROGRESS_INTERVAL = 50; // Update every 50ms for smooth animation

  const slides: Slide[] = [
    {
      type: "image",
      src: "/slides/slide1.jpg",
      title: "Trusted for Safety", //Terpercaya dalam Keselamatan
      subtitle: "Guided by Expertise", //Terjaga dalam Profesionalitas
      description: "Pelatihan & Sertifikasi K3 Terpercaya",
      countdownText: "Trusted",
    },
    {
      type: "image",
      src: "/slides/slide2.jpg",
      title: "Pelatihan K3",
      subtitle: "Berkualitas & Tersertifikasi",
      description: "Membangun SDM Unggul di Bidang Keselamatan Kerja",
      countdownText: "Certified",
    },
    {
      type: "image",
      src: "/slides/slide3.jpg",
      title: "Instruktur Berpengalaman",
      subtitle: "Tim Ahli Profesional",
      description: "Lebih dari 19 tahun pengalaman di industri K3",
      countdownText: "Professional",
    },
    {
      type: "video",
      src: "https://www.youtube.com/embed/Pf98Ui1ejPM?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&enablejsapi=1&loop=0",
      title: "Delta Indonesia",
      subtitle: "Solusi Terbaik Training & Sertifikasi",
      description: "Tonton video profil kami",
      countdownText: "Accountability",
    },
    {
      type: "image",
      src: "/slides/slide4.jpg",
      title: "Wujudkan Tempat Kerja",
      subtitle: "Yang Aman & Produktif",
      description: "Bergabunglah dengan 1000+ perusahaan yang mempercayai kami",
      countdownText: "Integrity",
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
    <section
      id="beranda"
      className="relative h-screen overflow-hidden"
      style={{ minHeight: "600px", maxHeight: "900px" }}
    >
      {/* Slides Container */}
      <div className="relative w-full h-full">
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
                <div className="absolute inset-0">
                  {!imageError[index] ? (
                    <>
                      <Image
                        src={slide.src}
                        alt={slide.title}
                        fill
                        className="object-cover"
                        priority={index === 0}
                        quality={90}
                        onError={(e) => {
                          console.error(`Failed to load image: ${slide.src}`);
                          setImageError((prev) => ({ ...prev, [index]: true }));
                        }}
                        onLoad={() => {
                          console.log(`Successfully loaded: ${slide.src}`);
                        }}
                      />
                      {/* Dark Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60 z-10"></div>
                    </>
                  ) : (
                    // Fallback gradient
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700">
                      <div className="absolute inset-0 flex items-center justify-center text-white text-2xl">
                        <div className="text-center">
                          <p className="text-6xl mb-4">🖼️</p>
                          <p>Image not found</p>
                          <p className="text-sm mt-2 opacity-70">{slide.src}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Video Background */}
                <div className="absolute inset-0 bg-black">
                  <iframe
                    ref={videoRef}
                    src={slide.src}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Delta Indonesia Video"
                  ></iframe>
                </div>
              </>
            )}

            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="max-w-7xl mx-auto px-6 text-center">
                <div
                  className={`space-y-4 ${
                    slide.type === "video" ? "opacity-0" : "opacity-100"
                  } transition-opacity duration-500`}
                >
                  <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight drop-shadow-2xl">
                    {slide.title}
                  </h1>
                  <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-2xl">
                    {slide.subtitle}
                  </h2>
                  {slide.description && (
                    <p className="text-base md:text-lg text-blue-100 max-w-3xl mx-auto drop-shadow-lg">
                      {slide.description}
                    </p>
                  )}

                  {/* CTA Buttons */}
                  {slide.type === "image" && index === 0 && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                      <Link
                        href="/courses"
                        className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105 shadow-lg"
                      >
                        Daftar Pelatihan
                      </Link>
                      <button
                        onClick={() => scrollToSection("kontak")}
                        className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition"
                      >
                        Hubungi Kami
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls - Arrow Buttons */}
      <div className="absolute inset-0 flex items-center justify-between z-30 pointer-events-none">
        <button
          onClick={prevSlide}
          className="ml-4 md:ml-8 bg-white/10 backdrop-blur-sm text-white p-3 md:p-4 rounded-full hover:bg-white/20 transition pointer-events-auto group"
          aria-label="Previous slide"
        >
          <FaChevronLeft className="text-xl md:text-2xl group-hover:scale-110 transition" />
        </button>
        <button
          onClick={nextSlide}
          className="mr-4 md:mr-8 bg-white/10 backdrop-blur-sm text-white p-3 md:p-4 rounded-full hover:bg-white/20 transition pointer-events-auto group"
          aria-label="Next slide"
        >
          <FaChevronRight className="text-xl md:text-2xl group-hover:scale-110 transition" />
        </button>
      </div>

      {/* Bottom Navigation Tabs - WITH COUNTDOWN PROGRESS */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex justify-center pb-8">
        <div className="flex items-center space-x-2 md:space-x-4">
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
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
