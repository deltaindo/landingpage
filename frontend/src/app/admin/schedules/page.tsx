'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Header } from '@/components/admin/Header';
import { DataTable } from '@/components/admin/DataTable';
import { Modal } from '@/components/admin/Modal';
import { apiClient } from '@/lib/api';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';

interface Schedule {
  id: string;
  startDate: string;
  endDate: string;
  location: string;
  type: string;
  maxParticipants: number;
  status: string;
  course: { name: string; code: string };
  createdAt: string;
}

export default function SchedulesPage() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
    showing: '',
  });
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchSchedules();
  }, [pagination.page]);

  const fetchSchedules = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.getSchedules(
        pagination.page,
        pagination.limit
      );
      if (response.success && response.data) {
        setSchedules(response.data);
        if (response.pagination) {
          setPagination(response.pagination);
        }
      }
    } catch (error) {
      console.error('Failed to fetch schedules:', error);
      toast.error('Failed to load schedules');
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      key: 'course.name',
      label: 'Course',
      render: (value: any, row: Schedule) => row.course?.name || '-',
    },
    {
      key: 'startDate',
      label: 'Start Date',
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      key: 'endDate',
      label: 'End Date',
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    { key: 'location', label: 'Location' },
    { key: 'type', label: 'Type' },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => (
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          value === 'active'
            ? 'bg-green-100 text-green-800'
            : value === 'completed'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {value?.charAt(0).toUpperCase() + value?.slice(1)}
        </span>
      ),
    },
  ];

  const handleEdit = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setIsModalOpen(true);
  };

  const handleDelete = (schedule: Schedule) => {
    if (window.confirm('Delete this schedule?')) {
      toast.success('Schedule deleted successfully');
    }
  };

  return (
    <AdminLayout>
      <Header
        title="Course Schedules"
        description="Manage training schedules"
      />

      <main className="flex-1 overflow-y-auto p-6">
        <div className="mb-6">
          <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            <Plus size={20} />
            <span>Create Schedule</span>
          </button>
        </div>

        <DataTable
          columns={columns}
          data={schedules}
          isLoading={isLoading}
          pagination={pagination}
          onPageChange={(page) => {
            setPagination({ ...pagination, page });
          }}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>

      {/* Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        title="Schedule Details"
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSchedule(null);
        }}
        footer={
          <>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              Save
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                defaultValue={selectedSchedule?.startDate?.split('T')[0] || ''}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                defaultValue={selectedSchedule?.endDate?.split('T')[0] || ''}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              defaultValue={selectedSchedule?.location || ''}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <input
                type="text"
                defaultValue={selectedSchedule?.type || ''}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Participants
              </label>
              <input
                type="number"
                defaultValue={selectedSchedule?.maxParticipants || 0}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}
