'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Header } from '@/components/admin/Header';
import { StatCard } from '@/components/admin/StatCard';
import { apiClient } from '@/lib/api';
import {
  BarChart3,
  BookOpen,
  Users,
  Calendar,
  TrendingUp,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface DashboardStats {
  blogs: number;
  courses: number;
  schedules: number;
  registrations: number;
  users: number;
  documents: number;
  formTemplates: number;
  pendingRegistrations: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.getDashboardStats();
      if (response.success && response.data?.counts) {
        setStats(response.data.counts);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      toast.error('Failed to load dashboard statistics');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <Header
        title="Dashboard"
        description="Welcome to the Delta Indonesia Admin Panel"
      />

      <main className="flex-1 overflow-y-auto p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={BookOpen}
            label="Total Blogs"
            value={stats?.blogs || 0}
            color="blue"
          />
          <StatCard
            icon={FileText}
            label="Total Courses"
            value={stats?.courses || 0}
            color="green"
          />
          <StatCard
            icon={Calendar}
            label="Course Schedules"
            value={stats?.schedules || 0}
            color="purple"
          />
          <StatCard
            icon={Users}
            label="Total Registrations"
            value={stats?.registrations || 0}
            color="orange"
            trend={{
              value: 12,
              isPositive: true,
            }}
          />
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={Users}
            label="Total Users"
            value={stats?.users || 0}
            color="blue"
          />
          <StatCard
            icon={TrendingUp}
            label="Pending Registrations"
            value={stats?.pendingRegistrations || 0}
            color="red"
          />
          <StatCard
            icon={BarChart3}
            label="Form Templates"
            value={stats?.formTemplates || 0}
            color="green"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <a href="/admin/blogs" className="block px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded transition">
                + Create New Blog
              </a>
              <a href="/admin/courses" className="block px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded transition">
                + Add Course
              </a>
              <a href="/admin/schedules" className="block px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded transition">
                + Schedule Training
              </a>
              <a href="/admin/users" className="block px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded transition">
                + Add User
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">API Status</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Database</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Connected</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Cache</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </AdminLayout>
  );
}

// Fix missing import
const FileText = () => null;
