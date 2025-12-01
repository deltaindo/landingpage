"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Import React Quill dynamically (client-side only)
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

interface BlogEditorProps {
  blogId?: string;
  isNew?: boolean;
}

export default function BlogEditor({ blogId, isNew = false }: BlogEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    type: "media-release",
    content: "",
    excerpt: "",
    featuredImage: "",
    author: "Delta Indonesia",
    categoryId: "",
    tags: [] as string[],
    status: "draft",
    scheduledAt: "",
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: [] as string[],
    },
  });

  useEffect(() => {
    fetchCategories();
    fetchTags();
    if (!isNew && blogId) {
      fetchBlog();
    }
  }, [blogId, isNew]);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/blogs/${blogId}`);
      const data = await response.json();
      if (data.success) {
        setFormData(data.data);
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await fetch("/api/tags");
      const data = await response.json();
      if (data.success) {
        setTags(data.data);
      }
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  const handleSubmit = async (status: string) => {
    setLoading(true);
    try {
      const url = isNew ? "/api/blogs" : `/api/blogs/${blogId}`;
      const method = isNew ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, status }),
      });

      if (response.ok) {
        router.push("/admin/blogs");
      }
    } catch (error) {
      console.error("Error saving blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setFormData((prev) => ({
          ...prev,
          featuredImage: data.data.fileUrl,
        }));
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {isNew ? "Create New Post" : "Edit Post"}
        </h1>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          ← Back
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter post title"
              required
            />
          </div>

          {/* Slug */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug (URL)
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="post-slug"
            />
            <p className="text-xs text-gray-500 mt-1">
              URL: /blog/{formData.slug}
            </p>
          </div>

          {/* Content Editor */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <ReactQuill
              theme="snow"
              value={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
              modules={quillModules}
              className="bg-white"
              style={{ minHeight: "400px" }}
            />
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt *
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) =>
                setFormData({ ...formData, excerpt: e.target.value })
              }
              rows={3}
              maxLength={200}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Short description (max 200 characters)"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.excerpt.length}/200 characters
            </p>
          </div>

          {/* SEO Settings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">SEO Settings</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={formData.seo.metaTitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      seo: { ...formData.seo, metaTitle: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="SEO title (default: post title)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  value={formData.seo.metaDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      seo: { ...formData.seo, metaDescription: e.target.value },
                    })
                  }
                  rows={2}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="SEO description (default: excerpt)"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Publish</h3>

            <div className="space-y-3">
              <button
                onClick={() => handleSubmit("draft")}
                disabled={loading}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300"
              >
                Save as Draft
              </button>

              <button
                onClick={() => handleSubmit("published")}
                disabled={loading}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
              >
                {isNew ? "Publish Now" : "Update & Publish"}
              </button>
            </div>

            {/* Schedule */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Schedule For Later
              </label>
              <input
                type="datetime-local"
                value={formData.scheduledAt}
                onChange={(e) =>
                  setFormData({ ...formData, scheduledAt: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Featured Image</h3>

            {formData.featuredImage && (
              <img
                src={formData.featuredImage}
                alt="Featured"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Post Type */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Post Type</h3>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="media-release">Media Release</option>
              <option value="featured">Featured</option>
            </select>
          </div>

          {/* Category */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Category</h3>
            <select
              value={formData.categoryId}
              onChange={(e) =>
                setFormData({ ...formData, categoryId: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              {categories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="space-y-2">
              {tags.map((tag: any) => (
                <label key={tag.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.tags.includes(tag.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          tags: [...formData.tags, tag.id],
                        });
                      } else {
                        setFormData({
                          ...formData,
                          tags: formData.tags.filter((t) => t !== tag.id),
                        });
                      }
                    }}
                    className="rounded"
                  />
                  <span className="text-sm">{tag.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Author */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Author</h3>
            <input
              type="text"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
