"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { courseAPI } from "@/lib/api";
import { Search, ChevronLeft, ChevronRight, Filter } from "lucide-react";

// ==================== TYPES ====================
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

type SortField = "name" | "code" | "category";
type SortOrder = "asc" | "desc";

// ==================== CONSTANTS ====================
const ITEMS_PER_PAGE = 9;

// ==================== PAGINATION COMPONENT ====================
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-12 pb-8">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Halaman sebelumnya"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }).map((_, index) => {
          const page = index + 1;
          const isActive = page === currentPage;

          // Show first, last, current, and adjacent pages
          const showPage =
            page === 1 ||
            page === totalPages ||
            page === currentPage ||
            Math.abs(page - currentPage) <= 1;

          if (!showPage && index > 0 && index < totalPages - 1) {
            if (index === 1)
              return (
                <span key="dots-start" className="text-gray-500">
                  ...
                </span>
              );
            if (index === totalPages - 2)
              return (
                <span key="dots-end" className="text-gray-500">
                  ...
                </span>
              );
            return null;
          }

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-2 rounded-lg font-semibold transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "border border-gray-300 hover:bg-gray-100"
              }`}
              aria-label={`Halaman ${page}`}
              aria-current={isActive ? "page" : undefined}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Halaman berikutnya"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

// ==================== COURSE CARD COMPONENT ====================
function CourseCard({ course }: { course: Course }) {
  return (
    <article className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      {/* Card Header */}
      <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 p-6 pb-8">
        {course.featured && (
          <span className="absolute top-4 left-4 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
            Featured
          </span>
        )}
        <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
          {course.category.toUpperCase()}
        </span>
        <h3 className="text-white font-bold text-lg line-clamp-2 mt-6">
          {course.name}
        </h3>
      </div>

      {/* Card Body */}
      <div className="p-6">
        {/* Duration */}
        <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
          <span className="font-semibold">Durasi:</span>
          <span>
            {course.durationValue} {course.durationUnit}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm line-clamp-2 mb-4">
          {course.description}
        </p>

        {/* Code & Certification */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 uppercase min-w-[70px]">
              Kode
            </span>
            <span className="text-sm font-mono text-gray-900 bg-gray-50 px-2 py-1 rounded border border-gray-200">
              {course.code}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 uppercase min-w-[70px]">
              Sertifikat
            </span>
            <span className="text-sm text-amber-800 bg-amber-50 px-2 py-1 rounded border border-amber-200 font-medium">
              {course.certification}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link
            href={`/courses/${course.id}/detail`}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-center text-sm"
          >
            Detail
          </Link>
          <Link
            href={`/courses/${course.id}/register`}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-2 px-4 rounded-lg transition-colors text-center text-sm"
          >
            Daftar
          </Link>
        </div>
      </div>
    </article>
  );
}

// ==================== MAIN COMPONENT ====================
export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // NEW: Sort states
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [showSortMenu, setShowSortMenu] = useState(false);

  // NEW: Get unique categories from courses
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  const categories = [
    { value: "all", label: "Semua Pelatihan" },
    { value: "kemnaker", label: "Reguler" },
    { value: "inhouse", label: "In-House" },
  ];

  // Fetch courses - FIXED: Remove limit to get all courses
  useEffect(() => {
    fetchCourses();
  }, [filter]);

  const fetchCourses = async () => {
    try {
      setLoading(true);

      // CRITICAL FIX: Add limit parameter with a large value or no limit
      // Option 1: Use a very large limit
      const response = await courseAPI.getAll({
        category: filter === "all" ? "" : filter,
        status: "active",
        limit: 10000, // Set a very large limit to get all courses
        // Option 2: If your API supports it, you can also try:
        // limit: 0, // Some APIs use 0 to mean "no limit"
        // or remove the limit parameter entirely if the API allows it
      });

      setCourses(response.data);

      // Extract unique categories from all courses
      const uniqueCategories = Array.from(
        new Set(response.data.map((course: Course) => course.category))
      ).filter(Boolean) as string[];

      setAvailableCategories(uniqueCategories);

      setFilteredCourses(response.data);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter and search courses
  useEffect(() => {
    let result = [...courses];

    // Apply search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (course) =>
          course.name.toLowerCase().includes(query) ||
          course.code.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          course.certification.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "code":
          aValue = a.code.toLowerCase();
          bValue = b.code.toLowerCase();
          break;
        case "category":
          aValue = a.category.toLowerCase();
          bValue = b.category.toLowerCase();
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredCourses(result);
    setCurrentPage(1); // Reset to first page when filtering/sorting
  }, [searchQuery, courses, sortField, sortOrder]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCourses = filteredCourses.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Sort options
  const sortOptions = [
    { field: "name" as SortField, label: "Nama" },
    { field: "code" as SortField, label: "Kode" },
    { field: "category" as SortField, label: "Kategori" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Program Pelatihan K3
          </h1>
          <p className="text-gray-600 text-lg">
            Pilih program pelatihan yang sesuai dengan kebutuhan Anda
          </p>
        </header>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari pelatihan berdasarkan nama, kode, atau sertifikasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-base"
            />
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  setFilter(cat.value);
                  setSearchQuery("");
                }}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  filter === cat.value
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-gray-700"
            >
              <Filter className="w-4 h-4" />
              <span>Urutkan</span>
            </button>

            {showSortMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="p-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                    Urutkan Berdasarkan
                  </p>
                  {sortOptions.map((option) => (
                    <button
                      key={option.field}
                      onClick={() => {
                        setSortField(option.field);
                        setShowSortMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md mb-1 transition-colors ${
                        sortField === option.field
                          ? "bg-blue-50 text-blue-700 font-semibold"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <div className="border-t border-gray-200 p-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                    Urutan
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSortOrder("asc");
                        setShowSortMenu(false);
                      }}
                      className={`flex-1 px-3 py-2 rounded-md transition-colors ${
                        sortOrder === "asc"
                          ? "bg-blue-600 text-white font-semibold"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      A → Z
                    </button>
                    <button
                      onClick={() => {
                        setSortOrder("desc");
                        setShowSortMenu(false);
                      }}
                      className={`flex-1 px-3 py-2 rounded-md transition-colors ${
                        sortOrder === "desc"
                          ? "bg-blue-600 text-white font-semibold"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Z → A
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <span className="text-sm text-gray-600">
            Menampilkan{" "}
            <span className="font-semibold text-gray-900">
              {Math.min(startIndex + 1, filteredCourses.length)}-
              {Math.min(startIndex + ITEMS_PER_PAGE, filteredCourses.length)}
            </span>{" "}
            dari{" "}
            <span className="font-semibold text-gray-900">
              {filteredCourses.length}
            </span>{" "}
            pelatihan
            {searchQuery && ` (hasil pencarian: "${searchQuery}")`}
          </span>
        </div>

        {/* Courses Grid or Empty State */}
        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-600 font-medium">Memuat pelatihan...</p>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {searchQuery ? "Tidak Ada Hasil" : "Tidak ada pelatihan tersedia"}
            </h3>
            <p className="text-gray-600">
              {searchQuery
                ? `Tidak ditemukan pelatihan untuk "${searchQuery}"`
                : "Coba ubah filter atau cari dengan kata kunci lain"}
            </p>
          </div>
        ) : (
          <>
            <section
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              aria-label="Daftar program pelatihan"
            >
              {paginatedCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </section>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
}
