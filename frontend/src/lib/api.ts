import axios from "axios";
import { ContactFormData, Training, ApiResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Blog API
export const blogAPI = {
  getAll: (params?: any) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/blog?${queryString}`);
  },

  getBySlug: (slug: string) => {
    return apiCall(`/blog/${slug}`);
  },

  create: async (formData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/blog`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create blog post");
    }

    return response.json();
  },

  update: async (id: string, formData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/blog/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update blog post");
    }

    return response.json();
  },

  delete: (id: string) => {
    return apiCall(`/blog/${id}`, {
      method: "DELETE",
    });
  },

  publish: (id: string) => {
    return apiCall(`/blog/${id}/publish`, {
      method: "PATCH",
    });
  },
};

export const courseAPI = {
  getAll: (params?: any) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/courses?${queryString}`);
  },

  getById: (id: string) => {
    return apiCall(`/courses/${id}`);
  },

  create: (data: any) => {
    return apiCall("/courses", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update: (id: string, data: any) => {
    return apiCall(`/courses/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
};

export const contactAPI = {
  sendMessage: async (data: ContactFormData): Promise<ApiResponse<any>> => {
    try {
      const response = await api.post("/contact", data);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to send message"
      );
    }
  },
};

// Form Template API
export const formTemplateAPI = {
  getAll: () => {
    return apiCall("/form-templates");
  },

  getById: (id: string) => {
    return apiCall(`/form-templates/${id}`);
  },

  getDefault: () => {
    return apiCall("/form-templates/default");
  },
};

// Registration API
export const registrationAPI = {
  create: async (formData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/registrations`, {
      method: "POST",
      body: formData, // Don't set Content-Type for FormData
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Registration failed");
    }

    return response.json();
  },

  getAll: (params?: any) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/registrations?${queryString}`);
  },

  getById: (id: string) => {
    return apiCall(`/registrations/${id}`);
  },
};

export const trainingAPI = {
  getAll: async (): Promise<ApiResponse<Training[]>> => {
    try {
      const response = await api.get("/training");
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch trainings"
      );
    }
  },

  getByCategory: async (category: string): Promise<ApiResponse<Training[]>> => {
    try {
      const response = await api.get(`/training?category=${category}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch trainings"
      );
    }
  },
};

export const subscriptionAPI = {
  subscribe: async (email: string): Promise<ApiResponse<any>> => {
    try {
      const response = await api.post("/subscription", { email });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to subscribe");
    }
  },
};

export default api;
