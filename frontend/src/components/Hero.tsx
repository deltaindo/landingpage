"use client";

import { useState, useEffect, useRef } from "react";
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

  const SLIDE_DURATION = 5000;
  const PROGRESS_INTERVAL = 50;

  const slides: Slide[] = [
    {
      type: "image",
      src: "/slides/slide1.jpg",
      title: "Trusted for Safety,",
      subtitle: "Guided by Expertise",
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
      src: "/slides/foto1.jpg",
      title: "Instruktur Berpengalaman",
      subtitle: "Tim Ahli Profesional",
      description: "Lebih dari 19 tahun pengalaman di industri K3",
      countdownText: "Professional",
    },
    {
      type: "image",
      src: "/slides/foto10.jpg",
      title: "Delta Indonesia",
      subtitle: "Solusi Terbaik Training & Sertifikasi",
      description: "Tonton video profil kami",
      countdownText: "Accountability",
    },
    {
      type: "image",
      src: "/slides/slide18.jpg",
      title: "Wujudkan Tempat Kerja",
      subtitle: "Yang Aman & Produktif",
      description: "Bergabunglah dengan 1000+ perusahaan yang mempercayai kami",
      countdownText: "Integrity", 
    },
  ];

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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="beranda"
      className="relative w-full bg-white pt-10 sm:pt-12 md:pt-20 lg:pt-24"
    >
      {/* Card Container with Rounded Corners */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-8 md:pb-12 lg:pb-16">
        <div className="relative w-full max-h-fit rounded-3xl md:rounded-4xl overflow-hidden shadow-2xl bg-white border border-gray-100">
          {/* Slides Container with Fixed Height */}
          <div className="relative w-full h-[500px] md:h-[500px] lg:h-[450px]">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                {slide.type === "image" ? (
                  <>
                    {/* Background Image - Full Coverage */}
                    <div className="absolute inset-0 w-full h-full">
                      {!imageError[index] ? (
                        <>
                          <Image
                            src={slide.src}
                            alt={slide.title}
                            fill
                            className="object-cover w-full h-full"
                            priority={index === 0}
                            quality={90}
                            onError={() => {
                              console.error(
                                `Failed to load image: ${slide.src}`
                              );
                              setImageError((prev) => ({
                                ...prev,
                                [index]: true,
                              }));
                            }}
                            onLoad={() => {
                              console.log(
                                `Successfully loaded: ${slide.src}`
                              );
                            }}
                          />
                          {/* Dark Overlay for Text Contrast */}
                          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent"></div>
                        </>
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <p className="text-6xl mb-4">🖼️</p>
                              <p className="text-white">Image not found</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content Overlay - Left Side */}
                    <div className="absolute inset-0 flex items-center z-20">
                      <div className="px-8 md:px-12 lg:px-16 py-12 w-full md:w-auto">
                        <div className="space-y-5 max-w-xl">
                          {/* Title and Subtitle */}
                          <div className="space-y-3">
                            <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-xl">
                              {slide.title}
                            </h1>
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight drop-shadow-2xl">
                              {slide.subtitle}
                            </h2>
                          </div>

                          {/* Description */}
                          {slide.description && (
                            <p className="text-base md:text-lg text-white/95 leading-relaxed drop-shadow-lg max-w-lg">
                              {slide.description}
                            </p>
                          )}

                          {/* CTA Buttons */}
                          {index === 0 && (
                            <div className="flex flex-col sm:flex-row gap-4 items-start pt-4">
                              <Link
                                href="/courses"
                                className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition transform hover:scale-105 shadow-lg whitespace-nowrap"
                              >
                                Daftar Pelatihan
                              </Link>
                              <button
                                onClick={() => scrollToSection("kontak")}
                                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition transform hover:scale-105 shadow-lg whitespace-nowrap"
                              >
                                Get in touch
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                  />
                                </svg>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Video Background - Full */}
                    <div className="absolute inset-0 bg-black w-full h-full">
                      <iframe
                        ref={videoRef}
                        src={slide.src}
                        className="w-full h-full" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Delta Indonesia Video"
                      ></iframe>
                    </div>

                    {/* Video Content Overlay */}
                    <div className="absolute inset-0 flex items-center z-20">
                      <div className="px-8 md:px-12 lg:px-16 py-12 w-full md:w-auto">
                        <div className="space-y-6 max-w-xl">
                          {/* Title and Subtitle */}
                          <div className="space-y-3">
                            <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-xl">
                              {slide.title}
                            </h1>
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight drop-shadow-2xl">
                              {slide.subtitle}
                            </h2>
                          </div> 

                          {/* Description */}
                          {slide.description && (
                            <p className="text-base md:text-lg text-white/95 leading-relaxed drop-shadow-lg max-w-lg">
                              {slide.description}
                            </p>
                          )}

                          {/* CTA Button */}
                          <button
                            onClick={() => scrollToSection("kontak")}
                            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition transform hover:scale-105 shadow-lg whitespace-nowrap"
                          >
                            Get in touch
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Navigation Tabs - WITH COUNTDOWN PROGRESS */}
          <div className="absolute bottom-0 left-0 right-0 z-30 flex justify-center pb-6 md:pb-8 pointer-events-none">
            <div className="flex items-center space-x-2 md:space-x-3 pointer-events-auto flex-wrap justify-center gap-2">
              {slides.map((slide, index) => (
                <div key={index} className="relative">
                  {/* Tab Button with Progress Bar */}
                  <button
                    onClick={() => setCurrentSlide(index)}
                    className={`relative text-xs md:text-sm font-medium transition-all duration-300 px-4 py-2 rounded-full ${
                      index === currentSlide
                        ? "text-white bg-blue-600 shadow-lg"
                        : "text-gray-700 bg-white/45 hover:bg-white hover:text-gray-800"
                    }`}
                  >
                    {slide.countdownText}
                  </button>

                  {/* Progress Bar Below Tab - ONLY ON ACTIVE TAB */}
                  {index === currentSlide && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 transition-all duration-100"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
