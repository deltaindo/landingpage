"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: "📊" },
    { name: "Blog Posts", href: "/admin/blogs", icon: "📝" },
    { name: "Media Library", href: "/admin/media", icon: "🖼️" },
    { name: "Categories", href: "/admin/categories", icon: "📁" },
    { name: "Tags", href: "/admin/tags", icon: "🏷️" },
    { name: "Settings", href: "/admin/settings", icon: "⚙️" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white shadow-lg transition-all duration-300`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className={`font-bold text-xl ${!sidebarOpen && "hidden"}`}>
            Delta CMS
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded hover:bg-gray-100"
          >
            {sidebarOpen ? "←" : "→"}
          </button>
        </div>

        <nav className="mt-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
                pathname === item.href
                  ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                  : ""
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              {sidebarOpen && (
                <span className="ml-3 font-medium">{item.name}</span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">
              Content Management
            </h2>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                Preview Site
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  A
                </div>
                <span className="text-sm font-medium">Admin</span>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
