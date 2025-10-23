"use client";

import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const MediaInfo = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const mediaItems = [
    {
      title: "Instagram Kebelida",
      date: "28 October 2024",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/media1.jpg",
    },
    {
      title: "Instagram Kebelida",
      date: "28 October 2024",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/media2.jpg",
    },
    {
      title: "Instagram Kebelida",
      date: "28 October 2024",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/media3.jpg",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (mediaItems.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + (mediaItems.length - 2)) % (mediaItems.length - 2)
    );
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-dark mb-2">
            Our Media & Informations
          </h2>
          <p className="text-gray-600">Featured content</p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="grid md:grid-cols-3 gap-6">
            {mediaItems
              .slice(currentIndex, currentIndex + 3)
              .map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition group"
                >
                  {/* Image */}
                  <div className="relative h-64 bg-gradient-to-br from-blue-200 to-blue-400 overflow-hidden">
                    {/* Placeholder - replace with actual images */}
                    <div className="absolute inset-0 flex items-center justify-center text-white text-6xl">
                      📷
                    </div>
                    <span className="absolute top-4 right-4 bg-primary text-white px-4 py-1 rounded-full text-sm">
                      Galery
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-dark mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">{item.date}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition z-10"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition z-10"
          >
            <FaChevronRight />
          </button>

          {/* Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: Math.ceil(mediaItems.length / 3) }).map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition ${
                    index === currentIndex ? "bg-primary w-8" : "bg-gray-300"
                  }`}
                />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaInfo;
