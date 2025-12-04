const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const api = {
  // Generic fetch wrapper
  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_URL}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  },

  // Specific methods
  blogs: {
    getAll: () => api.request("/api/blogs"),
    getOne: (id: string) => api.request(`/api/blogs/${id}`),
    create: (data: any) =>
      api.request("/api/blogs", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string, data: any) =>
      api.request(`/api/blogs/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      api.request(`/api/blogs/${id}`, { method: "DELETE" }),
  },

  courses: {
    getAll: () => api.request("/api/courses"),
    getOne: (id: string) => api.request(`/api/courses/${id}`),
    create: (data: any) =>
      api.request("/api/courses", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string, data: any) =>
      api.request(`/api/courses/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      api.request(`/api/courses/${id}`, { method: "DELETE" }),
  },

  registrations: {
    getAll: () => api.request("/api/registrations"),
    updateStatus: (id: string, status: string) =>
      api.request(`/api/registrations/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      }),
  },

  media: {
    upload: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_URL}/api/media`, {
        method: "POST",
        body: formData,
      });

      return response.json();
    },
  },
};
