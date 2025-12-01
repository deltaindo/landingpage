"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import AdminLayout from "@/components/admin/AdminLayout";
import { blogAPI } from "@/lib/Oldapi";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  type: "featured" | "media-release";
  excerpt: string;
  featuredImage: string;
  status: "draft" | "published" | "archived";
  publishedAt: string;
  views: number;
  createdAt: string;
}

export default function MediaAdminPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    status: "",
    type: "",
    search: "",
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, [filter, page]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await blogAPI.getAll({
        ...filter,
        page,
        limit: 10,
      });
      setPosts(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await blogAPI.delete(id);
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handlePublish = async (id: string) => {
    try {
      await blogAPI.publish(id);
      fetchPosts();
    } catch (error) {
      console.error("Error publishing post:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-dark mb-2">
              Media Management
            </h1>
            <p className="text-gray-600">
              Manage blog posts and media releases
            </p>
          </div>
          <Link
            href="/admin/media/new"
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
          >
            <FaPlus />
            <span>New Post</span>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="grid md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search posts..."
              value={filter.search}
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <select
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
            <select
              value={filter.type}
              onChange={(e) => setFilter({ ...filter, type: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="featured">Featured</option>
              <option value="media-release">Media Release</option>
            </select>
            <button
              onClick={() => setFilter({ status: "", type: "", search: "" })}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Posts Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading...</div>
          ) : posts.length === 0 ? (
            <div className="p-12 text-center text-gray-500">No posts found</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Title
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Type
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Views
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Date
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {posts.map((post) => (
                      <tr key={post.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={post.featuredImage || "/placeholder.jpg"}
                              alt={post.title}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-semibold text-dark">
                                {post.title}
                              </p>
                              <p className="text-sm text-gray-500">
                                {post.excerpt.substring(0, 60)}...
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              post.type === "featured"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {post.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              post.status === "published"
                                ? "bg-green-100 text-green-700"
                                : post.status === "draft"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {post.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {post.views}
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-sm">
                          {new Date(post.createdAt).toLocaleDateString("id-ID")}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end space-x-2">
                            <Link
                              href={`/blog/${post.slug}`}
                              target="_blank"
                              className="p-2 text-gray-600 hover:text-primary transition"
                              title="View"
                            >
                              <FaEye />
                            </Link>
                            <Link
                              href={`/admin/media/${post.id}/edit`}
                              className="p-2 text-gray-600 hover:text-primary transition"
                              title="Edit"
                            >
                              <FaEdit />
                            </Link>
                            {post.status === "draft" && (
                              <button
                                onClick={() => handlePublish(post.id)}
                                className="p-2 text-gray-600 hover:text-green-600 transition"
                                title="Publish"
                              >
                                <FaCheck />
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(post.id)}
                              className="p-2 text-gray-600 hover:text-red-600 transition"
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Page {page} of {totalPages}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
