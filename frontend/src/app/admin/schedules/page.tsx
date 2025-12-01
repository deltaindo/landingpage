"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

interface Schedule {
  id: string;
  uuid: string;
  startDate: string;
  endDate: string;
  location: string;
  type: string;
  maxParticipants: number;
  status: string;
  createdAt: string;
  course: {
    id: string;
    name: string;
    code: string;
    category: string;
    certification: string;
  };
}

export default function SchedulesListPage() {
  const { user } = useAuth();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "",
    courseId: "",
    page: 1,
    limit: 230,
  });
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    showing: "",
  });

  useEffect(() => {
    fetchSchedules();
  }, [filters, user]);

  const fetchSchedules = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const baseEndpoint =
        user.role === "pic" ? "/api/cms/pic" : "/api/cms/admin";

      const params = new URLSearchParams({
        page: filters.page.toString(),
        limit: filters.limit.toString(),
        ...(filters.status && { status: filters.status }),
        ...(filters.courseId && { courseId: filters.courseId }),
      });

      const response = await fetch(`${baseEndpoint}/schedules?${params}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setSchedules(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Error fetching schedules:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Course Schedules</h1>
        <Link
          href="/admin/schedules/new"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          ➕ New Schedule
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Status</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
          <option value="full">Full</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <p className="text-sm text-gray-500 mt-2">
          Showing {pagination.showing} of {pagination.total} schedules
        </p>
      </div>

      {/* Schedules Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Course
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date Range
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Capacity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : schedules.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  No schedules found
                </td>
              </tr>
            ) : (
              schedules.map((schedule) => (
                <tr key={schedule.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">
                    <div className="font-medium text-gray-900">
                      {schedule.course.name}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {schedule.course.code}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(schedule.startDate).toLocaleDateString()} -{" "}
                    {new Date(schedule.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {schedule.location}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                      {schedule.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {schedule.maxParticipants} seats
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        schedule.status === "open"
                          ? "bg-green-100 text-green-800"
                          : schedule.status === "full"
                          ? "bg-yellow-100 text-yellow-800"
                          : schedule.status === "closed"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {schedule.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium space-x-2">
                    <Link
                      href={`/admin/schedules/${schedule.id}/edit`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/admin/schedules/${schedule.id}`}
                      className="text-green-600 hover:text-green-900"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
