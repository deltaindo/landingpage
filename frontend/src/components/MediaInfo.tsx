"use client";

import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaArrowRight } from "react-icons/fa";

interface MediaItem {
  type: "featured" | "media-release";
  title: string;
  date: string;
  description: string;
  image: string;
  category?: string;
}

const MediaInfo = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const mediaItems: MediaItem[] = [
    {
      type: "featured",
      title: "Pelatihan K3 Ahli Umum Batch November 2025",
      date: "7 November 2025",
      description:
        "Delta Indonesia membuka pendaftaran pelatihan Ahli K3 Umum dengan instruktur bersertifikat dan fasilitas modern.",
      image: "/media/featured.jpg",
      category: "Featured",
    },
    {
      type: "media-release",
      title: "Delta Indonesia dan BNSP Perkuat Kerjasama Sertifikasi",
      date: "21 October 2025",
      description:
        "Penguatan kerjasama strategis untuk meningkatkan standar sertifikasi K3 di Indonesia.",
      image: "/media/release1.jpg",
      category: "Media Release",
    },
    {
      type: "media-release",
      title: "Pelatihan In-House untuk Perusahaan Manufaktur",
      date: "20 October 2025",
      description:
        "Program pelatihan khusus disesuaikan dengan kebutuhan industri manufaktur modern.",
      image: "/media/release2.jpg",
      category: "Media Release",
    },
    {
      type: "media-release",
      title: "Sertifikasi K3 Listrik - Batch Desember",
      date: "15 October 2025",
      description:
        "Pendaftaran dibuka untuk program sertifikasi K3 Listrik dengan kurikulum terbaru Kemnaker RI.",
      image: "/media/release3.jpg",
      category: "Media Release",
    },
  ];

  // Show 3 cards at a time, but featured takes full width on first position
  const visibleItems = mediaItems.slice(currentIndex, currentIndex + 3);
  const maxSlides = Math.max(0, mediaItems.length - 3);

  const nextSlide = () => {
    if (currentIndex < maxSlides) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Latest <span className="font-normal">Updates</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            Stay informed with our latest media releases, featuring key
            announcements, insights, and developments.
          </p>
        </div>

        {/* Cards Grid with Carousel */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {visibleItems.map((item, index) => {
              const isFeatured =
                item.type === "featured" && currentIndex === 0 && index === 0;

              return (
                <div
                  key={index}
                  className={`relative group cursor-pointer ${
                    isFeatured ? "md:col-span-1 md:row-span-2" : ""
                  }`}
                >
                  {/* Card */}
                  <div className="relative h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                    {/* Image Section */}
                    <div
                      className={`relative ${
                        isFeatured ? "h-[500px]" : "h-64"
                      } overflow-hidden`}
                    >
                      {/* Placeholder Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-teal-500">
                        {/* You can add actual images here */}
                        <div className="absolute inset-0 flex items-center justify-center text-white text-6xl opacity-30">
                          📸
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            item.type === "featured"
                              ? "bg-purple-600 text-white"
                              : "bg-teal-500 text-white"
                          }`}
                        >
                          {item.type === "featured" ? (
                            <span className="flex items-center space-x-2">
                              <span>🏆</span>
                              <span>Featured</span>
                            </span>
                          ) : (
                            item.category
                          )}
                        </span>
                      </div>

                      {/* Read More Button (Top Right) */}
                      <button className="absolute top-4 right-4 z-10 bg-teal-500 text-white p-3 rounded-full hover:bg-teal-600 transition group-hover:scale-110">
                        <FaArrowRight className="text-lg" />
                      </button>

                      {/* Gradient Overlay (for featured) */}
                      {isFeatured && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      )}

                      {/* Content Overlay for Featured */}
                      {isFeatured && (
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                          <p className="text-sm text-gray-300 mb-2">
                            {item.category}
                          </p>
                          <p className="text-sm text-gray-300 mb-3">
                            {item.date}
                          </p>
                          <h3 className="text-2xl font-bold mb-3">
                            {item.title}
                          </h3>
                        </div>
                      )}
                    </div>

                    {/* Content Section (for non-featured) */}
                    {!isFeatured && (
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-semibold text-gray-600">
                            {item.category}
                          </span>
                          <span className="text-sm text-gray-500">
                            {item.date}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-dark mb-3 group-hover:text-primary transition">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                          {item.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={`p-4 rounded-full transition-all ${
                currentIndex === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-teal-500 text-white hover:bg-teal-600"
              }`}
              aria-label="Previous slide"
            >
              <FaChevronLeft className="text-xl" />
            </button>

            {/* Dot Navigation */}
            <div className="flex items-center space-x-3">
              {Array.from({ length: maxSlides + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-purple-600 w-12 h-3 rounded-full"
                      : "bg-gray-400 w-3 h-3 rounded-full hover:bg-gray-500"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              disabled={currentIndex >= maxSlides}
              className={`p-4 rounded-full transition-all ${
                currentIndex >= maxSlides
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-teal-500 text-white hover:bg-teal-600"
              }`}
              aria-label="Next slide"
            >
              <FaChevronRight className="text-xl" />
            </button>
          </div>

          {/* View All Button */}
          <div className="flex justify-center mt-12">
            <button className="flex items-center space-x-2 bg-teal-500 text-white px-8 py-4 rounded-lg hover:bg-teal-600 transition group">
              <span className="font-semibold">View all</span>
              <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaInfo;
