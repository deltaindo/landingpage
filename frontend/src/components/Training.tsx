"use client";

import { useState, useEffect, useCallback, ChangeEvent } from "react";
import {
  ChevronRight,
  Loader,
  AlertCircle,
  RefreshCw,
  Search,
  ChevronLeft,
} from "lucide-react";

// ==================== TYPES ====================
interface CourseSchedule {
  id: string;
  courseId: string;
  startDate: string;
  endDate: string;
  location?: string;
  type?: string;
  maxParticipants?: number;
  currentParticipants?: number;
  status?: string;
}

interface TrainingData {
  id: string;
  code: string;
  name: string;
  category: string;
  certification: string;
  courseSchedules?: CourseSchedule[];
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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!;
const ITEMS_PER_PAGE = 6;

// ==================== UTILS ====================

const categoryColors: Record<string, string> = {
  kemnaker: "bg-amber-100 text-amber-800 border-amber-200",
  bnsp: "bg-blue-100 text-blue-800 border-blue-200",
  inhouse: "bg-green-100 text-green-800 border-green-200",
  migas: "bg-purple-100 text-purple-800 border-purple-200",
};

const categoryNames: Record<string, string> = {
  kemnaker: "KEMNAKER",
  bnsp: "BNSP",
  inhouse: "INHOUSE",
};

function getNearestDate(schedules?: CourseSchedule[]): string {
  if (!schedules?.length) return "Belum ada jadwal";

  const today = new Date();
  const minimum = new Date(today);
  minimum.setDate(today.getDate() + 5);

  const upcoming = schedules
    .filter((s) => new Date(s.endDate) >= minimum)
    .sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());

  if (!upcoming.length) return "Belum ada jadwal";

  return new Date(upcoming[0].endDate).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ==================== COMPONENTS ====================

function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader className="w-12 h-12 text-blue-600 animate-spin" />
    </div>
  );
}

function ErrorState({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <div className="bg-red-100 p-4 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-xl font-bold mb-2">Terjadi Kesalahan</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={onRetry}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg inline-flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Coba Lagi
        </button>
      </div>
    </div>
  );
}

function EmptyState({ search }: { search: string }) {
  return (
    <div className="text-center py-20">
      <div className="text-6xl mb-3">📚</div>
      <h3 className="text-xl font-semibold">
        {search ? "Tidak Ada Hasil" : "Belum Ada Pelatihan"}
      </h3>
      <p className="text-gray-600">
        {search
          ? `Tidak ditemukan pelatihan untuk "${search}"`
          : "Saat ini belum ada pelatihan yang tersedia."}
      </p>
    </div>
  );
}

function TrainingCard({ training }: { training: TrainingData }) {
  return (
    <article className="bg-white rounded-xl shadow-md border hover:shadow-xl transition overflow-hidden">
      <div
        className="relative bg-cover bg-center p-6 pb-10"
        style={{ backgroundImage: "url('/images/training-card-bg.jpg')" }}
      >
        {/* <span className="absolute top-4 right-4 bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white">
          {training.category.toUpperCase()}
        </span> */}
        <h3 className="text-white font-bold text-lg mt-6 line-clamp-2">
          {training.name}
        </h3>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-500 min-w-[80px]">
            Jadwal
          </span>
          <span className="text-sm font-medium bg-gray-50 border px-3 py-1 rounded">
            {getNearestDate(training.courseSchedules)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-500 min-w-[80px]">
            Sertifikasi
          </span>
          {/* <span className="text-sm font-medium bg-amber-50 border border-amber-200 text-amber-800 px-3 py-1 rounded">
            {training.certification}
          </span>*/}
          <span
            className={`text-xs font-bold px-3 py-1 rounded border ${
              categoryColors[training.category] ?? categoryColors.kemnaker
            }`}
          >
            {categoryNames[training.category] ?? training.category.toUpperCase()}
          </span>
        </div>

        <button className="w-full bg-blue-600 py-3 text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition">
          Selengkapnya <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {

  if (totalPages <= 1) return null;

  const renderPages = () => {
    const pages: (number | string)[] = [];

    // Always show first page
    pages.push(1);

    // Show left ellipsis
    if (currentPage > 4) {
      pages.push("...");
    }

    // Show middle pages around current page
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }

    // Show right ellipsis
    if (currentPage < totalPages - 3) {
      pages.push("...");
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 border rounded-lg disabled:opacity-50"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Page Buttons */}
      {renderPages().map((value, index) =>
        value === "..." ? (
          <span key={`dots-${index}`} className="px-3 py-2 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={`page-${value}`}
            onClick={() => onPageChange(value as number)}
            className={`px-3 py-2 rounded-lg font-semibold transition ${
              currentPage === value
                ? "bg-blue-600 text-white"
                : "border hover:bg-gray-100"
            }`}
          >
            {value}
          </button>
        )
      )}


      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 border rounded-lg disabled:opacity-50"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}


// ==================== MAIN ====================

export default function Trainings() {
  const [trainings, setTrainings] = useState<TrainingData[]>([]);
  const [filtered, setFiltered] = useState<TrainingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/courses?limit=1000`);
      const json: ApiResponse = await res.json();

      if (!json.success) throw new Error("Invalid response");

      setTrainings(json.data);
      setFiltered(json.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal memuat pelatihan");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      q
        ? trainings.filter((t) =>
            [t.name, t.category, t.certification].some((v) =>
              v.toLowerCase().includes(q)
            )
          )
        : trainings
    );
    setPage(1);
  }, [search, trainings]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const visible = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={fetchData} />;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold">Pelatihan Profesional</h1>
          <p className="text-gray-600 mt-2">
            Tingkatkan skill Anda dengan pelatihan terbaik dari Delta Indonesia
          </p>
        </header>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-10">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              placeholder="Cari pelatihan..."
              value={search}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold">
            {filtered.length} Tersedia
          </span>
        </div>

        {filtered.length === 0 ? (
          <EmptyState search={search} />
        ) : (
          <>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visible.map((t) => (
                <TrainingCard key={t.id} training={t} />
              ))}
            </section>

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />

          </>
        )}
      </div>
    </div>
  );
}
