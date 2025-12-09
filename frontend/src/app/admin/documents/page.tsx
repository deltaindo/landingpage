'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Header } from '@/components/admin/Header';
import { DataTable } from '@/components/admin/DataTable';
import { Modal } from '@/components/admin/Modal';
import { apiClient } from '@/lib/api';
import toast from 'react-hot-toast';
import { Download } from 'lucide-react';

interface Document {
  id: string;
  documentType: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
  registration: { fullName: string; email: string };
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
    showing: '',
  });
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, [pagination.page]);

  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.getRegistrationDocuments(
        pagination.page,
        pagination.limit
      );
      if (response.success && response.data) {
        setDocuments(response.data);
        if (response.pagination) {
          setPagination(response.pagination);
        }
      }
    } catch (error) {
      console.error('Failed to fetch documents:', error);
      toast.error('Failed to load documents');
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    { key: 'fileName', label: 'File Name', sortable: true },
    { key: 'documentType', label: 'Type' },
    {
      key: 'registration.fullName',
      label: 'Uploaded By',
      render: (value: any, row: Document) => row.registration?.fullName || '-',
    },
    {
      key: 'uploadedAt',
      label: 'Uploaded',
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      key: 'fileUrl',
      label: 'Download',
      render: (value: string) => (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
        >
          <Download size={16} />
          <span>Download</span>
        </a>
      ),
    },
  ];

  const handleDelete = (doc: Document) => {
    if (window.confirm(`Delete document ${doc.fileName}?`)) {
      toast.success('Document deleted');
    }
  };

  return (
    <AdminLayout>
      <Header
        title="Registration Documents"
        description="Manage uploaded registration documents"
      />

      <main className="flex-1 overflow-y-auto p-6">
        <DataTable
          columns={columns}
          data={documents}
          isLoading={isLoading}
          pagination={pagination}
          onPageChange={(page) => {
            setPagination({ ...pagination, page });
          }}
          onDelete={handleDelete}
          searchable={false}
        />
      </main>
    </AdminLayout>
  );
}
