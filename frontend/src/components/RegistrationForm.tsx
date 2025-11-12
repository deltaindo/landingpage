"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Course {
  id: string;
  name: string;
  code: string;
  category: string;
}

interface Schedule {
  id: string;
  startDate: string;
  endDate: string;
  location: string;
  type: string;
}

export default function RegistrationForm({ courseId }: { courseId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [course, setCourse] = useState<Course | null>(null);
  const [schedule, setSchedule] = useState<Schedule | null>(null);

  // Form data state
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: "",
    nik: "",
    province: "",
    city: "",
    district: "",
    village: "",
    birthplace: "",
    birthdate: "",
    bloodType: "",
    address: "",
    whatsapp: "",
    email: "",

    // Education
    educationLevel: "",
    schoolName: "",
    diplomaNumber: "",
    diplomaDate: "",

    // Company
    companyName: "",
    companySector: "",
    position: "",
    companyAddress: "",
    companyPhone: "",
    companyEmail: "",
  });

  // File uploads
  const [files, setFiles] = useState<Record<string, File | null>>({
    ktp: null,
    ijazah: null,
    pasFoto: null,
    suratKeteranganKerja: null,
    cv: null,
    suratPernyataan: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Fetch course details
    fetch(`/api/courses/${courseId}`)
      .then((res) => res.json())
      .then((data) => setCourse(data.data));
  }, [courseId]);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleFileChange = (field: string, file: File | null) => {
    if (file) {
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setErrors({ ...errors, [field]: "Ukuran file maksimal 2MB" });
        return;
      }
      // Validate file type
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (!allowedTypes.includes(file.type)) {
        setErrors({
          ...errors,
          [field]: "Format file harus JPG, PNG, atau PDF",
        });
        return;
      }
    }
    setFiles({ ...files, [field]: file });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      // Validate personal info
      if (!formData.fullName) newErrors.fullName = "Nama wajib diisi";
      if (!formData.nik || formData.nik.length !== 16)
        newErrors.nik = "NIK harus 16 digit";
      if (!formData.birthplace)
        newErrors.birthplace = "Tempat lahir wajib diisi";
      if (!formData.birthdate)
        newErrors.birthdate = "Tanggal lahir wajib diisi";
      if (!formData.bloodType)
        newErrors.bloodType = "Golongan darah wajib diisi";
      if (!formData.province) newErrors.province = "Provinsi wajib diisi";
      if (!formData.city) newErrors.city = "Kota wajib diisi";
      if (!formData.district) newErrors.district = "Kecamatan wajib diisi";
      if (!formData.village) newErrors.village = "Kelurahan wajib diisi";
      if (!formData.address) newErrors.address = "Alamat wajib diisi";
      if (!formData.whatsapp) newErrors.whatsapp = "No WhatsApp wajib diisi";
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email tidak valid";
      }
    } else if (currentStep === 2) {
      // Validate education
      if (!formData.educationLevel)
        newErrors.educationLevel = "Pendidikan wajib diisi";
      if (!formData.schoolName)
        newErrors.schoolName = "Nama sekolah wajib diisi";
      if (!formData.diplomaNumber)
        newErrors.diplomaNumber = "No ijazah wajib diisi";
      if (!formData.diplomaDate)
        newErrors.diplomaDate = "Tanggal ijazah wajib diisi";
    } else if (currentStep === 3) {
      // Validate company
      if (!formData.companyName)
        newErrors.companyName = "Nama perusahaan wajib diisi";
      if (!formData.companySector)
        newErrors.companySector = "Bidang usaha wajib diisi";
      if (!formData.position) newErrors.position = "Jabatan wajib diisi";
      if (!formData.companyAddress)
        newErrors.companyAddress = "Alamat perusahaan wajib diisi";
    } else if (currentStep === 4) {
      // Validate documents
      if (!files.ktp) newErrors.ktp = "KTP wajib diupload";
      if (!files.ijazah) newErrors.ijazah = "Ijazah wajib diupload";
      if (!files.pasFoto) newErrors.pasFoto = "Pas foto wajib diupload";
      if (!files.suratKeteranganKerja)
        newErrors.suratKeteranganKerja =
          "Surat keterangan bekerja wajib diupload";
      if (!files.suratPernyataan)
        newErrors.suratPernyataan = "Surat pernyataan wajib diupload";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setLoading(true);
    try {
      const formDataToSend = new FormData();

      // Append form data
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      formDataToSend.append("courseId", courseId);

      // Append files
      Object.entries(files).forEach(([key, file]) => {
        if (file) formDataToSend.append(key, file);
      });

      const response = await fetch("/api/registrations", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (result.success) {
        alert(
          `Pendaftaran berhasil! Nomor registrasi: ${result.data.registrationNumber}`
        );
        router.push("/");
      } else {
        throw new Error(result.error || "Pendaftaran gagal");
      }
    } catch (error: any) {
      alert(error.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-center mb-6">
            <Image
              src="/logo.png"
              alt="Delta Indonesia"
              width={150}
              height={50}
            />
          </div>
          <h1 className="text-3xl font-bold text-center text-primary mb-2">
            FORM BIODATA PESERTA PELATIHAN
          </h1>
          <p className="text-center text-gray-600">
            {course?.name || "Loading..."}
          </p>
          <p className="text-center text-sm text-gray-500 mt-4">
            Segera daftarkan diri Anda dan ikuti pelatihan bersama Delta
            Indonesia
          </p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    s <= step
                      ? "bg-primary text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {s}
                </div>
                {s < 4 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      s < step ? "bg-primary" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-sm">
            <span
              className={
                step >= 1 ? "text-primary font-semibold" : "text-gray-500"
              }
            >
              Data Pribadi
            </span>
            <span
              className={
                step >= 2 ? "text-primary font-semibold" : "text-gray-500"
              }
            >
              Pendidikan
            </span>
            <span
              className={
                step >= 3 ? "text-primary font-semibold" : "text-gray-500"
              }
            >
              Perusahaan
            </span>
            <span
              className={
                step >= 4 ? "text-primary font-semibold" : "text-gray-500"
              }
            >
              Dokumen
            </span>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-dark mb-6">
                Informasi Pribadi
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nama Peserta <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    placeholder="Nama sesuai KTP"
                    className={`w-full px-4 py-3 border rounded-lg ${
                      errors.fullName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nomor KTP <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    maxLength={16}
                    value={formData.nik}
                    onChange={(e) =>
                      handleChange("nik", e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="Masukkan NIK 16 Digit"
                    className={`w-full px-4 py-3 border rounded-lg ${
                      errors.nik ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.nik && (
                    <p className="text-red-500 text-sm mt-1">{errors.nik}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tempat Lahir <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.birthplace}
                    onChange={(e) => handleChange("birthplace", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg ${
                      errors.birthplace ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.birthplace && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.birthplace}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tanggal Lahir <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.birthdate}
                    onChange={(e) => handleChange("birthdate", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg ${
                      errors.birthdate ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.birthdate && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.birthdate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Golongan Darah <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.bloodType}
                    onChange={(e) => handleChange("bloodType", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg ${
                      errors.bloodType ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Pilih Golongan Darah</option>
                    {[
                      "A",
                      "B",
                      "AB",
                      "O",
                      "A+",
                      "A-",
                      "B+",
                      "B-",
                      "AB+",
                      "AB-",
                      "O+",
                      "O-",
                    ].map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.bloodType && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.bloodType}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Provinsi <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.province}
                    onChange={(e) => handleChange("province", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg ${
                      errors.province ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Pilih Provinsi</option>
                    <option value="DKI JAKARTA">DKI JAKARTA</option>
                    <option value="JAWA BARAT">JAWA BARAT</option>
                    <option value="JAWA TENGAH">JAWA TENGAH</option>
                    <option value="JAWA TIMUR">JAWA TIMUR</option>
                    <option value="BANTEN">BANTEN</option>
                  </select>
                  {errors.province && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.province}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Kabupaten/Kota <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg ${
                      errors.city ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Kecamatan <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => handleChange("district", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg ${
                      errors.district ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.district && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.district}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Kelurahan <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.village}
                    onChange={(e) => handleChange("village", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg ${
                      errors.village ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.village && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.village}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Alamat Rumah <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    rows={3}
                    className={`w-full px-4 py-3 border rounded-lg resize-none ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    No WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => handleChange("whatsapp", e.target.value)}
                    placeholder="08123456789"
                    className={`w-full px-4 py-3 border rounded-lg ${
                      errors.whatsapp ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.whatsapp && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.whatsapp}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="email@example.com"
                    className={`w-full px-4 py-3 border rounded-lg ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Education - Similar pattern */}
          {/* Step 3: Company - Similar pattern */}
          {/* Step 4: Documents - Similar pattern with file inputs */}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                Back
              </button>
            )}
            {step < 4 ? (
              <button
                onClick={nextStep}
                className="ml-auto px-8 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition"
              >
                Next Step
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="ml-auto px-8 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Delta Indonesia. All rights reserved.
          </p>
          <p className="mt-2">
            <a
              href="https://deltaindo.co.id"
              className="text-primary hover:underline"
            >
              deltaindo.co.id
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
