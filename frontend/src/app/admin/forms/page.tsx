'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Header } from '@/components/admin/Header';
import { DataTable } from '@/components/admin/DataTable';
import { Modal } from '@/components/admin/Modal';
import { apiClient } from '@/lib/api';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface FormTemplate {
  id: string;
  name: string;
  description: string;
  fields: any[];
  createdAt: string;
  updatedAt: string;
}

export default function FormsPage() {
  const [forms, setForms] = useState<FormTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
    showing: '',
  });
  const [selectedForm, setSelectedForm] = useState<FormTemplate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchForms();
  }, [pagination.page, searchTerm]);

  const fetchForms = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.getFormTemplates(
        pagination.page,
        pagination.limit,
        searchTerm
      );
      if (response.success && response.data) {
        setForms(response.data);
        if (response.pagination) {
          setPagination(response.pagination);
        }
      }
    } catch (error) {
      console.error('Failed to fetch forms:', error);
      toast.error('Failed to load form templates');
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    { key: 'name', label: 'Form Name', sortable: true },
    { key: 'description', label: 'Description' },
    {
      key: 'fields',
      label: 'Fields',
      render: (value: any[]) => (value?.length || 0) + ' fields',
    },
    {
      key: 'createdAt',
      label: 'Created',
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
  ];

  const handleEdit = (form: FormTemplate) => {
    setSelectedForm(form);
    setIsModalOpen(true);
  };

  const handleDelete = (form: FormTemplate) => {
    if (window.confirm(`Delete form template "${form.name}"?`)) {
      toast.success('Form template deleted');
    }
  };

  return (
    <AdminLayout>
      <Header title="Form Templates" description="Manage custom form templates" />

      <main className="flex-1 overflow-y-auto p-6">
        <div className="mb-6">
          <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            <Plus size={20} />
            <span>Create Template</span>
          </button>
        </div>

        <DataTable
          columns={columns}
          data={forms}
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
        title={selectedForm ? 'Edit Template' : 'Create Template'}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedForm(null);
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
              Template Name
            </label>
            <input
              type="text"
              defaultValue={selectedForm?.name || ''}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              defaultValue={selectedForm?.description || ''}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Fields
            </label>
            <p className="text-gray-600">{selectedForm?.fields?.length || 0} fields</p>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}
