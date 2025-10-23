"use client";

import { useState } from "react";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote:
        "Pelatihan K3 dari Delta Indonesia sangat profesional dan sesuai standar industri. Instruktur berpengalaman dan materi mudah dipahami.",
      name: "Budi Santoso",
      company: "PT Industri Manufaktur",
      rating: 5,
    },
    {
      quote:
        "Proses sertifikasi cepat dan mudah. Tim Delta Indonesia sangat membantu dari awal hingga selesai. Highly recommended!",
      name: "Siti Aminah",
      company: "PT Konstruksi Nasional",
      rating: 5,
    },
    {
      quote:
        "Kami sudah bekerja sama dengan Delta Indonesia selama 5 tahun untuk pelatihan in-house. Hasilnya sangat memuaskan dan profesional.",
      name: "Ahmad Rizki",
      company: "PT Energi Indonesia",
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark mb-4">Testimoni Klien</h2>
          <p className="text-lg text-gray-600">
            Apa kata mereka yang telah bekerja sama dengan kami
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary to-blue-700 rounded-2xl p-12 text-white shadow-2xl">
            <div className="flex justify-center mb-6">
              {Array.from({ length: testimonials[currentIndex].rating }).map(
                (_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-2xl" />
                )
              )}
            </div>
            <p className="text-xl text-center mb-8 leading-relaxed">
              "{testimonials[currentIndex].quote}"
            </p>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                👤
              </div>
              <h4 className="font-bold text-xl">
                {testimonials[currentIndex].name}
              </h4>
              <p className="text-blue-100">
                {testimonials[currentIndex].company}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition"
          >
            <FaChevronLeft className="text-primary" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition"
          >
            <FaChevronRight className="text-primary" />
          </button>

          {/* Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition ${
                  index === currentIndex ? "bg-primary w-8" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
