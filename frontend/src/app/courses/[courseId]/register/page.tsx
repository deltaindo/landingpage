"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { courseAPI, formTemplateAPI } from "@/lib/api";
import DynamicRegistrationForm from "@/components/DynamicRegistrationForm";

export default function CourseRegistrationPage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [template, setTemplate] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [params.courseId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch course details
      const courseResponse = await courseAPI.getById(params.courseId as string);
      setCourse(courseResponse.data);

      // Fetch form template (default or course-specific)
      const templateResponse = await formTemplateAPI.getDefault();
      setTemplate(templateResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat formulir pendaftaran...</p>
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
          <button
            onClick={() => router.push("/courses")}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition"
          >
            Kembali ke Daftar Pelatihan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header with Course Info */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-semibold inline-block mb-3">
                {course.category.toUpperCase()}
              </span>
              <h1 className="text-3xl font-bold text-dark mb-2">
                Form Pendaftaran Pelatihan
              </h1>
              <h2 className="text-2xl text-primary font-semibold mb-4">
                {course.name}
              </h2>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Biaya Pelatihan</p>
              <p className="text-3xl font-bold text-primary">
                Rp {course.price_regular?.toLocaleString("id-ID")}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <div>
              <p className="text-sm text-gray-600">Durasi</p>
              <p className="font-semibold text-dark">
                {course.duration_value} {course.duration_unit}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Sertifikasi</p>
              <p className="font-semibold text-dark">{course.certification}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Kode Pelatihan</p>
              <p className="font-semibold text-dark">{course.code}</p>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border-l-4 border-primary p-4 rounded">
            <p className="text-sm text-gray-700">
              <strong>Perhatian:</strong> Segera daftarkan diri Anda dan ikuti
              pelatihan bersama Delta Indonesia. Pastikan semua data yang Anda
              masukkan benar dan sesuai dengan dokumen resmi.
            </p>
          </div>
        </div>

        {/* Dynamic Registration Form */}
        {template && (
          <DynamicRegistrationForm
            courseId={params.courseId as string}
            template={template}
            course={course}
          />
        )}
      </div>
    </div>
  );
}
