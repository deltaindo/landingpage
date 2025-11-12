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
  description?: string;
  course_type?: string;
  course_description?: string;
}

export default function Training() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    fetchCourses();
  }, [activeCategory]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);

      // Build query string dengan filter category
      const queryParams = new URLSearchParams();
      queryParams.append("featured", "true");
      queryParams.append("limit", "6");
      if (activeCategory !== "all") {
        queryParams.append("category", activeCategory);
      }

      const response = await fetch(
        `http://localhost:5000/api/courses?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ API Response:", data);

      // Handle response format yang berbeda
      if (data.success && Array.isArray(data.data)) {
        setCourses(data.data);
      } else if (Array.isArray(data)) {
        setCourses(data);
      } else if (data.data) {
        setCourses(Array.isArray(data.data) ? data.data : []);
      } else {
        setError("Format data tidak sesuai");
        setCourses([]);
      }
    } catch (error) {
      console.error("❌ Error fetching courses:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Gagal memuat pelatihan. Pastikan backend berjalan!"
      );
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: "all", label: "Semua Pelatihan" },
    { value: "kemnaker", label: "Kemnaker" },
    { value: "bnsp", label: "BNSP" },
    { value: "migas", label: "Migas" },
  ];

  const filteredCourses =
    activeCategory === "all"
      ? courses
      : courses.filter(
          (course) =>
            course.category?.toLowerCase() === activeCategory.toLowerCase()
        );

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="inline-flex flex-col items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-primary"></div>
              <p className="mt-6 text-gray-600 font-medium">
                Memuat pelatihan...
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-dark mb-4">
            Program Pelatihan K3
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pilih program pelatihan yang sesuai dengan kebutuhan Anda
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeCategory === cat.value
                  ? "bg-primary text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-primary"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 rounded">
            <p className="text-red-800 font-semibold">⚠️ Error:</p>
            <p className="text-red-700 text-sm mt-1">{error}</p>
            <button
              onClick={() => fetchCourses()}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* Debug Info */}
        <div className="mb-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
          <p className="text-blue-800 text-sm">
            <strong>Total Courses:</strong> {courses.length} |{" "}
            <strong>Filtered:</strong> {filteredCourses.length} |{" "}
            <strong>Category:</strong> {activeCategory}
          </p>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-20">
            <div className="mb-6 text-6xl">🎓</div>
            <p className="text-xl text-gray-600 mb-8 font-medium">
              Tidak ada pelatihan tersedia
            </p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow-lg"
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
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {filteredCourses.slice(0, 3).map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100"
                >
                  {/* Course Image */}
                  <div className="h-56 bg-gradient-to-br from-primary to-blue-600 relative overflow-hidden flex items-center justify-center">
                    {course.featured && (
                      <span className="absolute top-4 right-4 bg-white text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg z-10">
                        Featured
                      </span>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center opacity-60 group-hover:opacity-80 transition-opacity duration-300">
                      <span className="text-8xl drop-shadow-lg">🎓</span>
                    </div>
                  </div>

                  {/* Course Info */}
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4 gap-3">
                      <span className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wide rounded-full">
                        {course.category?.toUpperCase() || "UMUM"}
                      </span>
                      <span className="text-gray-600 text-sm font-medium">
                        {course.duration_value} {course.duration_unit}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-dark mb-2 line-clamp-2 group-hover:text-primary transition min-h-[3.5rem]">
                      {course.name}
                    </h3>

                    {course.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {course.description}
                      </p>
                    )}

                    {course.course_type && (
                      <p className="text-sm font-semibold text-dark mb-6 pb-4 border-b border-gray-100">
                        {course.course_type}
                      </p>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-auto">
                      <Link
                        href={`/courses/${course.id}/detail`}
                        className="flex-1 text-center px-4 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all font-semibold text-sm uppercase tracking-wide"
                      >
                        Detail
                      </Link>
                      <Link
                        href={`/courses/${course.id}/register`}
                        className="flex-1 text-center px-4 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition-all font-semibold text-sm uppercase tracking-wide shadow-md hover:shadow-lg"
                      >
                        Daftar Sekarang
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
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
