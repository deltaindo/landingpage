"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { courseAPI } from "@/lib/api";

interface Course {
  id: string;
  code: string;
  name: string;
  category: string;
  certification: string;
  duration_value: number;
  duration_unit: string;
  description: string;
  price_regular: number;
  images: any[];
  featured: boolean;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchCourses();
  }, [filter]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await courseAPI.getAll({
        category: filter === "all" ? "" : filter,
        status: "active",
      });
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: "all", label: "Semua Pelatihan" },
    { value: "kemnaker", label: "Kemnaker RI" },
    { value: "bnsp", label: "BNSP" },
    { value: "migas", label: "Migas" },
    { value: "inhouse", label: "In-House" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-dark mb-4">
            Program Pelatihan K3
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pilih program pelatihan yang sesuai dengan kebutuhan Anda
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                filter === cat.value
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat pelatihan...</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Tidak ada pelatihan tersedia</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Course Card Component
function CourseCard({ course }: { course: Course }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition group">
      {/* Course Image */}
      <div className="h-48 bg-gradient-to-br from-primary to-blue-600 relative overflow-hidden">
        {course.featured && (
          <span className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold">
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

        <h3 className="text-xl font-bold text-dark mb-2 group-hover:text-primary transition">
          {course.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-500">{course.certification}</div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div>
            <p className="text-2xl font-bold text-primary">
              Rp {course.price_regular?.toLocaleString("id-ID")}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <Link
            href={`/courses/${course.id}`}
            className="flex-1 text-center px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition"
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
  );
}
