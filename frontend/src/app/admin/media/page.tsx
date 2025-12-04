"use client";

import { useEffect, useState } from "react";

interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  alt: string;
  caption: string;
  createdAt: string;
}

export default function MediaLibraryPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/media");
      const data = await response.json();
      if (data.success) {
        setMedia(data.data);
      }
    } catch (error) {
      console.error("Error fetching media:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);

        await fetch("/api/media", {
          method: "POST",
          body: formData,
        });
      }

      fetchMedia();
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this media?")) return;

    try {
      const response = await fetch(`/api/media/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchMedia();
        setSelectedMedia(null);
      }
    } catch (error) {
      console.error("Error deleting media:", error);
    }
  };

  const handleUpdateDetails = async () => {
    if (!selectedMedia) return;

    try {
      const response = await fetch(`/api/media/${selectedMedia.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          alt: selectedMedia.alt,
          caption: selectedMedia.caption,
        }),
      });

      if (response.ok) {
        fetchMedia();
      }
    } catch (error) {
      console.error("Error updating media:", error);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    alert("URL copied to clipboard!");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Media Library</h1>

        <label className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
          {uploading ? "Uploading..." : "📤 Upload Files"}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Media Grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : media.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500 mb-4">No media files yet</p>
              <label className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
                Upload Your First File
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleUpload}
                  className="hidden"
                />
              </label>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {media.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedMedia(item)}
                  className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 ${
                    selectedMedia?.id === item.id
                      ? "border-blue-500"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <div className="aspect-square bg-gray-100">
                    <img
                      src={item.fileUrl}
                      alt={item.alt || item.originalName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 text-sm">
                      View Details
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details Sidebar */}
        <div className="lg:col-span-1">
          {selectedMedia ? (
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h3 className="text-lg font-semibold mb-4">Media Details</h3>

              <div className="mb-4">
                <img
                  src={selectedMedia.fileUrl}
                  alt={selectedMedia.alt}
                  className="w-full rounded-lg"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    File Name
                  </label>
                  <p className="text-sm text-gray-600 break-all">
                    {selectedMedia.originalName}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Alt Text
                  </label>
                  <input
                    type="text"
                    value={selectedMedia.alt}
                    onChange={(e) =>
                      setSelectedMedia({
                        ...selectedMedia,
                        alt: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Caption
                  </label>
                  <textarea
                    value={selectedMedia.caption}
                    onChange={(e) =>
                      setSelectedMedia({
                        ...selectedMedia,
                        caption: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    File URL
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={selectedMedia.fileUrl}
                      readOnly
                      className="flex-1 px-3 py-2 border rounded-lg text-sm bg-gray-50"
                    />
                    <button
                      onClick={() => copyToClipboard(selectedMedia.fileUrl)}
                      className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Size: {(selectedMedia.fileSize / 1024).toFixed(2)} KB
                  </p>
                  <p className="text-xs text-gray-500">
                    Uploaded:{" "}
                    {new Date(selectedMedia.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex space-x-2 pt-4 border-t">
                  <button
                    onClick={handleUpdateDetails}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(selectedMedia.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-500 text-center">
                Select a media item to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
