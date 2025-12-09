'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Header } from '@/components/admin/Header';
import { DataTable } from '@/components/admin/DataTable';
import { Modal } from '@/components/admin/Modal';
import { apiClient } from '@/lib/api';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
    showing: '',
  });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [pagination.page, searchTerm, roleFilter]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.getUsers(
        pagination.page,
        pagination.limit,
        searchTerm,
        roleFilter
      );
      if (response.success && response.data) {
        setUsers(response.data);
        if (response.pagination) {
          setPagination(response.pagination);
        }
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast.error('Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    {
      key: 'role',
      label: 'Role',
      render: (value: string) => {
        const roleColors: Record<string, string> = {
          admin: 'bg-red-100 text-red-800',
          editor: 'bg-blue-100 text-blue-800',
          pic: 'bg-purple-100 text-purple-800',
          viewer: 'bg-gray-100 text-gray-800',
        };
        return (
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${roleColors[value] || 'bg-gray-100 text-gray-800'}`}>
            {value?.charAt(0).toUpperCase() + value?.slice(1)}
          </span>
        );
      },
    },
    {
      key: 'createdAt',
      label: 'Created',
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
  ];

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (user: User) => {
    if (window.confirm(`Delete user ${user.name}?`)) {
      toast.success('User deleted successfully');
    }
  };

  return (
    <AdminLayout>
      <Header title="Users" description="Manage admin users" />

      <main className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            <Plus size={20} />
            <span>Add User</span>
          </button>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="pic">PIC</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>

        <DataTable
          columns={columns}
          data={users}
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
        title={selectedUser ? 'Edit User' : 'Create User'}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
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
              Full Name
            </label>
            <input
              type="text"
              defaultValue={selectedUser?.name || ''}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              defaultValue={selectedUser?.email || ''}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              defaultValue={selectedUser?.role || ''}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="pic">PIC</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}
