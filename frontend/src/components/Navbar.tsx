"use client";

import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <span
              className={`font-bold text-xl ${
                isScrolled ? "text-dark" : "text-blue"
              }`}
            >
              DELTA INDONESIA
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("beranda")}
              className={`${
                isScrolled ? "text-dark" : "text-blue"
              } hover:text-primary transition`}
            >
              Tentang Kami
            </button>
            <button
              onClick={() => scrollToSection("layanan")}
              className={`${
                isScrolled ? "text-dark" : "text-blue"
              } hover:text-primary transition`}
            >
              Layanan
            </button>
            <button
              onClick={() => scrollToSection("pelatihan")}
              className={`${
                isScrolled ? "text-dark" : "text-blue"
              } hover:text-primary transition`}
            >
              Pelatihan K3
            </button>
            <button
              onClick={() => scrollToSection("kontak")}
              className={`${
                isScrolled ? "text-dark" : "text-blue"
              } hover:text-primary transition`}
            >
              Kontak
            </button>
            <button
              onClick={() => scrollToSection("kontak")}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Daftar Sekarang
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden ${isScrolled ? "text-dark" : "text-white"}`}
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col space-y-4 p-4">
              <button
                onClick={() => scrollToSection("beranda")}
                className="text-dark hover:text-primary transition text-left"
              >
                Tentang Kami
              </button>
              <button
                onClick={() => scrollToSection("layanan")}
                className="text-dark hover:text-primary transition text-left"
              >
                Layanan
              </button>
              <button
                onClick={() => scrollToSection("pelatihan")}
                className="text-dark hover:text-primary transition text-left"
              >
                Pelatihan K3
              </button>
              <button
                onClick={() => scrollToSection("kontak")}
                className="text-dark hover:text-primary transition text-left"
              >
                Kontak
              </button>
              <button
                onClick={() => scrollToSection("kontak")}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Daftar Sekarang
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
