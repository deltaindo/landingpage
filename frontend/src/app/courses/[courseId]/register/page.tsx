"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

interface FormData {
  // Personal Info
  full_name: string;
  nik: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  golongan_darah: string;

  // Address
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  kelurahan: string;
  alamat: string;

  // Contact
  email: string;
  no_whatsapp: string;

  // Education
  pendidikan_terakhir: string;
  nama_sekolah: string;
  no_ijazah: string;
  tanggal_ijazah: string;

  // Company
  instansi: string;
  bidang_usaha: string;
  jabatan: string;
  alamat_perusahaan: string;
  tlp_kantor: string;
  email_perusahaan: string;

  // Documents
  doc_ktp?: File;
  doc_ijazah?: File;
  doc_surat_pernyataan?: File;
  doc_surat_bekerja?: File;
  doc_cv?: File;
  doc_pas_foto?: File;
  doc_skp?: File;
  doc_lisensi?: File;
  doc_sertifikat?: File;
  doc_surat_sehat?: File;
}

export default function MultiStepRegistrationPage() {
  const params = useParams();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    nik: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    golongan_darah: "",
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    kelurahan: "",
    alamat: "",
    email: "",
    no_whatsapp: "",
    pendidikan_terakhir: "",
    nama_sekolah: "",
    no_ijazah: "",
    tanggal_ijazah: "",
    instansi: "",
    bidang_usaha: "",
    jabatan: "",
    alamat_perusahaan: "",
    tlp_kantor: "",
    email_perusahaan: "",
  });

  useEffect(() => {
    fetchCourse();
  }, [params.courseId]);

  const fetchCourse = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/courses/${params.courseId}`
      );
      const data = await response.json();
      if (data.success) {
        setCourse(data.data);
      }
    } catch (error) {
      console.error("Error fetching course:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files) {
      setFormData((prev) => ({ ...prev, [name]: files }));
    }
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          formData.full_name &&
          formData.nik &&
          formData.tempat_lahir &&
          formData.tanggal_lahir &&
          formData.golongan_darah &&
          formData.provinsi &&
          formData.kabupaten &&
          formData.alamat &&
          formData.email &&
          formData.no_whatsapp
        );
      case 2:
        return !!(
          formData.pendidikan_terakhir &&
          formData.nama_sekolah &&
          formData.no_ijazah &&
          formData.tanggal_ijazah
        );
      case 3:
        return !!(
          formData.instansi &&
          formData.bidang_usaha &&
          formData.jabatan &&
          formData.alamat_perusahaan
        );
      case 4:
        return !!(
          formData.doc_ktp &&
          formData.doc_ijazah &&
          formData.doc_surat_pernyataan &&
          formData.doc_surat_bekerja &&
          formData.doc_pas_foto
        );
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    } else {
      alert("Mohon lengkapi semua field yang wajib diisi");
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) {
      alert("Mohon lengkapi semua dokumen yang wajib");
      return;
    }

    setSubmitting(true);

    const formDataToSend = new FormData();

    // Add all text fields (exclude File objects)
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof FormData];
      if (value && !(value instanceof File)) {
        formDataToSend.append(key, value as string);
      }
    });

    // Add course ID
    formDataToSend.append("courseId", params.courseId as string);

    // ✅ CORRECT - Check instanceof File and append individually
    if (formData.doc_ktp instanceof File) {
      formDataToSend.append("doc_ktp", formData.doc_ktp, formData.doc_ktp.name);
    }
    if (formData.doc_ijazah instanceof File) {
      formDataToSend.append(
        "doc_ijazah",
        formData.doc_ijazah,
        formData.doc_ijazah.name
      );
    }
    if (formData.doc_surat_pernyataan instanceof File) {
      formDataToSend.append(
        "doc_surat_pernyataan",
        formData.doc_surat_pernyataan,
        formData.doc_surat_pernyataan.name
      );
    }
    if (formData.doc_surat_bekerja instanceof File) {
      formDataToSend.append(
        "doc_surat_bekerja",
        formData.doc_surat_bekerja,
        formData.doc_surat_bekerja.name
      );
    }
    if (formData.doc_cv instanceof File) {
      formDataToSend.append("doc_cv", formData.doc_cv, formData.doc_cv.name);
    }
    if (formData.doc_pas_foto instanceof File) {
      formDataToSend.append(
        "doc_pas_foto",
        formData.doc_pas_foto,
        formData.doc_pas_foto.name
      );
    }
    if (formData.doc_skp instanceof File) {
      formDataToSend.append("doc_skp", formData.doc_skp, formData.doc_skp.name);
    }
    if (formData.doc_lisensi instanceof File) {
      formDataToSend.append(
        "doc_lisensi",
        formData.doc_lisensi,
        formData.doc_lisensi.name
      );
    }
    if (formData.doc_sertifikat instanceof File) {
      formDataToSend.append(
        "doc_sertifikat",
        formData.doc_sertifikat,
        formData.doc_sertifikat.name
      );
    }
    if (formData.doc_surat_sehat instanceof File) {
      formDataToSend.append(
        "doc_surat_sehat",
        formData.doc_surat_sehat,
        formData.doc_surat_sehat.name
      );
    }

    // Debug log
    console.log("📤 Sending files:");
    for (let [key, value] of formDataToSend.entries()) {
      if (value instanceof File) {
        console.log(`  ${key}: ${value.name} (${value.size} bytes)`);
      }
    }

    try {
      const response = await fetch("http://localhost:5000/api/registrations", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        alert(
          `✅ Pendaftaran berhasil!\n\nNomor Registrasi: ${data.data.registration_number}\n\nDokumen terupload: ${data.data.documents_count}\n\nTim kami akan menghubungi Anda segera.`
        );
        router.push("/courses");
      } else {
        alert("❌ Pendaftaran gagal: " + (data.error || "Unknown error"));
      }
    } catch (error: any) {
      console.error("❌ Error:", error);
      alert(`Terjadi kesalahan: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat formulir...</p>
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
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700"
          >
            Kembali ke Daftar Pelatihan
          </button>
        </div>
      </div>
    );
  }

  const steps = [
    { num: 1, title: "Informasi Pribadi" },
    { num: 2, title: "Pendidikan" },
    { num: 3, title: "Perusahaan" },
    { num: 4, title: "Dokumen" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-semibold">
                {course.category.toUpperCase()}
              </span>
              <h1 className="text-3xl font-bold text-dark mt-3">
                Form Pendaftaran Training
              </h1>
              <h2 className="text-2xl text-primary font-semibold mt-2">
                {course.name}
              </h2>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Biaya Pelatihan</p>
              <p className="text-3xl font-bold text-primary">
                Rp {course.price_regular?.toLocaleString("id-ID")}
              </p>
            </div>
          </div>

          <p className="text-gray-600 mt-4">
            Masukan Informasi Anda ke Dalam Form di Bawah ini.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition ${
                      currentStep >= step.num
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {currentStep > step.num ? (
                      <CheckCircle size={24} />
                    ) : (
                      step.num
                    )}
                  </div>
                  <p
                    className={`mt-2 text-sm font-medium ${
                      currentStep >= step.num ? "text-primary" : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-4 ${
                      currentStep > step.num ? "bg-primary" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Steps */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-dark mb-6">
                Informasi Pribadi
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Peserta <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  placeholder="Nama Sesuai KTP"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nomor KTP <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nik"
                    value={formData.nik}
                    onChange={handleInputChange}
                    placeholder="Masukkan NIK 16 Digit"
                    maxLength={16}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Golongan Darah <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="golongan_darah"
                    value={formData.golongan_darah}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Pilih Golongan Darah</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="AB">AB</option>
                    <option value="O">O</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tempat Lahir <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="tempat_lahir"
                    value={formData.tempat_lahir}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tanggal Lahir <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="tanggal_lahir"
                    value={formData.tanggal_lahir}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Provinsi <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="provinsi"
                    value={formData.provinsi}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Pilih Provinsi</option>
                    <option value="DKI Jakarta">DKI Jakarta</option>
                    <option value="Jawa Barat">Jawa Barat</option>
                    <option value="Jawa Tengah">Jawa Tengah</option>
                    <option value="Jawa Timur">Jawa Timur</option>
                    <option value="Banten">Banten</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kabupaten/Kota <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="kabupaten"
                    value={formData.kabupaten}
                    onChange={handleInputChange}
                    placeholder="Pilih Kabupaten"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kecamatan
                  </label>
                  <input
                    type="text"
                    name="kecamatan"
                    value={formData.kecamatan}
                    onChange={handleInputChange}
                    placeholder="Pilih Kecamatan"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kelurahan/Desa
                  </label>
                  <input
                    type="text"
                    name="kelurahan"
                    value={formData.kelurahan}
                    onChange={handleInputChange}
                    placeholder="Pilih Kelurahan"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alamat Rumah <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    No WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="no_whatsapp"
                    value={formData.no_whatsapp}
                    onChange={handleInputChange}
                    placeholder="08xxxxxxxxxx"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="contoh@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Education */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-dark mb-6">Pendidikan</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pendidikan Terakhir <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="pendidikan_terakhir"
                    value={formData.pendidikan_terakhir}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Pilih Pendidikan</option>
                    <option value="SD">SD</option>
                    <option value="SMP">SMP</option>
                    <option value="SMA/SMK">SMA/SMK</option>
                    <option value="D3">D3</option>
                    <option value="S1">S1</option>
                    <option value="S2">S2</option>
                    <option value="S3">S3</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Sekolah <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nama_sekolah"
                    value={formData.nama_sekolah}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    No Ijazah <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="no_ijazah"
                    value={formData.no_ijazah}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tanggal Ijazah <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="tanggal_ijazah"
                    value={formData.tanggal_ijazah}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Company */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-dark mb-6">Perusahaan</h3>
              <p className="text-gray-600 mb-6">Informasi Perusahaan Anda.</p>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instansi/Perusahaan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="instansi"
                  value={formData.instansi}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bidang Usaha Perusahaan{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="bidang_usaha"
                    value={formData.bidang_usaha}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jabatan <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="jabatan"
                    value={formData.jabatan}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alamat Perusahaan <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="alamat_perusahaan"
                  value={formData.alamat_perusahaan}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  No Tlp/Fax/ Email Perusahaan
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    name="tlp_kantor"
                    value={formData.tlp_kantor}
                    onChange={handleInputChange}
                    placeholder="No. Telepon/Fax"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="email"
                    name="email_perusahaan"
                    value={formData.email_perusahaan}
                    onChange={handleInputChange}
                    placeholder="Email Perusahaan"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Documents */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-dark mb-6">Dokumen</h3>
              <p className="text-sm text-gray-600 mb-6">
                Format Dokumen yg di upload: JPG | PNG | PDF (Maksimum 2 Mb)
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    KTP <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    name="doc_ktp"
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ijazah Terakhir <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    name="doc_ijazah"
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Surat Pernyataan Peserta{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    name="doc_surat_pernyataan"
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    required
                  />
                  <a href="#" className="text-xs text-primary hover:underline">
                    Contoh Format Surat Pernyataan
                  </a>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Surat Keterangan Bekerja dari Perusahaan{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    name="doc_surat_bekerja"
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Curriculum Vitae (Optional)
                  </label>
                  <input
                    type="file"
                    name="doc_cv"
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pas Foto Berwarna <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    name="doc_pas_foto"
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                {/* Conditional Documents for REFRESH */}
                {course.name.includes("REFRESH") && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SKP (Khusus REFRESH AK3U)
                      </label>
                      <input
                        type="file"
                        name="doc_skp"
                        onChange={handleFileChange}
                        accept=".jpg,.jpeg,.png,.pdf"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Lisensi (Khusus REFRESH AK3U)
                      </label>
                      <input
                        type="file"
                        name="doc_lisensi"
                        onChange={handleFileChange}
                        accept=".jpg,.jpeg,.png,.pdf"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sertifikat AK3U (Khusus REFRESH AK3U)
                      </label>
                      <input
                        type="file"
                        name="doc_sertifikat"
                        onChange={handleFileChange}
                        accept=".jpg,.jpeg,.png,.pdf"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </>
                )}

                {/* Conditional Document for Ahli */}
                {(course.name.includes("Ahli") ||
                  course.name.includes("Lingkungan Kerja")) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Surat Keterangan Sehat (Khusus Kelas Ahli)
                    </label>
                    <input
                      type="file"
                      name="doc_surat_sehat"
                      onChange={handleFileChange}
                      accept=".jpg,.jpeg,.png,.pdf"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
                currentStep === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <ArrowLeft size={20} />
              Back
            </button>

            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Next Step
                <ArrowRight size={20} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className={`px-8 py-3 rounded-lg font-semibold transition ${
                  submitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
              >
                {submitting ? "Mengirim..." : "Submit"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
