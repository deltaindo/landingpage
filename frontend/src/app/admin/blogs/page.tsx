'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Header } from '@/components/admin/Header';
import { DataTable } from '@/components/admin/DataTable';
import { Modal } from '@/components/admin/Modal';
import { apiClient } from '@/lib/api';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';

interface Blog {
  id: string;
  name: string;
  code: string;
  category: string;
  certification: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
    showing: '',
  });
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, [pagination.page, searchTerm]);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.getBlogs(
        pagination.page,
        pagination.limit,
        searchTerm
      );
      if (response.success && response.data) {
        setBlogs(response.data);
        if (response.pagination) {
          setPagination(response.pagination);
        }
      }
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
      toast.error('Failed to load blogs');
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

  const handleEdit = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const handleDelete = (blog: Blog) => {
    if (window.confirm(`Delete blog "${blog.name}"?`)) {
      toast.success('Blog deleted successfully');
    }
  };

  return (
    <AdminLayout>
      <Header title="Blogs" description="Manage all blog posts" />

      <main className="flex-1 overflow-y-auto p-6">
        <div className="mb-6">
          <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            <Plus size={20} />
            <span>Create Blog</span>
          </button>
        </div>

        <DataTable
          columns={columns}
          data={blogs}
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
        title={selectedBlog ? 'Edit Blog' : 'Create Blog'}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedBlog(null);
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
              Title
            </label>
            <input
              type="text"
              defaultValue={selectedBlog?.name || ''}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Code
            </label>
            <input
              type="text"
              defaultValue={selectedBlog?.code || ''}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              defaultValue={selectedBlog?.category || ''}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="certification"
              defaultChecked={selectedBlog?.certification || false}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="certification" className="ml-2 text-sm text-gray-700">
              Certification
            </label>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}
