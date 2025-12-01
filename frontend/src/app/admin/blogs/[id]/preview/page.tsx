"use client";

import { use, useState, useEffect } from "react";

export default function BlogPreview({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    const response = await fetch(`/api/blogs/${id}`);
    const data = await response.json();
    if (data.success) {
      setBlog(data.data);
    }
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
        <p className="font-semibold">Preview Mode</p>
        <p className="text-sm">
          This is how your post will look when published
        </p>
      </div>

      <article className="bg-white rounded-lg shadow-lg p-8">
        {blog.featuredImage && (
          <img
            src={blog.featuredImage}
            alt={blog.title}
            className="w-full h-96 object-cover rounded-lg mb-6"
          />
        )}

        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

        <div className="flex items-center text-gray-600 mb-6">
          <span>{blog.author}</span>
          <span className="mx-2">•</span>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>
    </div>
  );
}
