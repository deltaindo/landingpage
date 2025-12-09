"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to section when clicking menu
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const bgColor = isScrolled ? "bg-white shadow-md" : "bg-transparent";
  const textColor = isScrolled ? "text-gray-900" : "text-white";

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${bgColor} py-4`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* LOGO SECTION - Using logo.jpg image */}
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Delta Indonesia Group"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className={`font-bold text-lg ${textColor}`}>
              DELTA INDONESIA
            </span>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("beranda")}
              className={`${textColor} hover:text-blue-600 transition`}
            >
              Tentang Kami
            </button>
            <button
              onClick={() => scrollToSection("layanan")}
              className={`${textColor} hover:text-blue-600 transition`}
            >
              Layanan
            </button>
            <button
              onClick={() => scrollToSection("pelatihan")}
              className={`${textColor} hover:text-blue-600 transition`}
            >
              Pelatihan K3
            </button>
            <button
              onClick={() => scrollToSection("kontak")}
              className={`${textColor} hover:text-blue-600 transition`}
            >
              Kontak
            </button>
            <button
              onClick={() => scrollToSection("kontak")}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Daftar Sekarang
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden ${textColor}`}
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* MOBILE MENU - Shows when hamburger clicked */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4">
            <button
              onClick={() => scrollToSection("beranda")}
              className="block w-full text-left py-2 text-gray-900 hover:text-blue-600"
            >
              Tentang Kami
            </button>
            <button
              onClick={() => scrollToSection("layanan")}
              className="block w-full text-left py-2 text-gray-900 hover:text-blue-600"
            >
              Layanan
            </button>
            <button
              onClick={() => scrollToSection("pelatihan")}
              className="block w-full text-left py-2 text-gray-900 hover:text-blue-600"
            >
              Pelatihan K3
            </button>
            <button
              onClick={() => scrollToSection("kontak")}
              className="block w-full text-left py-2 text-gray-900 hover:text-blue-600"
            >
              Kontak
            </button>
            <button
              onClick={() => scrollToSection("kontak")}
              className="block w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Daftar Sekarang
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
