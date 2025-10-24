"use client";

import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface MediaItem {
  type: "Media Release" | "Featured";
  title: string;
  date: string;
  image: string;
  featured?: boolean;
}

const MediaInfo = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const mediaItems: MediaItem[] = [
    {
      type: "Featured",
      title: "Delta Indonesia Commemorates Its First Major K3 Achievement",
      date: "7 July 2025",
      image: "/media/featured.jpg",
      featured: true,
    },
    {
      type: "Media Release",
      title:
        "Delta Indonesia and Partner Forge Strategic Partnership to Advance Safety Training",
      date: "21 October 2025",
      image: "/media/media1.jpg",
    },
    {
      type: "Media Release",
      title:
        "Delta Indonesia Presents 'Safety Excellence', a Celebration of Workplace Security",
      date: "20 October 2025",
      image: "/media/media2.jpg",
    },
  ];

  // Calculate total pages (showing 3 items at a time, first is large + 2 small)
  const totalPages = Math.ceil(mediaItems.length / 3);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (index: number) => {
    setCurrentIndex(index);
  };

  // Get current items to display
  const startIndex = currentIndex * 3;
  const currentItems = mediaItems.slice(startIndex, startIndex + 3);
  const featuredItem = currentItems;
  const regularItems = currentItems.slice(1);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-dark mb-3">
            Latest <span className="font-normal">Updates</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Stay informed with our latest media releases, featuring key
            announcements, insights, and developments.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Featured/Large Card - Left Side */}
            {featuredItem && (
              <div className="relative group cursor-pointer h-full">
                <div className="relative h-full min-h-[500px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  {/* Image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600">
                    {/* Placeholder - Replace with actual image */}
                    <div className="w-full h-full flex items-center justify-center text-white text-8xl opacity-30">
                      📸
                    </div>
                  </div>

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                  {/* Featured Badge */}
                  {featuredItem.featured && (
                    <div className="absolute top-6 left-6 z-10">
                      <div className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 font-semibold">
                        <span>🏆</span>
                        <span>Featured</span>
                      </div>
                    </div>
                  )}

                  {/* Read More Button - Top Right */}
                  <div className="absolute top-6 right-6 z-10">
                    <button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-full flex items-center space-x-2 transition group-hover:scale-105">
                      <span className="font-semibold">Read more</span>
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
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Content - Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                    <div className="mb-3">
                      <span className="text-white font-semibold">
                        {featuredItem.type}
                      </span>
                    </div>
                    <h3 className="text-white text-3xl font-bold leading-tight mb-3">
                      {featuredItem.title}
                    </h3>
                    <p className="text-white/90 text-lg">{featuredItem.date}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Regular Cards - Right Side (Stacked) */}
            <div className="flex flex-col gap-6">
              {regularItems.map((item, index) => (
                <div key={index} className="relative group cursor-pointer">
                  <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    {/* Image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400">
                      {/* Placeholder - Replace with actual image */}
                      <div className="w-full h-full flex items-center justify-center text-gray-600 text-6xl opacity-40">
                        📷
                      </div>
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                    {/* Read More Button - Top Right */}
                    <div className="absolute top-4 right-4 z-10">
                      <button className="bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-full transition group-hover:scale-105">
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
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-semibold text-sm">
                          {item.type}
                        </span>
                        <span className="text-white/90 text-sm">
                          {item.date}
                        </span>
                      </div>
                      <h3 className="text-white text-lg font-bold leading-tight">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls - Bottom Center */}
          <div className="flex items-center justify-center space-x-6 mt-12">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="bg-teal-500 hover:bg-teal-600 text-white p-4 rounded-full transition hover:scale-110 shadow-lg"
              aria-label="Previous"
            >
              <FaChevronLeft className="text-xl" />
            </button>

            {/* Dots Navigation */}
            <div className="flex items-center space-x-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? "bg-purple-600 w-12 h-3"
                      : "bg-gray-400 hover:bg-gray-500 w-3 h-3"
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="bg-teal-500 hover:bg-teal-600 text-white p-4 rounded-full transition hover:scale-110 shadow-lg"
              aria-label="Next"
            >
              <FaChevronRight className="text-xl" />
            </button>
          </div>

          {/* View All Button - Bottom Right */}
          <div className="flex justify-end mt-8">
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-full flex items-center space-x-2 transition hover:scale-105 shadow-lg font-semibold">
              <span>View all</span>
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaInfo;
