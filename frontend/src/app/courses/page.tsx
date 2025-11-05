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
  durationValue: number;
  durationUnit: string;
  description: string;
  priceRegular: number;
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
    { value: "kemnaker", label: "Reguler" },
    /*{ value: "bnsp", label: "BNSP" },*/
    /*{ value: "migas", label: "Migas" },*/
    { value: "inhouse", label: "In-House" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span className="text-xl font-bold text-primary">
                Kembali ke Beranda
              </span>
            </Link>
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="text-gray-700 hover:text-primary transition"
              >
                Beranda
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-primary transition"
              >
                Tentang
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-primary transition"
              >
                Kontak
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="py-12">
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Delta Indonesia</h3>
              <p className="text-gray-400">
                Pusat Pelatihan K3 Terpercaya di Indonesia
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Layanan</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/courses">Pelatihan K3</Link>
                </li>
                <li>
                  <Link href="/certification">Sertifikasi</Link>
                </li>
                <li>
                  <Link href="/consulting">Konsultasi</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Perusahaan</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about">Tentang Kami</Link>
                </li>
                <li>
                  <Link href="/contact">Kontak</Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kontak</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@deltaindo.co.id</li>
                <li>Telp: (021) 1234-5678</li>
                <li>WhatsApp: +62 812-3456-7890</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Delta Indonesia. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Course Card Component - PRICING HIDDEN
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
            {course.durationValue} {course.durationUnit}
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

        {/* ❌ PRICING SECTION REMOVED */}
        {/* <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div>
            <p className="text-2xl font-bold text-primary">
              Rp {course.priceRegular?.toLocaleString('id-ID')}
            </p>
          </div>
        </div> */}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <Link
            href={`/courses/${course.id}/detail`}
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
