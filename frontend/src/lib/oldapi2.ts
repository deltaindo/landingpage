/**
 * API Client with WireGuard VPN-Enhanced SSO Support
 *
 * WireGuard VPN Integration Points:
 * 1. When VPN is active, all API calls route through VPN gateway
 * 2. SSO token validation happens over encrypted VPN tunnel
 * 3. Certificate-based authentication can be added for VPN clients
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "/api";
const USE_VPN_TUNNEL = process.env.NEXT_PUBLIC_USE_VPN_TUNNEL === "true";
const VPN_GATEWAY_URL = process.env.NEXT_PUBLIC_VPN_GATEWAY_URL;
const SSO_ENABLED = process.env.NEXT_PUBLIC_SSO_ENABLED === "true";

interface RequestConfig extends RequestInit {
  requiresAuth?: boolean;
}

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private baseURL: string;

  constructor() {
    // 🔐 WireGuard VPN: When VPN is active, route through VPN gateway
    this.baseURL =
      USE_VPN_TUNNEL && VPN_GATEWAY_URL
        ? VPN_GATEWAY_URL + "/api"
        : API_BASE_URL;

    console.log(`API Client initialized: ${this.baseURL}`);
    if (USE_VPN_TUNNEL) {
      console.log("🔒 WireGuard VPN tunnel active");
    }
  }

  private getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("authToken");
  }

  /**
   * 🔐 WireGuard VPN Enhancement:
   * When VPN is active, this can include client certificate validation
   * Add X-VPN-Client-Cert header for mutual TLS authentication
   */
  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const { requiresAuth = true, ...options } = config;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    // Add auth token if required
    if (requiresAuth) {
      const token = this.getToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    // 🔐 WireGuard VPN: Add VPN-specific headers when tunnel is active
    if (USE_VPN_TUNNEL) {
      headers["X-VPN-Tunnel"] = "true";
      // TODO: Add client certificate fingerprint when implementing mutual TLS
      // headers['X-VPN-Client-Cert'] = await this.getClientCertFingerprint();
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired or invalid
          this.handleAuthError();
        }
        const error = await response
          .json()
          .catch(() => ({ error: "Request failed" }));
        throw new Error(error.error || `HTTP ${response.status}`);
      }

      return response.json();
    } catch (error: any) {
      console.error("API Request failed:", error);
      throw error;
    }
  }

  private handleAuthError() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      // If SSO is enabled, redirect to SSO logout
      if (SSO_ENABLED) {
        this.logoutSSO();
      } else {
        window.location.href = "/admin/login";
      }
    }
  }

  /**
   * 🔐 SSO Authentication Methods
   */

  // Standard login (bypassed when SSO is enabled)
  async login(email: string, password: string): Promise<ApiResponse> {
    if (SSO_ENABLED) {
      throw new Error("Direct login disabled. Please use SSO.");
    }

    return this.request("/auth/login", {
      method: "POST",
      requiresAuth: false,
      body: JSON.stringify({ email, password }),
    });
  }

  /**
   * 🔐 WireGuard VPN + SSO: Validate SSO token through VPN tunnel
   * This provides end-to-end encryption for token validation
   *
   * @param ssoToken - Token received from SSO provider
   */
  async validateSSOToken(ssoToken: string): Promise<ApiResponse> {
    return this.request("/auth/sso/validate", {
      method: "POST",
      requiresAuth: false,
      body: JSON.stringify({ token: ssoToken }),
      headers: {
        // 🔐 WireGuard VPN: Mark as SSO validation request
        "X-SSO-Validation": "true",
      },
    });
  }

  /**
   * 🔐 SSO Logout: Clear session on SSO provider
   */
  logoutSSO() {
    if (typeof window !== "undefined") {
      const ssoProviderUrl = process.env.NEXT_PUBLIC_SSO_PROVIDER_URL;
      const callbackUrl = encodeURIComponent(
        window.location.origin + "/admin/login"
      );
      window.location.href = `${ssoProviderUrl}/logout?redirect=${callbackUrl}`;
    }
  }

  // Standard logout
  logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      if (SSO_ENABLED) {
        this.logoutSSO();
      }
    }
  }

  // Get current user
  async getCurrentUser(): Promise<ApiResponse> {
    return this.request("/auth/me");
  }

  /**
   * Blog API Methods
   */

  async getBlogs(params?: Record<string, any>): Promise<ApiResponse> {
    const query = params ? `?${new URLSearchParams(params).toString()}` : "";
    return this.request(`/blogs${query}`, { requiresAuth: false });
  }

  async getBlog(id: string): Promise<ApiResponse> {
    return this.request(`/blogs/${id}`);
  }

  async createBlog(data: any): Promise<ApiResponse> {
    return this.request("/blogs", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateBlog(id: string, data: any): Promise<ApiResponse> {
    return this.request(`/blogs/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteBlog(id: string): Promise<ApiResponse> {
    return this.request(`/blogs/${id}`, {
      method: "DELETE",
    });
  }

  async bulkPublishBlogs(ids: string[]): Promise<ApiResponse> {
    return this.request("/blogs/bulk/publish", {
      method: "POST",
      body: JSON.stringify({ ids }),
    });
  }

  async bulkDeleteBlogs(ids: string[]): Promise<ApiResponse> {
    return this.request("/blogs/bulk/delete", {
      method: "POST",
      body: JSON.stringify({ ids }),
    });
  }

  async scheduleBlog(id: string, scheduledAt: string): Promise<ApiResponse> {
    return this.request(`/blogs/${id}/schedule`, {
      method: "PATCH",
      body: JSON.stringify({ scheduledAt }),
    });
  }

  async duplicateBlog(id: string): Promise<ApiResponse> {
    return this.request(`/blogs/${id}/duplicate`, {
      method: "POST",
    });
  }

  async getBlogStats(): Promise<ApiResponse> {
    return this.request("/blogs/stats/overview");
  }

  /**
   * Category API Methods
   */

  async getCategories(): Promise<ApiResponse> {
    return this.request("/categories", { requiresAuth: false });
  }

  async createCategory(data: any): Promise<ApiResponse> {
    return this.request("/categories", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateCategory(id: string, data: any): Promise<ApiResponse> {
    return this.request(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteCategory(id: string): Promise<ApiResponse> {
    return this.request(`/categories/${id}`, {
      method: "DELETE",
    });
  }

  /**
   * Tag API Methods
   */

  async getTags(): Promise<ApiResponse> {
    return this.request("/tags", { requiresAuth: false });
  }

  async createTag(data: any): Promise<ApiResponse> {
    return this.request("/tags", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async bulkCreateTags(tags: string[]): Promise<ApiResponse> {
    return this.request("/tags/bulk", {
      method: "POST",
      body: JSON.stringify({ tags }),
    });
  }

  /**
   * Media API Methods
   */

  async getMedia(params?: Record<string, any>): Promise<ApiResponse> {
    const query = params ? `?${new URLSearchParams(params).toString()}` : "";
    return this.request(`/media${query}`);
  }

  async uploadMedia(
    file: File,
    metadata?: { alt?: string; caption?: string }
  ): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append("file", file);
    if (metadata?.alt) formData.append("alt", metadata.alt);
    if (metadata?.caption) formData.append("caption", metadata.caption);

    const token = this.getToken();
    const headers: HeadersInit = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;

    // 🔐 WireGuard VPN: Add VPN headers for file upload
    if (USE_VPN_TUNNEL) {
      headers["X-VPN-Tunnel"] = "true";
    }

    const response = await fetch(`${this.baseURL}/media`, {
      method: "POST",
      headers,
      body: formData,
    });

    if (!response.ok) throw new Error("Upload failed");
    return response.json();
  }

  async updateMedia(
    id: string,
    data: { alt?: string; caption?: string }
  ): Promise<ApiResponse> {
    return this.request(`/media/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteMedia(id: string): Promise<ApiResponse> {
    return this.request(`/media/${id}`, {
      method: "DELETE",
    });
  }
}

export const api = new ApiClient();
