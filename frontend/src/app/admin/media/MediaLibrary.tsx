"use client";

import { useState, useEffect } from "react";

export default function MediaLibrary() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const response = await fetch("/api/media");
      const data = await response.json();
      if (data.success) {
        setMedia(data.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this media file?")) return;

    try {
      await fetch(`/api/media/${id}`, { method: "DELETE" });
      fetchMedia();
    } catch (error) {
      console.error("Error deleting media:", error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Media Library</h1>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            // Handle upload
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {media.map((item: any) => (
          <div key={item.id} className="relative group">
            <img
              src={item.fileUrl}
              alt={item.fileName}
              className="w-full h-32 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <button
                onClick={() => handleDelete(item.id)}
                className="text-white hover:text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
