"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaArrowUp } from "react-icons/fa";

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
             <div className="flex items-center gap-2 mb-4">
              <Image
                src="/images/logo.png"
                alt="Delta Indonesia Group"
                width={60}
                height={60}
                className="rounded-lg"
              />
              <span className="font-bold text-xl">DELTA INDONESIA GROUP</span>
            </div>
            <p className="text-gray-400 mb-4">
              Perusahaan Jasa Keselamatan Kesehatan Kerja (PJK3) terpercaya
              sejak 2005
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#tentang"
                  className="text-gray-400 hover:text-white transition"
                >
                  Tentang Kami
                </a>
              </li>
              <li>
                <a
                  href="#layanan"
                  className="text-gray-400 hover:text-white transition"
                >
                  Layanan
                </a>
              </li>
              <li>
                <a
                  href="#pelatihan"
                  className="text-gray-400 hover:text-white transition"
                >
                  Pelatihan
                </a>
              </li>
              <li>
                <a
                  href="#kontak"
                  className="text-gray-400 hover:text-white transition"
                >
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Layanan</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Pelatihan K3</li>
              <li>Sertifikasi K3</li>
              <li>Riksa Uji Alat</li>
              <li>Konsultan K3</li>
              <li>Audit SMK3</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Kontak & Sosial Media</h3>
            <div className="space-y-2 text-gray-400 mb-4">
              <p>📞 +62 21 8888 9999</p>
              <p>📧 info@deltaindo.co.id</p>
            </div>
            <div className="flex space-x-3">
              <a
                href="https://instagram.com/deltaindonesia"
                className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-primary transition"
              >
                IG
              </a>
              <a
                href="https://facebook.com/deltaindonesia"
                className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-primary transition"
              >
                FB
              </a>
              <a
                href="https://linkedin.com/company/deltaindonesia"
                className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-primary transition"
              >
                IN
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>© 2025 Delta Indonesia. All rights reserved.</p>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition z-50"
        aria-label="Back to top"
      >
        <FaArrowUp />
      </button>

      )}
    </footer>
  );
};

export default Footer;
