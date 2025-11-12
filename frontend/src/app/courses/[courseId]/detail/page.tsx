"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
  objectives: string[];
  prerequisites: string[];
  priceRegular: number;
  featured: boolean;
  courseSchedules?: any[];
}

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourse();
  }, [params.courseId]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await courseAPI.getById(params.courseId as string);
      setCourse(response.data);
    } catch (error) {
      console.error("Error fetching course:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat detail pelatihan...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-dark mb-4">
            Pelatihan tidak ditemukan
          </h2>
          <Link
            href="/courses"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition"
          >
            Kembali ke Daftar Pelatihan
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/courses" className="flex items-center gap-3">
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
                Kembali ke Daftar Pelatihan
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
                href="/courses"
                className="text-gray-700 hover:text-primary transition"
              >
                Pelatihan
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

      {/* Course Detail Content */}
      <div className="py-12">
        <div className="max-w-5xl mx-auto px-6">
          {/* Header Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-semibold inline-block mb-3">
                  {course.category.toUpperCase()}
                </span>
                {course.featured && (
                  <span className="ml-2 px-3 py-1 bg-secondary text-white text-sm rounded-full font-semibold inline-block mb-3">
                    Featured
                  </span>
                )}
                <h1 className="text-4xl font-bold text-dark mb-2">
                  {course.name}
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                  Kode: <span className="font-semibold">{course.code}</span>
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl mb-2">📅</div>
                <p className="text-sm text-gray-600">Durasi</p>
                <p className="font-bold text-dark">
                  {course.durationValue} {course.durationUnit}
                </p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl mb-2">🎓</div>
                <p className="text-sm text-gray-600">Sertifikasi</p>
                <p className="font-bold text-dark">{course.certification}</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl mb-2">👥</div>
                <p className="text-sm text-gray-600">Kategori</p>
                <p className="font-bold text-dark">
                  {course.category.toUpperCase()}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-dark mb-4 flex items-center gap-2">
              <span className="text-3xl">📋</span>
              Deskripsi Pelatihan
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Objectives */}
          {course.objectives && course.objectives.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-dark mb-4 flex items-center gap-2">
                <span className="text-3xl">🎯</span>
                Tujuan Pembelajaran
              </h2>
              <ul className="space-y-3">
                {course.objectives.map((obj, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Prerequisites */}
          {course.prerequisites && course.prerequisites.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-dark mb-4 flex items-center gap-2">
                <span className="text-3xl">✅</span>
                Persyaratan
              </h2>
              <ul className="space-y-3">
                {course.prerequisites.map((prereq, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-primary text-xl">•</span>
                    <span className="text-gray-700">{prereq}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Schedules */}
          {course.courseSchedules && course.courseSchedules.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-dark mb-4 flex items-center gap-2">
                <span className="text-3xl">📅</span>
                Jadwal Tersedia
              </h2>
              <div className="space-y-4">
                {course.courseSchedules.map((schedule: any, index: number) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 hover:border-primary transition"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-dark mb-1">
                          {schedule.location}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(schedule.startDate).toLocaleDateString(
                            "id-ID"
                          )}{" "}
                          -{" "}
                          {new Date(schedule.endDate).toLocaleDateString(
                            "id-ID"
                          )}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Tipe:{" "}
                          <span className="font-semibold">{schedule.type}</span>
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          schedule.status === "open"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {schedule.status === "open" ? "Tersedia" : "Penuh"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary to-blue-600 rounded-xl shadow-lg p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Siap Bergabung?</h2>
            <p className="text-lg mb-6 opacity-90">
              Daftarkan diri Anda sekarang dan tingkatkan kompetensi K3 Anda!
            </p>
            <Link
              href={`/courses/${course.id}/register`}
              className="inline-block px-8 py-4 bg-white text-primary rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-lg"
            >
              Daftar Sekarang
            </Link>
          </div>
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
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kontak</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@deltaindo.co.id</li>
                <li>Telp: (021) 1234-5678</li>
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
