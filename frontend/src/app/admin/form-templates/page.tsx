"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

interface FormTemplate {
  id: string;
  uuid: string;
  name: string;
  description: string;
  fields: any;
  createdAt: string;
  updatedAt: string;
}

export default function FormTemplatesPage() {
  const { user } = useAuth();
  const [templates, setTemplates] = useState<FormTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    page: 1,
    limit: 230,
  });
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    showing: "",
  });

  useEffect(() => {
    fetchTemplates();
  }, [filters, user]);

  const fetchTemplates = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const baseEndpoint =
        user.role === "pic" ? "/api/cms/pic" : "/api/cms/admin";

      const params = new URLSearchParams({
        page: filters.page.toString(),
        limit: filters.limit.toString(),
        ...(filters.search && { search: filters.search }),
      });

      const response = await fetch(`${baseEndpoint}/form-templates?${params}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setTemplates(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Error fetching form templates:", error);
    } finally {
      setLoading(false);
    }
  };

  const getFieldCount = (fields: any) => {
    if (!fields) return 0;
    if (Array.isArray(fields)) return fields.length;
    if (typeof fields === "object") return Object.keys(fields).length;
    return 0;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Form Templates</h1>
        <Link
          href="/admin/form-templates/new"
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          ➕ New Template
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <input
          type="text"
          placeholder="Search templates..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <p className="text-sm text-gray-500 mt-2">
          Showing {pagination.showing} of {pagination.total} templates
        </p>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            Loading...
          </div>
        ) : templates.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            No form templates found
          </div>
        ) : (
          templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {template.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {template.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>📝 {getFieldCount(template.fields)} fields</span>
                <span>{new Date(template.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="flex space-x-2">
                <Link
                  href={`/admin/form-templates/${template.id}/edit`}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Edit
                </Link>
                <Link
                  href={`/admin/form-templates/${template.id}`}
                  className="flex-1 px-4 py-2 bg-green-600 text-white text-center rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  View
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
