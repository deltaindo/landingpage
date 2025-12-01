"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    published: 0,
    drafts: 0,
    totalViews: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/blogs/stats/overview");
      const data = await response.json();

      if (data.success) {
        const byStatus = data.data.byStatus.reduce((acc: any, item: any) => {
          acc[item._id] = item.count;
          return acc;
        }, {});

        setStats({
          totalPosts: (byStatus.published || 0) + (byStatus.draft || 0),
          published: byStatus.published || 0,
          drafts: byStatus.draft || 0,
          totalViews: data.data.totalViews,
        });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const statCards = [
    {
      title: "Total Posts",
      value: stats.totalPosts,
      icon: "📄",
      color: "bg-blue-500",
    },
    {
      title: "Published",
      value: stats.published,
      icon: "✅",
      color: "bg-green-500",
    },
    {
      title: "Drafts",
      value: stats.drafts,
      icon: "📝",
      color: "bg-yellow-500",
    },
    {
      title: "Total Views",
      value: stats.totalViews.toLocaleString(),
      icon: "👁️",
      color: "bg-purple-500",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                <p className="text-3xl font-bold text-gray-800">{card.value}</p>
              </div>
              <div
                className={`${card.color} w-12 h-12 rounded-full flex items-center justify-center text-2xl`}
              >
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              ➕ Create New Post
            </button>
            <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              📤 Upload Media
            </button>
            <button className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              📁 Manage Categories
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="text-sm text-gray-600">
              No recent activity to display
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
