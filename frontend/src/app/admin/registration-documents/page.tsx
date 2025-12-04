"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

interface RegistrationDocument {
  id: string;
  uuid: string;
  documentType: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
  registration: {
    id: string;
    fullName: string;
    email: string;
  };
}

export default function RegistrationDocumentsPage() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<RegistrationDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    registrationId: "",
    page: 1,
    limit: 230,
  });
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    showing: "",
  });

  useEffect(() => {
    fetchDocuments();
  }, [filters, user]);

  const fetchDocuments = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const baseEndpoint =
        user.role === "pic" ? "/api/cms/pic" : "/api/cms/admin";

      const params = new URLSearchParams({
        page: filters.page.toString(),
        limit: filters.limit.toString(),
        ...(filters.registrationId && {
          registrationId: filters.registrationId,
        }),
      });

      const response = await fetch(
        `${baseEndpoint}/registration-documents?${params}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setDocuments(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDocumentIcon = (type: string) => {
    const icons: Record<string, string> = {
      "ID Card": "🪪",
      Resume: "📄",
      Certificate: "🎓",
      Photo: "📷",
      Other: "📎",
    };
    return icons[type] || "📎";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Registration Documents
        </h1>
      </div>

      {/* Info */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <p className="text-sm text-gray-500">
          Showing {pagination.showing} of {pagination.total} documents
        </p>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                File Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Participant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Uploaded
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : documents.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No documents found
                </td>
              </tr>
            ) : (
              documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">
                    <span className="text-2xl">
                      {getDocumentIcon(doc.documentType)}
                    </span>
                    <span className="ml-2 text-gray-900">
                      {doc.documentType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {doc.fileName}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="font-medium text-gray-900">
                      {doc.registration.fullName}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {doc.registration.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(doc.uploadedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium space-x-2">
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Download
                    </a>
                    <Link
                      href={`/admin/registration-documents/${doc.id}`}
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
