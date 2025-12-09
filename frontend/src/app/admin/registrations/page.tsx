'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Header } from '@/components/admin/Header';
import { DataTable } from '@/components/admin/DataTable';
import { Modal } from '@/components/admin/Modal';
import { apiClient } from '@/lib/api';
import toast from 'react-hot-toast';

interface Registration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  status: string;
  createdAt: string;
  course: { name: string };
}

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
    showing: '',
  });
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchRegistrations();
  }, [pagination.page, searchTerm, statusFilter]);

  const fetchRegistrations = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.getRegistrations(
        pagination.page,
        pagination.limit,
        statusFilter,
        searchTerm
      );
      if (response.success && response.data) {
        setRegistrations(response.data);
        if (response.pagination) {
          setPagination(response.pagination);
        }
      }
    } catch (error) {
      console.error('Failed to fetch registrations:', error);
      toast.error('Failed to load registrations');
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    { key: 'fullName', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'phone', label: 'Phone' },
    { key: 'company', label: 'Company' },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => (
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          value === 'approved'
            ? 'bg-green-100 text-green-800'
            : value === 'pending'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {value?.charAt(0).toUpperCase() + value?.slice(1)}
        </span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Registered',
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
  ];

  const handleViewDetails = (reg: Registration) => {
    setSelectedReg(reg);
    setIsModalOpen(true);
  };

  const handleDelete = (reg: Registration) => {
    if (window.confirm(`Remove registration for ${reg.fullName}?`)) {
      toast.success('Registration deleted');
    }
  };

  return (
    <AdminLayout>
      <Header title="Registrations" description="View and manage user registrations" />

      <main className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 flex items-center space-x-4">
          <div className="flex-1">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={registrations}
          isLoading={isLoading}
          pagination={pagination}
          onPageChange={(page) => {
            setPagination({ ...pagination, page });
          }}
          onRowClick={handleViewDetails}
          onDelete={handleDelete}
        />
      </main>

      {/* Details Modal */}
      <Modal
        isOpen={isModalOpen}
        title="Registration Details"
        onClose={() => {
          setIsModalOpen(false);
          setSelectedReg(null);
        }}
        size="lg"
        footer={
          <>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Close
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              Approve
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
              Reject
            </button>
          </>
        }
      >
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Full Name</p>
            <p className="text-lg font-medium text-gray-900">{selectedReg?.fullName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Email</p>
            <p className="text-lg font-medium text-gray-900">{selectedReg?.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Phone</p>
            <p className="text-lg font-medium text-gray-900">{selectedReg?.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Company</p>
            <p className="text-lg font-medium text-gray-900">{selectedReg?.company}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Course</p>
            <p className="text-lg font-medium text-gray-900">{selectedReg?.course?.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Status</p>
            <p className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              selectedReg?.status === 'approved'
                ? 'bg-green-100 text-green-800'
                : selectedReg?.status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {selectedReg?.status?.charAt(0).toUpperCase() + selectedReg?.status?.slice(1)}
            </p>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}
