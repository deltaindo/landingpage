"use client";

import { useState, useEffect, useRef } from "react";
import { FaWhatsapp, FaTimes } from "react-icons/fa";
import Image from "next/image";

interface TeamMember {
  name: string;
  title: string;
  phone: string;
  avatar: string;
}

const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Team member data with custom images
  const teamMembers: TeamMember[] = [
    {
      name: "Atika",
      title: "Head Office",
      phone: "6281234567890",
      avatar: "/images/wa/atika-300x300",
    },
    {
      name: "Anik",
      title: "Head Office",
      phone: "6281234567891",
      avatar: "/images/wa/Anik-300x300",
    },
    {
      name: "Yoppi",
      title: "Head Office",
      phone: "6281234567892",
      avatar: "/images/wa/Yopi-300x300",
    },
    {
      name: "Intang",
      title: "Head Office",
      phone: "6281234567893",
      avatar: "/images/wa/Intang-300x300",
    },
    {
      name: "Erwin",
      title: "Karawang Office",
      phone: "6281234567894",
      avatar: "/images/wa/Yuyun-300x300",
    },
    {
      name: "Ali M",
      title: "Gresik Office",
      phone: "6281234567895",
      avatar: "/images/wa/Ali-300x300",
    },
    {
      name: "Erje",
      title: "Surabaya Office",
      phone: "6281234567896",
      avatar: "/images/wa/Erje-300x300.jpg",
    },
    {
      name: "Indri",
      title: "Head Office",
      phone: "6281234567897",
      avatar: "/images/wa/Indri-300x300",
    },
    {
      name: "Bayu",
      title: "Head Office",
      phone: "6281234567898",
      avatar: "/images/wa/Bayu-300x300",
    },
    {
      name: "Tya",
      title: "Head Office",
      phone: "6281234567899",
      avatar: "/images/wa/Tya-300x300",
    },
    {
      name: "Yunny",
      title: "Central Java Office",
      phone: "6281234567900",
      avatar: "/images/wa/Yuyun-300x300",
    },
    {
      name: "Eko",
      title: "Medan Office",
      phone: "6281234567901",
      avatar: "/images/wa/Eko-300x300",
    },
  ];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-50">
      {/* Team Menu */}
      <div
        className={`absolute bottom-20 right-0 bg-white rounded-2xl shadow-2xl w-[340px] transition-all duration-300 overflow-hidden ${
          isOpen
            ? "opacity-100 translate-y-0 max-h-[600px]"
            : "opacity-0 translate-y-5 max-h-0 pointer-events-none"
        }`}
      >
        {/* Menu Header - Blue Gradient */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-t-2xl">
          <h3 className="text-white font-semibold text-base mb-1">
            Butuh Bantuan? Silahkan Chat dengan salah satu marketing kami
          </h3>
          <p className="text-white/90 text-sm">Pilih kontak di bawah ini</p>
        </div>

        {/* Menu Body */}
        <div className="max-h-[400px] overflow-y-auto">
          {teamMembers.map((member, index) => (
            <a
              key={index}
              href={`https://wa.me/${member.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-3 border-b border-gray-100 hover:bg-blue-50 transition-colors duration-200"
            >
              {/* Avatar with Next.js Image - Optimized */}
              <div className="relative w-12 h-12 rounded-full border-2 border-blue-500 mr-3 flex-shrink-0 overflow-hidden">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>

              {/* Member Info */}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-gray-800 mb-0.5">
                  {member.name}
                </div>
                <div className="text-xs text-gray-500 mb-0.5">{member.title}</div>
                <div className="flex items-center text-xs text-blue-500">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1 animate-pulse"></span>
                  <span>Online</span>
                </div>
              </div>

              {/* WhatsApp Icon - Blue */}
              <FaWhatsapp className="text-blue-500 text-2xl flex-shrink-0" />
            </a>
          ))}
        </div>
      </div>

      {/* Main WhatsApp Button - Blue */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isOpen
            ? "bg-red-600 hover:bg-red-700"
            : "bg-blue-500 hover:bg-blue-600 hover:scale-110 hover:shadow-blue-500/40"
        }`}
        aria-label="WhatsApp Contact"
      >
        {isOpen ? (
          <FaTimes className="text-white text-3xl" />
        ) : (
          <FaWhatsapp className="text-white text-4xl" />
        )}
      </button>
    </div>
  );
};

export default FloatingWhatsApp;
