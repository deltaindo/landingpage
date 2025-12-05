"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface TeamMember {
  name: string;
  title: string;
  phone: string;
  avatar: string;
}

export default function FloatingWhatsApp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const teamMembers: TeamMember[] = [
    {
      name: "Atika",
      title: "Head Office",
      phone: "6281234567890", // Replace with actual number
      avatar: "https://ui-avatars.com/api/?name=Atika&background=25D366&color=fff&size=128",
    },
    {
      name: "Anik",
      title: "Head Office",
      phone: "6281234567891",
      avatar: "https://ui-avatars.com/api/?name=Anik&background=25D366&color=fff&size=128",
    },
    {
      name: "Yopi",
      title: "Head Office",
      phone: "6281234567892",
      avatar: "https://ui-avatars.com/api/?name=Yopi&background=25D366&color=fff&size=128",
    },
    {
      name: "Intang",
      title: "Head Office",
      phone: "6281234567893",
      avatar: "https://ui-avatars.com/api/?name=Intang&background=25D366&color=fff&size=128",
    },
    {
      name: "Erwin",
      title: "Karawang Office",
      phone: "6281234567894",
      avatar: "https://ui-avatars.com/api/?name=Erwin&background=25D366&color=fff&size=128",
    },
    {
      name: "Ali M",
      title: "Gresik Office",
      phone: "6281234567895",
      avatar: "https://ui-avatars.com/api/?name=Ali+M&background=25D366&color=fff&size=128",
    },
    {
      name: "Erje",
      title: "Surabaya Office",
      phone: "6281234567896",
      avatar: "https://ui-avatars.com/api/?name=Erje&background=25D366&color=fff&size=128",
    },
    {
      name: "Indri",
      title: "Head Office",
      phone: "6281234567897",
      avatar: "https://ui-avatars.com/api/?name=Indri&background=25D366&color=fff&size=128",
    },
    {
      name: "Bayu",
      title: "Head Office",
      phone: "6281234567898",
      avatar: "https://ui-avatars.com/api/?name=Bayu&background=25D366&color=fff&size=128",
    },
    {
      name: "Tya",
      title: "Head Office",
      phone: "6281234567899",
      avatar: "https://ui-avatars.com/api/?name=Tya&background=25D366&color=fff&size=128",
    },
    {
      name: "Yunny",
      title: "Central Java Office",
      phone: "6281234567900",
      avatar: "https://ui-avatars.com/api/?name=Yunny&background=25D366&color=fff&size=128",
    },
    {
      name: "Eko",
      title: "Medan Office",
      phone: "6281234567901",
      avatar: "https://ui-avatars.com/api/?name=Eko&background=25D366&color=fff&size=128",
    },
  ];

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-[1000]">
      {/* Team Menu */}
      <div
        className={`absolute bottom-[70px] right-0 bg-white rounded-2xl shadow-2xl w-[340px] transition-all duration-300 ${
          isMenuOpen
            ? "max-h-[600px] opacity-100 translate-y-0 pointer-events-auto"
            : "max-h-0 opacity-0 translate-y-5 pointer-events-none overflow-hidden"
        }`}
      >
        {/* Menu Header */}
        <div className="p-4 border-b border-gray-200 bg-gradient-to-br from-[#25D366] to-[#20BD5A] rounded-t-2xl">
          <h3 className="text-white text-base font-semibold mb-1">
            Butuh Bantuan? Silahkan Chat dengan salah satu marketing kami
          </h3>
          <p className="text-white/90 text-xs">Pilih kontak di bawah ini</p>
        </div>

        {/* Menu Body */}
        <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {teamMembers.map((member, index) => (
            <a
              key={index}
              href={`https://wa.me/${member.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 last:border-b-0"
            >
              <div className="relative w-12 h-12 rounded-full border-2 border-[#25D366] mr-3 flex-shrink-0 overflow-hidden">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-900">{member.name}</div>
                <div className="text-xs text-gray-600 mb-0.5">{member.title}</div>
                <div className="flex items-center text-xs text-[#25D366]">
                  <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full mr-1 animate-pulse"></span>
                  <span>Online</span>
                </div>
              </div>
              <svg
                className="w-6 h-6 flex-shrink-0 fill-[#25D366]"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* Main WhatsApp Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`w-[60px] h-[60px] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${
          isMenuOpen
            ? "bg-red-600 hover:bg-red-700"
            : "bg-[#25D366] hover:bg-[#20BD5A] hover:shadow-[0_6px_20px_rgba(37,211,102,0.4)]"
        }`}
        aria-label="WhatsApp Contact"
      >
        <svg
          className={`w-8 h-8 fill-white transition-transform duration-300 ${
            isMenuOpen ? "rotate-45" : ""
          }`}
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </button>
    </div>
  );
}
