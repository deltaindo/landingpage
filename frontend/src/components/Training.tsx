"use client";

import { useState, useEffect } from "react";
import {
  ChevronRight,
  Loader,
  AlertCircle,
  RefreshCw,
  Search,
  ChevronLeft,
} from "lucide-react";

// ===== TYPES =====
interface CourseSchedule {
  toDate: string;
  endDate: string;
}

interface TrainingData {
  id: string;
  name: string;
  category: string; // kemnaker, bnsp, inhouse, migas
  courseSchedules?: CourseSchedule[];
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const ITEMS_PER_PAGE = 6;

// ===== HELPER FUNCTIONS =====

// Get color for category badge
function getCategoryBadge(category: string) {
  const colors: any = {
    kemnaker: "bg-amber-100 text-amber-800 border-amber-300",
    bnsp: "bg-blue-100 text-blue-800 border-blue-300",
    inhouse: "bg-green-100 text-green-800 border-green-300",
    migas: "bg-purple-100 text-purple-800 border-purple-300",
  };
  return colors[category] || colors.kemnaker;
}

// Capitalize category display name
function getCategoryDisplayName(category: string) {
  const names: any = {
    kemnaker: "KEMNAKER",
    bnsp: "BNSP",
    inhouse: "INHOUSE",
    migas: "MIGAS",
  };
  return names[category] || category.toUpperCase();
}

// Get nearest course date that has 5+ days left
function getNearestDate(schedules?: CourseSchedule[]): string {
  if (!schedules || schedules.length === 0) return "Belum ada jadwal";

  const today = new Date();
  const minimumDate = new Date(today);
  minimumDate.setDate(minimumDate.getDate() + 5);

  // Find all schedules with 5+ days remaining (checking toDate)
  const available = schedules.filter((s) => {
    const checkDate = new Date(s.toDate || s.endDate);
    return checkDate >= minimumDate;
  });

  if (available.length === 0) return "Belum ada jadwal";

  // Get the earliest one
  const earliest = available.sort((a, b) => {
    const dateA = new Date(a.toDate || a.endDate);
    const dateB = new Date(b.toDate || b.endDate);
    return dateA.getTime() - dateB.getTime();
  });

  // Format: "15 Desember 2025"
  const date = new Date(earliest.toDate || earliest.endDate);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ===== CARD COMPONENT =====
function TrainingCard({ training }: { training: TrainingData }) {
  const nearestDate = getNearestDate(training.courseSchedules);
  const badgeColor = getCategoryBadge(training.category);
  const categoryDisplayName = getCategoryDisplayName(training.category);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden border border-gray-100">
      {/* Header with blue background */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
        <h3 className="text-lg font-bold line-clamp-2">{training.name}</h3>
      </div>

      {/* Body */}
      <div className="p-6 space-y-4">
        {/* Date Row */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-gray-600 w-20">TANGGAL</span>
          <span className="text-sm text-gray-900 bg-gray-100 px-3 py-1 rounded border border-gray-200 font-medium">
            {nearestDate}
          </span>
        </div>

        {/* Category Row - Replaced "Sertifikasi" with dynamic category */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-gray-600 w-20">KATEGORI</span>
          <span className={`text-sm px-3 py-1 rounded border font-semibold ${badgeColor}`}>
            {categoryDisplayName}
          </span>
        </div>

        {/* Button */}
        <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2">
          Selengkapnya
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ===== MAIN COMPONENT =====
export default function Trainings() {
  const [trainings, setTrainings] = useState<TrainingData[]>([]);
  const [filteredTrainings, setFilteredTrainings] = useState<TrainingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/courses?limit=1000`);
        const data = await res.json();

        if (data.success && data.data) {
          setTrainings(data.data);
          setFilteredTrainings(data.data);
        }
      } catch (err: any) {
        setError(err.message || "Gagal memuat pelatihan");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter when search changes
  useEffect(() => {
    if (!search.trim()) {
      setFilteredTrainings(trainings);
    } else {
      const query = search.toLowerCase();
      const filtered = trainings.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.category.toLowerCase().includes(query)
      );
      setFilteredTrainings(filtered);
    }
    setPage(1);
  }, [search, trainings]);

  // Pagination
  const totalPages = Math.ceil(filteredTrainings.length / ITEMS_PER_PAGE);
  const startIdx = (page - 1) * ITEMS_PER_PAGE;
  const paginatedTrainings = filteredTrainings.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Memuat pelatihan...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">Terjadi Kesalahan</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            <RefreshCw className="w-4 h-4 inline mr-2" />
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (filteredTrainings.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">📚</p>
          <h3 className="text-xl font-bold text-gray-900">Belum Ada Pelatihan</h3>
          <p className="text-gray-600 mt-2">Saat ini belum ada pelatihan tersedia</p>
        </div>
      </div>
    );
  }

  // Main render
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Pelatihan Profesional
          </h1>
          <p className="text-gray-600 text-lg">
            Tingkatkan skill dengan pelatihan terbaik dari Delta Indonesia
          </p>
        </div>

        {/* Search & Count */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari pelatihan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold text-sm">
            {filteredTrainings.length} Tersedia
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {paginatedTrainings.map((training) => (
            <TrainingCard key={training.id} training={training} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="p-2 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-2 rounded-lg font-semibold transition ${
                  page === p
                    ? "bg-blue-600 text-white"
                    : "border border-gray-300 hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="p-2 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
