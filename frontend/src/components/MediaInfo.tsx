"use client";

import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaThumbtack } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

// Define the type for a media item
interface MediaItem {
  title: string;
  date: string;
  description: string;
  image: string;
  featured: boolean;
  category: string;
}

const MediaInfo = () => {
  // State to manage the current index of the carousel
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array of media items, with the first one marked as featured
  const mediaItems: MediaItem[] = [
    {
      title: "Media Release",
      date: "7 July 2025",
      description:
        "PETRONAS Commemorates Its First LNG Cargo from LNG Canada Facility",
      image: "/media/lng-ship.jpg", // Placeholder image path
      featured: true,
      category: "Featured",
    },
    {
      title: "Media Release",
      date: "21 October 2025",
      description:
        "PETRONAS and Oman’s OQEP Forge Strategic Partnership to Advance Upstream Collaboration",
      image: "/media/partnership.jpg", // Placeholder image path
      featured: false,
      category: "Partnership",
    },
    {
      title: "Media Release",
      date: "20 October 2025",
      description:
        "PETRONAS Presents 'Virunthu', a Celebration of Love and Togetherness",
      image: "/media/celebration.jpg", // Placeholder image path
      featured: false,
      category: "Event",
    },
    {
      title: "Sustainability",
      date: "15 October 2025",
      description:
        "New Report Highlights Advances in Sustainable Energy Solutions",
      image: "/media/sustainability.jpg", // Placeholder image path
      featured: false,
      category: "Report",
    },
    {
      title: "Technology",
      date: "12 October 2025",
      description:
        "Delta Indonesia Implements New AI-Powered Safety Monitoring System",
      image: "/media/ai-safety.jpg", // Placeholder image path
      featured: false,
      category: "Innovation",
    },
  ];

  // Separate the featured item from the rest
  const featuredItem = mediaItems.find((item) => item.featured);
  const carouselItems = mediaItems.filter((item) => !item.featured);

  // Handlers for carousel navigation
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + carouselItems.length) % carouselItems.length
    );
  };

  // Function to get the two items to display in the carousel
  const getDisplayItems = () => {
    const display = [];
    for (let i = 0; i < 2; i++) {
      display.push(carouselItems[(currentIndex + i) % carouselItems.length]);
    }
    return display;
  };

  const displayItems = getDisplayItems();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Latest Updates
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            Stay informed with our latest media releases, featuring key
            announcements, insights, and developments.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Featured Card */}
          {featuredItem && (
            <div className="relative rounded-xl overflow-hidden shadow-lg group h-full flex flex-col">
              <div className="absolute top-4 left-4 z-10 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-2">
                <FaThumbtack />
                <span>{featuredItem.category}</span>
              </div>
              <div className="absolute top-4 right-4 z-10">
                <a
                  href="#"
                  className="bg-teal-500 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-2 hover:bg-teal-600 transition-colors"
                >
                  <span>Read more</span>
                  <FiArrowRight />
                </a>
              </div>

              <div className="relative h-64">
                <img
                  src={featuredItem.image}
                  alt={featuredItem.description}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>

              <div className="absolute bottom-0 p-6 text-white">
                <div className="flex justify-between items-center text-xs opacity-80 mb-2">
                  <span>{featuredItem.title}</span>
                  <span>{featuredItem.date}</span>
                </div>
                <h3 className="text-xl font-bold">
                  {featuredItem.description}
                </h3>
              </div>
            </div>
          )}

          {/* Carousel Cards */}
          <div className="space-y-6">
            {displayItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 relative"
              >
                <div className="absolute top-4 right-4 z-10">
                  <a
                    href="#"
                    className="bg-teal-500 text-white px-3 py-1.5 rounded-md text-xs font-semibold flex items-center space-x-1 hover:bg-teal-600 transition-colors"
                  >
                    <span>Read more</span>
                    <FiArrowRight />
                  </a>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                  <span className="font-semibold text-purple-600">
                    {item.category}
                  </span>
                  <span>{item.date}</span>
                </div>
                <p className="text-gray-800 font-semibold">
                  {item.description}
                </p>
              </div>
            ))}

            {/* Navigation & View All */}
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-teal-500 text-white hover:bg-teal-600 transition-colors"
                  aria-label="Previous"
                >
                  <FaChevronLeft />
                </button>

                {/* Pagination Dots */}
                <div className="flex space-x-2">
                  {carouselItems.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        currentIndex === index ? "bg-purple-600" : "bg-gray-300"
                      }`}
                    ></div>
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-teal-500 text-white hover:bg-teal-600 transition-colors"
                  aria-label="Next"
                >
                  <FaChevronRight />
                </button>
              </div>

              <a
                href="#"
                className="bg-teal-500 text-white px-6 py-2.5 rounded-lg font-semibold flex items-center space-x-2 hover:bg-teal-600 transition-colors"
              >
                <span>View all</span>
                <FiArrowRight />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaInfo;
