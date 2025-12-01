"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

interface DashboardStats {
  counts: {
    blogs?: number;
    courses?: number;
    schedules?: number;
    registrations?: number;
    users?: number;
    documents?: number;
    formTemplates?: number;
    pendingRegistrations?: number;
    total?: number;
    published?: number;
    draft?: number;
  };
  recent?: {
    blogs?: any[];
    registrations?: any[];
  };
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, [user]);

  const fetchDashboardStats = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Determine API endpoint based on user role
      let endpoint = "/api/cms/admin/stats";
      if (user.role === "editor") {
        endpoint = "/api/cms/editor/stats";
      } else if (user.role === "pic") {
        endpoint = "/api/cms/pic/stats";
      }

      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  const isAdmin = user?.role === "admin" || user?.role === "superadmin";
  const isEditor = user?.role === "editor";
  const isPIC = user?.role === "pic";

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Dashboard - {user?.role?.toUpperCase()}
      </h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Admin Stats */}
        {isAdmin && stats && (
          <>
            <StatCard
              title="Total Blogs"
              value={stats.counts?.blogs || 0}
              link="/admin/blogs"
              color="blue"
            />
            <StatCard
              title="Courses"
              value={stats.counts?.courses || 0}
              link="/admin/courses"
              color="green"
            />
            <StatCard
              title="Registrations"
              value={stats.counts?.registrations || 0}
              link="/admin/registrations"
              color="purple"
            />
            <StatCard
              title="Users"
              value={stats.counts?.users || 0}
              link="/admin/users"
              color="orange"
            />
            <StatCard
              title="Schedules"
              value={stats.counts?.schedules || 0}
              link="/admin/schedules"
              color="indigo"
            />
            <StatCard
              title="Documents"
              value={stats.counts?.documents || 0}
              link="/admin/registration-documents"
              color="pink"
            />
            <StatCard
              title="Form Templates"
              value={stats.counts?.formTemplates || 0}
              link="/admin/form-templates"
              color="teal"
            />
            <StatCard
              title="Pending Registrations"
              value={stats.counts?.pendingRegistrations || 0}
              link="/admin/registrations?status=pending"
              color="red"
            />
          </>
        )}

        {/* Editor Stats */}
        {isEditor && stats && (
          <>
            <StatCard
              title="Total Blogs"
              value={stats.counts?.total || 0}
              link="/admin/blogs"
              color="blue"
            />
            <StatCard
              title="Published"
              value={stats.counts?.published || 0}
              link="/admin/blogs?status=published"
              color="green"
            />
            <StatCard
              title="Drafts"
              value={stats.counts?.draft || 0}
              link="/admin/blogs?status=draft"
              color="yellow"
            />
          </>
        )}

        {/* PIC Stats */}
        {isPIC && stats && (
          <>
            <StatCard
              title="Courses"
              value={stats.counts?.courses || 0}
              link="/admin/courses"
              color="green"
            />
            <StatCard
              title="Schedules"
              value={stats.counts?.schedules || 0}
              link="/admin/schedules"
              color="indigo"
            />
            <StatCard
              title="Registrations"
              value={stats.counts?.registrations || 0}
              link="/admin/registrations"
              color="purple"
            />
            <StatCard
              title="Pending"
              value={stats.counts?.pendingRegistrations || 0}
              link="/admin/registrations?status=pending"
              color="red"
            />
            <StatCard
              title="Documents"
              value={stats.counts?.documents || 0}
              link="/admin/registration-documents"
              color="pink"
            />
            <StatCard
              title="Form Templates"
              value={stats.counts?.formTemplates || 0}
              link="/admin/form-templates"
              color="teal"
            />
          </>
        )}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Blogs (Admin & Editor) */}
        {(isAdmin || isEditor) && stats?.recent?.blogs && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Recent Blog Posts
            </h2>
            <div className="space-y-3">
              {stats.recent.blogs.map((blog: any) => (
                <div
                  key={blog.id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded"
                >
                  <div>
                    <p className="font-medium text-gray-800">{blog.name}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      blog.status === "published"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {blog.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Registrations (Admin & PIC) */}
        {(isAdmin || isPIC) && stats?.recent?.registrations && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Recent Registrations
            </h2>
            <div className="space-y-3">
              {stats.recent.registrations.map((reg: any) => (
                <div
                  key={reg.id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded"
                >
                  <div>
                    <p className="font-medium text-gray-800">{reg.fullName}</p>
                    <p className="text-sm text-gray-500">{reg.email}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      reg.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : reg.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {reg.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(isAdmin || isEditor) && (
            <Link
              href="/admin/blogs/new"
              className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center transition-colors"
            >
              ➕ New Blog Post
            </Link>
          )}
          {(isAdmin || isPIC) && (
            <>
              <Link
                href="/admin/courses/new"
                className="p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 text-center transition-colors"
              >
                ➕ New Course
              </Link>
              <Link
                href="/admin/schedules/new"
                className="p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-center transition-colors"
              >
                ➕ New Schedule
              </Link>
              <Link
                href="/admin/registrations"
                className="p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-center transition-colors"
              >
                👥 View Registrations
              </Link>
            </>
          )}
          {isAdmin && (
            <Link
              href="/admin/users/new"
              className="p-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-center transition-colors"
            >
              ➕ New User
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

// StatCard Component
function StatCard({
  title,
  value,
  link,
  color,
}: {
  title: string;
  value: number;
  link: string;
  color: string;
}) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-800 border-blue-200",
    green: "bg-green-100 text-green-800 border-green-200",
    purple: "bg-purple-100 text-purple-800 border-purple-200",
    orange: "bg-orange-100 text-orange-800 border-orange-200",
    indigo: "bg-indigo-100 text-indigo-800 border-indigo-200",
    pink: "bg-pink-100 text-pink-800 border-pink-200",
    teal: "bg-teal-100 text-teal-800 border-teal-200",
    red: "bg-red-100 text-red-800 border-red-200",
    yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
  };

  return (
    <Link
      href={link}
      className={`p-6 rounded-lg border-2 hover:shadow-lg transition-all ${
        colorClasses[color as keyof typeof colorClasses]
      }`}
    >
      <h3 className="text-sm font-medium opacity-80 mb-2">{title}</h3>
      <p className="text-4xl font-bold">{value}</p>
    </Link>
  );
}
