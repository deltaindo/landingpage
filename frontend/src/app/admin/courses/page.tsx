'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Header } from '@/components/admin/Header';
import { DataTable } from '@/components/admin/DataTable';
import { Modal } from '@/components/admin/Modal';
import { apiClient } from '@/lib/api';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  code: string;
  category: string;
  certification: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
    showing: '',
  });
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, [pagination.page, searchTerm]);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.getCourses(
        pagination.page,
        pagination.limit,
        searchTerm
      );
      if (response.success && response.data) {
        setCourses(response.data);
        if (response.pagination) {
          setPagination(response.pagination);
        }
      }
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      toast.error('Failed to load courses');
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    { key: 'name', label: 'Title', sortable: true },
    { key: 'code', label: 'Code', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    {
      key: 'certification',
      label: 'Certification',
      render: (value: boolean) => (
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          value
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {value ? 'Yes' : 'No'}
        </span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Created',
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
  ];

  const handleEdit = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleDelete = (course: Course) => {
    if (window.confirm(`Delete course "${course.name}"?`)) {
      toast.success('Course deleted successfully');
    }
  };

  return (
    <AdminLayout>
      <Header title="Courses" description="Manage all training courses" />

      <main className="flex-1 overflow-y-auto p-6">
        <div className="mb-6">
          <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            <Plus size={20} />
            <span>Create Course</span>
          </button>
        </div>

        <DataTable
          columns={columns}
          data={courses}
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
        title={selectedCourse ? 'Edit Course' : 'Create Course'}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCourse(null);
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Name
            </label>
            <input
              type="text"
              defaultValue={selectedCourse?.name || ''}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Code
            </label>
            <input
              type="text"
              defaultValue={selectedCourse?.code || ''}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Select Category</option>
              <option>Technical</option>
              <option>Business</option>
              <option>Soft Skills</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="cert"
              defaultChecked={selectedCourse?.certification || false}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="cert" className="ml-2 text-sm text-gray-700">
              Offers Certification
            </label>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}
