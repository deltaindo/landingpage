"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ChevronRight,
  Loader,
  AlertCircle,
  RefreshCw,
  Search,
  ChevronLeft,
} from "lucide-react";

// ==================== TYPES ====================
interface TrainingData {
  id: string;
  code: string;
  name: string;
  category: string;
  certification: string;
}

interface ApiResponse {
  success: boolean;
  data: TrainingData[];
  pagination: {
    total: number;
    pages: number;
    currentPage?: number;
    limit?: number;
  };
}

// ==================== CONSTANTS ====================
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const ITEMS_PER_PAGE = 6;

// ==================== LOADING STATE ====================
function LoadingState() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
        <p className="text-gray-600 font-medium">Memuat pelatihan...</p>
      </div>
    </div>
  );
}

// ==================== ERROR STATE ====================
interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div
        className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center"
        role="alert"
      >
        <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Terjadi Kesalahan
        </h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={onRetry}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 inline-flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Coba Lagi
        </button>
      </div>
    </div>
  );
}

// ==================== EMPTY STATE ====================
interface EmptyStateProps {
  searchQuery: string;
}

function EmptyState({ searchQuery }: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">📚</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {searchQuery ? "Tidak Ada Hasil" : "Belum Ada Pelatihan"}
      </h3>
      <p className="text-gray-600">
        {searchQuery
          ? `Tidak ditemukan pelatihan untuk "${searchQuery}"`
          : "Saat ini belum ada pelatihan yang tersedia."}
      </p>
    </div>
  );
}

// ==================== TRAINING CARD ====================
interface TrainingCardProps {
  training: TrainingData;
}

function TrainingCard({ training }: TrainingCardProps) {
  return (
    <article className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      {/* Card Header */}
      <div
        className="relative bg-cover bg-center bg-no-repeat p-6 pb-8"
        style={{ backgroundImage: "url('/images/training-card-bg.jpg')" }}
      >
        <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
          {training.category}
        </span>
        <h3 className="text-white font-bold text-lg line-clamp-2 mt-6">
          {training.name}
        </h3>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <div className="space-y-3 mb-6">
          {/* Code */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 uppercase min-w-[80px]">
              Kode
            </span>
            <span className="text-sm font-mono text-gray-900 bg-gray-50 px-3 py-1 rounded-md border border-gray-200">
              {training.code}
            </span>
          </div>

          {/* Certification */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 uppercase min-w-[80px]">
              Sertifikasi
            </span>
            <span className="text-sm text-amber-800 bg-amber-50 px-3 py-1 rounded-md border border-amber-200 font-medium">
              {training.certification}
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group/btn"
          aria-label={`Lihat detail pelatihan ${training.name}`}
        >
          Selengkapnya
          <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </article>
  );
}

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

// ==================== MAIN COMPONENT ====================
export default function Trainings() {
  const [trainings, setTrainings] = useState<TrainingData[]>([]);
  const [filteredTrainings, setFilteredTrainings] = useState<TrainingData[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchTrainings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/courses?limit=1000`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse = await response.json();

      if (result.success && Array.isArray(result.data)) {
        setTrainings(result.data);
        setFilteredTrainings(result.data);
        setTotalCount(result.pagination?.total || result.data.length);
        setCurrentPage(1);
      } else {
        throw new Error("Format respons tidak valid");
      }
    } catch (err) {
      console.error("Error fetching trainings:", err);
      setError(err instanceof Error ? err.message : "Gagal memuat pelatihan");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrainings();
  }, [fetchTrainings]);

  // Filter trainings based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredTrainings(trainings);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = trainings.filter(
        (training) =>
          training.name.toLowerCase().includes(query) ||
          training.code.toLowerCase().includes(query) ||
          training.category.toLowerCase().includes(query) ||
          training.certification.toLowerCase().includes(query)
      );
      setFilteredTrainings(filtered);
    }
    setCurrentPage(1); // Reset to first page when searching
  }, [searchQuery, trainings]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredTrainings.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTrainings = filteredTrainings.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={fetchTrainings} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Pelatihan Profesional
          </h1>
          <p className="text-gray-600 text-lg">
            Tingkatkan skill Kami dengan pelatihan terbaik dari Delta Indonesia
          </p>
        </header>

        {/* Search & Count */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Search Bar */}
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari pelatihan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Count Badge */}
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap">
              {filteredTrainings.length}{" "}
              {filteredTrainings.length !== totalCount && `dari ${totalCount}`}{" "}
              Tersedia
            </span>
          </div>
        </div>

        {/* Trainings Grid or Empty State */}
        {filteredTrainings.length === 0 ? (
          <EmptyState searchQuery={searchQuery} />
        ) : (
          <>
            <section
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              aria-label="Daftar pelatihan"
            >
              {paginatedTrainings.map((training) => (
                <TrainingCard key={training.id} training={training} />
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
