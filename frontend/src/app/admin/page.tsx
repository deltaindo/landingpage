"use client";

import { useState, useEffect } from "react";
import { FiFileText, FiBook, FiUsers, FiImage } from "react-icons/fi";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    blogs: 0,
    courses: 0,
    registrations: 0,
    media: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [blogs, courses, registrations, media] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`).then((r) =>
          r.json()
        ),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/courses`).then((r) =>
          r.json()
        ),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/registrations`).then(
          (r) => r.json()
        ),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/media`).then((r) =>
          r.json()
        ),
      ]);

      setStats({
        blogs: blogs.data?.length || 0,
        courses: courses.data?.length || 0,
        registrations: registrations.data?.length || 0,
        media: media.data?.length || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const cards = [
    {
      title: "Total Blogs",
      value: stats.blogs,
      icon: FiFileText,
      color: "bg-blue-500",
      href: "/admin/blogs",
    },
    {
      title: "Total Courses",
      value: stats.courses,
      icon: FiBook,
      color: "bg-green-500",
      href: "/admin/courses",
    },
    {
      title: "Registrations",
      value: stats.registrations,
      icon: FiUsers,
      color: "bg-yellow-500",
      href: "/admin/registrations",
    },
    {
      title: "Media Files",
      value: stats.media,
      icon: FiImage,
      color: "bg-purple-500",
      href: "/admin/media",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to your CMS</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <a
            key={card.title}
            href={card.href}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{card.title}</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {card.value}
                </p>
              </div>
              <div className={`${card.color} p-3 rounded-lg text-white`}>
                <card.icon size={24} />
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <p className="text-gray-600 text-sm">Activity feed coming soon...</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <a
              href="/admin/blogs/new"
              className="block px-4 py-2 text-blue-600 hover:bg-blue-50 rounded"
            >
              + New Blog Post
            </a>
            <a
              href="/admin/courses/new"
              className="block px-4 py-2 text-green-600 hover:bg-green-50 rounded"
            >
              + New Course
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
