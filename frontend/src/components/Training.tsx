"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Course {
  id: string;
  code: string;
  name: string;
  category: string;
  duration_value: number;
  duration_unit: string;
  price_regular: number;
  featured: boolean;
}

export default function Training() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      // Fetch featured courses for homepage
      const response = await fetch(
        "http://localhost:5000/api/courses?featured=true&limit=6"
      );
      const data = await response.json();

      if (data.success) {
        setCourses(data.data);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: "all", label: "Semua" },
    { value: "kemnaker", label: "Kemnaker" },
    { value: "bnsp", label: "BNSP" },
    { value: "migas", label: "Migas" },
  ];

  const filteredCourses =
    activeCategory === "all"
      ? courses
      : courses.filter((course) => course.category === activeCategory);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat pelatihan...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark mb-4">
            Program Pelatihan K3
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pilih program pelatihan yang sesuai dengan kebutuhan Anda
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeCategory === cat.value
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Tidak ada pelatihan tersedia</p>
            <Link
              href="/courses"
              className="mt-4 inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition"
            >
              Lihat Semua Pelatihan
            </Link>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition group"
                >
                  {/* Course Image */}
                  <div className="h-48 bg-gradient-to-br from-primary to-blue-600 relative overflow-hidden">
                    {course.featured && (
                      <span className="absolute top-4 right-4 bg-white text-primary px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </span>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center text-white text-6xl opacity-50">
                      🎓
                    </div>
                  </div>

                  {/* Course Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-semibold">
                        {course.category.toUpperCase()}
                      </span>
                      <span className="text-gray-600 text-sm">
                        {course.duration_value} {course.duration_unit}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-dark mb-3 group-hover:text-primary transition min-h-[3.5rem]">
                      {course.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    {/*
                    <div className="flex items-baseline justify-between mb-4 border-t border-gray-200 pt-4">
                      <div>
                        <p className="text-2xl font-bold text-primary">
                          Rp {course.price_regular?.toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>
                    */}

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Link
                        href={`/courses/${course.id}/detail`}
                        className="flex-1 text-center px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition font-semibold"
                      >
                        Detail
                      </Link>
                      <Link
                        href={`/courses/${course.id}/register`}
                        className="flex-1 text-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                      >
                        Daftar Sekarang
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-12">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                Lihat Semua Pelatihan
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
