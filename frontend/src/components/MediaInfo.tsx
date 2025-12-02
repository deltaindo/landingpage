"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface NewsItem {
  id: string;
  date: string;
  title: string;
  description: string;
  label: string;
  image: string;
}

interface CarouselItem {
  id: string;
  cards: NewsItem[];
}

const BeritaTerbaru: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);

  const newsData: CarouselItem[] = [
    {
      id: "1",
      cards: [
        {
          id: "news-1",
          date: "21 October 2025",
          title: "Delta Indonesia dan BNSP Perkuat Kerjasama Sertifikasi",
          description:
            "Penguatan kerjasama strategis untuk meningkatkan standar sertifikasi K3 di Indonesia.",
          label: "Media Release",
          image: "/images/berita-1.png",
        },
        {
          id: "news-2",
          date: "20 October 2025",
          title: "Pelatihan In-House untuk Perusahaan Manufaktur",
          description:
            "Program pelatihan khusus disesuaikan dengan kebutuhan industri manufaktur modern.",
          label: "Media Release",
          image: "/images/berita-2.png",
        },
      ],
    },
    {
      id: "2",
      cards: [
        {
          id: "news-3",
          date: "15 October 2025",
          title: "Sertifikasi ISO Terbaru untuk Layanan Konsultasi",
          description:
            "Pencapaian sertifikasi internasional untuk meningkatkan kualitas layanan kami.",
          label: "Media Release",
          image: "/images/berita-3.png",
        },
        {
          id: "news-4",
          date: "10 October 2025",
          title: "Program Magang Terbuka untuk Fresh Graduate",
          description:
            "Kesempatan magang di perusahaan terkemuka dengan mentoring profesional.",
          label: "Featured",
          image: "/images/berita-4.png",
        },
      ],
    },
    {
      id: "3",
      cards: [
        {
          id: "news-5",
          date: "5 October 2025",
          title: "Webinar Gratis: Tren Keselamatan Kerja 2025",
          description:
            "Diskusi mendalam tentang tren dan inovasi terbaru dalam keselamatan kerja.",
          label: "Media Release",
          image: "/images/berita-5.png",
        },
        {
          id: "news-6",
          date: "1 October 2025",
          title: "Ekspansi Kantor Cabang ke Surabaya",
          description:
            "Membuka peluang baru untuk melayani lebih banyak klien di kawasan timur.",
          label: "Media Release",
          image: "/images/berita-3.png",
        },
      ],
    },
  ];

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % newsData.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isAutoPlay, newsData.length]);

  const handlePrevSlide = () => {
    setIsAutoPlay(false);
    setCurrentSlide((prev) => (prev - 1 + newsData.length) % newsData.length);
  };

  const handleNextSlide = () => {
    setIsAutoPlay(false);
    setCurrentSlide((prev) => (prev + 1) % newsData.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlay(false);
    setCurrentSlide(index);
  };

  return (
    <section className="py-10 px-5 bg-gray-100 md:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold mb-3 text-gray-900">
            Berita Terbaru
          </h1>
          <p className="text-gray-600 text-base leading-relaxed max-w-2xl">
            Tetap terinformasi dengan rilis media terbaru kami yang menampilkan
            pengumuman penting, wawasan mendalam, serta perkembangan terkini.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 align-start">
          {/* Pinned Card (Left) - with full background image */}
          <div className="lg:col-span-1 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl overflow-hidden min-h-96 relative shadow-lg">
            {/* Background Image */}
            <Image
              src="/images/featured.png"
              alt="Featured"
              fill
              className="object-cover"
              priority={true}
            />

            {/* Overlay to darken image for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/70 to-blue-700/70 z-0" />

            {/* Content */}
            <div className="relative z-10 p-8 text-white flex flex-col justify-between h-full">
              <button className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-lg transition-all">
                →
              </button>

              <div>
                <span className="inline-block bg-white/25 px-4 py-1.5 rounded-full text-xs font-semibold mb-4">
                  Featured
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4 leading-snug">
                  Pelatihan K3 Ahli Umum Batch November 2025
                </h3>
                <div className="text-sm opacity-80">7 November 2025</div>
              </div>
            </div>
          </div>

          {/* Carousel (Right) */}
          <div className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {newsData.map((item) => (
                  <div
                    key={item.id}
                    className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {item.cards.map((card) => (
                      <DynamicCard key={card.id} card={card} />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="flex justify-center items-center gap-3 mt-6">
              <button
                onClick={handlePrevSlide}
                className="w-10 h-10 rounded-full bg-gray-300 hover:bg-blue-600 text-gray-600 hover:text-white flex items-center justify-center text-lg transition-all"
              >
                ←
              </button>
              <div className="flex gap-2">
                {newsData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all ${
                      index === currentSlide
                        ? "w-6 h-2 rounded bg-blue-600"
                        : "w-2 h-2 rounded-full bg-gray-300"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={handleNextSlide}
                className="w-10 h-10 rounded-full bg-gray-300 hover:bg-blue-600 text-gray-600 hover:text-white flex items-center justify-center text-lg transition-all"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition-all">
            View all →
          </button>
        </div>
      </div>
    </section>
  );
};

interface DynamicCardProps {
  card: NewsItem;
}

const DynamicCard: React.FC<DynamicCardProps> = ({ card }) => {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col h-full">
      <div className="relative w-full h-60 bg-gradient-to-br from-blue-600 to-blue-400 overflow-hidden">
        <Image
          src={card.image}
          alt={card.title}
          fill
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={false}
        />
        <span className="absolute top-4 right-4 bg-white/95 px-3 py-1 rounded-full text-xs font-semibold text-gray-900">
          {card.label}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="text-xs text-gray-500 mb-2">{card.date}</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {card.title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {card.description}
        </p>
      </div>
    </article>
  );
};

export default BeritaTerbaru;
