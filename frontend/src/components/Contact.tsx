"use client";

import { useState } from "react";
import { contactAPI } from "@/lib/api";
import type { ContactFormData } from "@/types";

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      await contactAPI.sendMessage(formData);
      setSubmitStatus({
        type: "success",
        message: "Pesan berhasil dikirim! Kami akan segera menghubungi Anda.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error: any) {
      setSubmitStatus({
        type: "error",
        message: error.message || "Gagal mengirim pesan. Silakan coba lagi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="kontak" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark mb-4">Hubungi Kami</h2>
          <p className="text-lg text-gray-600">
            Ada pertanyaan? Kami siap membantu Anda
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-dark mb-6">Kirim Pesan</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="nama@email.com"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Nomor Telepon *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="08xxxxxxxxxx"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Pesan *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="Tulis pesan Anda..."
                />
              </div>

              {submitStatus.type && (
                <div
                  className={`p-4 rounded-lg ${
                    submitStatus.type === "success"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-dark mb-6">
                Informasi Kontak
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">📍</div>
                  <div>
                    <h4 className="font-bold text-dark mb-1">Alamat</h4>
                    <p className="text-gray-600">
                      Jl. M Hasibuan, Komplek Ruko Suncity Square
                      <br />
                      Bekasi, Jawa Barat
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">📞</div>
                  <div>
                    <h4 className="font-bold text-dark mb-1">Telepon</h4>
                    <p className="text-gray-600">+62 21 8888 9999</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">📱</div>
                  <div>
                    <h4 className="font-bold text-dark mb-1">WhatsApp</h4>
                    <p className="text-gray-600">+62 812 3456 7890</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">📧</div>
                  <div>
                    <h4 className="font-bold text-dark mb-1">Email</h4>
                    <p className="text-gray-600">info@deltaindo.co.id</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-dark mb-6">
                Media Sosial
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com/deltaindonesia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white hover:scale-110 transition"
                >
                  IG
                </a>
                <a
                  href="https://facebook.com/deltaindonesia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:scale-110 transition"
                >
                  FB
                </a>
                <a
                  href="https://linkedin.com/company/deltaindonesia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center text-white hover:scale-110 transition"
                >
                  IN
                </a>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center text-gray-500">
              🗺️ Map Placeholder
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
