// API Base URL
const API_BASE_URL = '/api';

// Generic API call function
async function apiCall(endpoint: string, options: RequestInit = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API Error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("API Call Error:", error);
    throw error;
  }
}

// =====================================================
// COURSE API
// =====================================================
export const courseAPI = {
  // Get all courses with filters
  getAll: async (params?: {
    category?: string;
    status?: string;
    featured?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    const queryString = params
      ? new URLSearchParams(params as any).toString()
      : "";
    return apiCall(`/courses${queryString ? `?${queryString}` : ""}`);
  },

  // Get single course by ID
  getById: (id: string) => {
    return apiCall(`/courses/${id}`);
  },

  // Get featured courses
  getFeatured: () => {
    return apiCall("/courses/featured/list");
  },

  // Create course (admin)
  create: (data: any) => {
    return apiCall("/courses", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Update course (admin)
  update: (id: string, data: any) => {
    return apiCall(`/courses/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  // Delete course (admin)
  delete: (id: string) => {
    return apiCall(`/courses/${id}`, {
      method: "DELETE",
    });
  },
};

// =====================================================
// FORM TEMPLATE API
// =====================================================
export const formTemplateAPI = {
  // Get all form templates
  getAll: () => {
    return apiCall("/form-templates");
  },

  // Get form template by ID
  getById: (id: string) => {
    return apiCall(`/form-templates/${id}`);
  },

  // Get default form template
  getDefault: () => {
    return apiCall("/form-templates/default");
  },

  // Create form template (admin)
  create: (data: any) => {
    return apiCall("/form-templates", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

// =====================================================
// REGISTRATION API
// =====================================================
export const registrationAPI = {
  // Create new registration with file uploads
  create: async (formData: FormData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/registrations`, {
        method: "POST",
        body: formData, // Don't set Content-Type for FormData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Registration failed");
      }

      return response.json();
    } catch (error) {
      console.error("Registration Error:", error);
      throw error;
    }
  },

  // Get all registrations (admin)
  getAll: (params?: { status?: string; page?: number; limit?: number }) => {
    const queryString = params
      ? new URLSearchParams(params as any).toString()
      : "";
    return apiCall(`/registrations${queryString ? `?${queryString}` : ""}`);
  },

  // Get registration by ID
  getById: (id: string) => {
    return apiCall(`/registrations/${id}`);
  },

  // Update registration status (admin)
  updateStatus: (id: string, status: string) => {
    return apiCall(`/registrations/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },
};

// =====================================================
// BLOG API
// =====================================================
export const blogAPI = {
  // Get all blog posts
  getAll: (params?: {
    type?: string;
    status?: string;
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    const queryString = params
      ? new URLSearchParams(params as any).toString()
      : "";
    return apiCall(`/blog${queryString ? `?${queryString}` : ""}`);
  },

  // Get blog post by slug
  getBySlug: (slug: string) => {
    return apiCall(`/blog/${slug}`);
  },

  // Get blog post by ID
  getById: (id: string) => {
    return apiCall(`/blog/id/${id}`);
  },

  // Create blog post (admin)
  create: async (formData: FormData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/blog`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to create blog post");
      }

      return response.json();
    } catch (error) {
      console.error("Blog Create Error:", error);
      throw error;
    }
  },

  // Update blog post (admin)
  update: async (id: string, formData: FormData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/blog/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to update blog post");
      }

      return response.json();
    } catch (error) {
      console.error("Blog Update Error:", error);
      throw error;
    }
  },

  // Delete blog post (admin)
  delete: (id: string) => {
    return apiCall(`/blog/${id}`, {
      method: "DELETE",
    });
  },

  // Publish blog post (admin)
  publish: (id: string) => {
    return apiCall(`/blog/${id}/publish`, {
      method: "PATCH",
    });
  },

  // Increment view count
  incrementView: (id: string) => {
    return apiCall(`/blog/${id}/view`, {
      method: "POST",
    });
  },
};

// =====================================================
// CONTACT API
// =====================================================
export const contactAPI = {
  // Submit contact form
  submit: (data: {
    name: string;
    email: string;
    phone: string;
    message: string;
  }) => {
    return apiCall("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

// =====================================================
// SUBSCRIPTION API
// =====================================================
export const subscriptionAPI = {
  // Subscribe to newsletter
  subscribe: (email: string) => {
    return apiCall("/subscription", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },
};

// =====================================================
// AUTH API
// =====================================================
export const authAPI = {
  // Login
  login: (email: string, password: string) => {
    return apiCall("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  // Register (for initial setup)
  register: (data: {
    email: string;
    password: string;
    name: string;
    role?: string;
  }) => {
    return apiCall("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Get current user
  getMe: (token: string) => {
    return apiCall("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

// =====================================================
// EXPORT ALL
// =====================================================
export default {
  course: courseAPI,
  formTemplate: formTemplateAPI,
  registration: registrationAPI,
  blog: blogAPI,
  contact: contactAPI,
  subscription: subscriptionAPI,
  auth: authAPI,
};
