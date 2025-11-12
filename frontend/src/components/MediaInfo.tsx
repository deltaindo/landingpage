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
    <section className="py-20 bg-gray-50" id="media">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header - FIXED: Removed duplicate text */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mt-1">
            Berita Terbaru
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            Tetap terinformasi dengan rilis media terbaru kami yang menampilkan
            pengumuman penting, wawasan mendalam, serta perkembangan terkini.
          </p>
        </div>

        {/* Cards Grid with Carousel */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleItems.map((item, index) => {
              const isFeatured =
                item.type === "featured" && currentIndex === 0 && index === 0;

              return (
                <div
                  key={index}
                  className={`${
                    isFeatured ? "md:col-span-1 md:row-span-2" : "md:col-span-1"
                  } relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group bg-white`}
                >
                  {/* Card */}
                  <div
                    className={`relative ${isFeatured ? "h-full" : "h-full"}`}
                  >
                    {/* Image Section */}
                    <div
                      className={`relative ${
                        isFeatured ? "h-full" : "h-64"
                      } overflow-hidden`}
                    >
                      {/* Placeholder Background */}
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600"
                        style={{
                          backgroundImage: `url('${item.image}')`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        {/* Fallback gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600"></div>
                      </div>

                      {/* Category Badge - FIXED */}
                      {item.type === "featured" ? (
                        <div className="absolute top-4 left-4 z-20">
                          <div className="bg-white text-primary px-4 py-2 rounded-full font-semibold text-sm shadow-lg flex items-center space-x-2">
                            <span>Featured</span>
                          </div>
                        </div>
                      ) : (
                        <div className="absolute top-4 left-4 z-20">
                          <div className="bg-primary text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
                            {item.category}
                          </div>
                        </div>
                      )}

                      {/* Read More Button (Top Right) */}
                      <button className="absolute top-4 right-4 z-20 bg-primary text-white p-3 rounded-full hover:bg-blue-700 transition shadow-lg group-hover:scale-110">
                        <FaArrowRight className="text-sm" />
                      </button>

                      {/* Gradient Overlay (for featured) */}
                      {isFeatured && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                      )}

                      {/* Content Overlay for Featured */}
                      {isFeatured && (
                        <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                          <p className="text-sm mb-2 text-blue-200">
                            {item.category}
                          </p>
                          <p className="text-sm mb-3 text-blue-200">
                            {item.date}
                          </p>
                          <h3 className="text-2xl font-bold leading-tight">
                            {item.title}
                          </h3>
                        </div>
                      )}
                    </div>

                    {/* Content Section (for non-featured) */}
                    {!isFeatured && (
                      <div className="p-6">
                        <p className="text-sm text-gray-500 mb-3">
                          {item.date}
                        </p>
                        <h3 className="text-xl font-bold text-dark mb-3 line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-3">
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
          <div className="flex items-center justify-center space-x-4 mt-12">
            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={`p-4 rounded-full transition-all ${
                currentIndex === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-primary text-white hover:bg-blue-600"
              }`}
              aria-label="Previous slide"
            >
              <FaChevronLeft />
            </button>

            {/* Dot Navigation */}
            <div className="flex items-center space-x-2">
              {Array.from({ length: maxSlides + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary w-12 h-3 rounded-full"
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
                  : "bg-primary text-white hover:bg-blue-600"
              }`}
              aria-label="Next slide"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center space-x-2 shadow-lg">
            <span>View all</span>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default MediaInfo;
