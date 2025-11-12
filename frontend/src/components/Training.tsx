"use client";

import { useState, useEffect } from "react";
import { ChevronRight, Loader, AlertCircle, RefreshCw } from "lucide-react";

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
  };
}

export default function Trainings() {
  const [trainings, setTrainings] = useState<TrainingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("http://localhost:5000/api/courses");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse = await response.json();
      console.log("Trainings fetched successfully:", result);

      if (result.success && Array.isArray(result.data)) {
        setTrainings(result.data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching trainings:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch trainings"
      );
    } finally {
      setLoading(false);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-md">
          <div className="flex justify-center mb-6">
            <div className="relative w-16 h-16">
              <div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-full animate-spin"
                style={{
                  clipPath:
                    "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%)",
                }}
              ></div>
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                <Loader className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Loading Trainings
          </h3>
          <p className="text-gray-500">Fetching latest training data...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 rounded-full p-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <h3 className="text-center text-xl font-semibold text-gray-800 mb-2">
            Oops! Something Went Wrong
          </h3>
          <p className="text-center text-gray-600 mb-6">
            <span className="block text-sm text-red-600 font-mono bg-red-50 p-3 rounded-lg mb-3">
              {error}
            </span>
            We encountered an issue while loading trainings. Please try again.
          </p>
          <button
            onClick={fetchTrainings}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
          <p className="text-center text-xs text-gray-500 mt-4">
            Make sure the backend server is running on localhost:5000
          </p>
        </div>
      </div>
    );
  }

  // Empty State
  if (trainings.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-md">
          <div className="mb-6 text-6xl">📚</div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            No Trainings Available
          </h3>
          <p className="text-gray-600 mb-6">
            Currently, there are no trainings available. Please check back
            later!
          </p>
          <button
            onClick={fetchTrainings}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  // Trainings Grid
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Pelatihan Profesional
          </h1>
          <p className="text-lg text-gray-600">
            Tingkatkan skill Anda dengan pelatihan terbaik dari Delta Indonesia
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold">
              {trainings.length} Tersedia
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainings.map((training, index) => (
            <div
              key={training.id}
              className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
              }}
            >
              {/* Card Header with Category Badge */}
              <div className="relative h-32 bg-gradient-to-br from-blue-500 to-indigo-600 p-4 flex items-end">
                <div className="absolute top-3 right-3">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                    {training.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white line-clamp-2">
                  {training.name}
                </h3>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="space-y-4">
                  {/* Code */}
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-100 px-2 py-1 rounded">
                      Kode
                    </span>
                    <span className="text-sm font-mono text-gray-700 bg-gray-50 px-3 py-1 rounded">
                      {training.code}
                    </span>
                  </div>

                  {/* Certification */}
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-100 px-2 py-1 rounded">
                      Sertifikasi
                    </span>
                    <span className="text-sm text-gray-700 px-3 py-1 rounded bg-amber-50 text-amber-900 font-medium">
                      {training.certification}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="mt-6 pt-6 border-t border-gray-100" />

                {/* CTA Button */}
                <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl group/btn">
                  Selengkapnya
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
