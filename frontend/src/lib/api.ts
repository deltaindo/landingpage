import axios, { AxiosInstance, AxiosError } from 'axios';

// Improved API URL determination with better fallback logic
const getApiUrl = (): string => {
  // Environment variable takes priority (set in .env files)
  if (process.env.NEXT_PUBLIC_API_URL) {
    console.log('[API Client] Using env URL:', process.env.NEXT_PUBLIC_API_URL);
    return process.env.NEXT_PUBLIC_API_URL;
  }

  // Browser environment
  if (typeof window !== 'undefined') {
    const isDev = window.location.hostname === 'localhost' || 
                  window.location.hostname === '127.0.0.1' ||
                  window.location.hostname.includes('dev.');
    
    if (isDev) {
      console.log('[API Client] Development mode - using localhost');
      return 'http://localhost:5000/api';
    }
    
    // Production: use same domain with /api path
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const port = window.location.port ? `:${window.location.port}` : '';
    const url = `${protocol}//${hostname}${port}/api`;
    console.log('[API Client] Production mode - using:', url);
    return url;
  }

  // Server-side fallback
  console.log('[API Client] Server-side - using localhost');
  return 'http://localhost:5000/api';
};

const API_BASE_URL = getApiUrl();

// Enhanced response interface with proper error structure
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Array<{ field: string; message: string }>;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    showing: string;
  };
}

// User data interface
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'pic' | 'viewer';
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Improved API Client with better error handling
class ApiClient {
  private api: AxiosInstance;
  private token: string | null = null;
  private readonly TOKEN_KEY = 'admin_token';
  private readonly TOKEN_EXPIRE_KEY = 'admin_token_expire';
  private readonly TOKEN_EXPIRE_TIME = 7 * 24 * 60 * 60 * 1000; // 7 days

  constructor() {
    console.log('[API Client] Initializing with base URL:', API_BASE_URL);
    
    // Initialize axios instance with improved config
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 15000, // 15 second timeout
      withCredentials: true, // Enable credentials (cookies, auth headers)
    });

    // Load token from storage
    this.loadToken();

    // Request interceptor - attach token to headers
    this.api.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          console.log('[API Request] Token attached');
        }
        
        const method = config.method?.toUpperCase() || 'UNKNOWN';
        console.log(`[API Request] ${method} ${config.baseURL}${config.url}`);
        return config;
      },
      (error) => {
        console.error('[API Request Error]', error.message);
        return Promise.reject(error);
      }
    );

    // Response interceptor - handle errors and token expiration
    this.api.interceptors.response.use(
      (response) => {
        console.log('[API Response] Success:', response.config.url, response.status);
        return response;
      },
      (error: AxiosError<any>) => {
        const status = error.response?.status;
        const url = error.config?.url;
        const message = error.response?.data?.error || error.message;

        console.error('[API Response Error]', {
          url,
          status,
          message,
          code: error.code,
        });

        // Handle specific error cases
        if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
          console.error(
            '❌ Backend server unreachable at:',
            API_BASE_URL,
            '\nMake sure your backend is running: npm run dev'
          );
        }

        // Handle 401 Unauthorized - token expired or invalid
        if (status === 401) {
          console.warn('[API] Token expired or invalid, clearing storage');
          this.clearToken();
          if (typeof window !== 'undefined' && !window.location.pathname.includes('/admin/login')) {
            // Redirect to login on next render, don't force here
            window.localStorage.setItem('redirect_to_login', 'true');
          }
        }

        // Handle 403 Forbidden - insufficient permissions
        if (status === 403) {
          console.error('❌ Access forbidden - insufficient permissions');
        }

        // Handle 404 Not Found - endpoint doesn't exist
        if (status === 404) {
          console.error('❌ API endpoint not found:', url);
        }

        // Handle 422 Validation Error
        if (status === 422) {
          console.error('❌ Validation error:', error.response?.data?.errors);
        }

        // Handle 500 Server Error
        if (status === 500) {
          console.error('❌ Server error - check backend logs');
        }

        return Promise.reject(error);
      }
    );
  }

  /**
   * Load token from localStorage with expiration check
   */
  private loadToken(): void {
    if (typeof window === 'undefined') return;

    try {
      const token = localStorage.getItem(this.TOKEN_KEY);
      const expireTime = localStorage.getItem(this.TOKEN_EXPIRE_KEY);

      if (!token) return;

      // Check if token expired
      if (expireTime && new Date().getTime() > parseInt(expireTime)) {
        console.log('[API Client] Token expired, clearing storage');
        this.clearToken();
        return;
      }

      this.token = token;
      console.log('[API Client] Token loaded from storage');
    } catch (error) {
      console.error('[API Client] Error loading token:', error);
      this.clearToken();
    }
  }

  /**
   * Store token with expiration time
   */
  setToken(token: string): void {
    this.token = token;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(this.TOKEN_KEY, token);
        const expireTime = new Date().getTime() + this.TOKEN_EXPIRE_TIME;
        localStorage.setItem(this.TOKEN_EXPIRE_KEY, expireTime.toString());
        console.log('[API Client] Token stored with expiration');
      } catch (error) {
        console.error('[API Client] Error storing token:', error);
      }
    }
  }

  /**
   * Retrieve current token
   */
  getToken(): string | null {
    if (this.token) return this.token;
    
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(this.TOKEN_KEY);
      if (token) this.token = token;
      return token;
    }
    
    return null;
  }

  /**
   * Clear token from memory and storage
   */
  clearToken(): void {
    this.token = null;
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.TOKEN_EXPIRE_KEY);
        console.log('[API Client] Token cleared');
      } catch (error) {
        console.error('[API Client] Error clearing token:', error);
      }
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // ==================== AUTH ENDPOINTS ====================

  /**
   * Login with email and password
   */
  async login(email: string, password: string): Promise<ApiResponse<any>> {
    try {
      const { data } = await this.api.post('/auth/login', {
        email: email.toLowerCase().trim(),
        password,
      });
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get current user info from token
   */
  async getMe(): Promise<ApiResponse<AdminUser>> {
    try {
      const { data } = await this.api.get('/auth/me');
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Register new admin user (admin only)
   */
  async register(email: string, password: string, name: string, role: string = 'viewer'): Promise<ApiResponse<AdminUser>> {
    try {
      const { data } = await this.api.post('/auth/register', {
        email: email.toLowerCase().trim(),
        password,
        name: name.trim(),
        role,
      });
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // ==================== BLOG ENDPOINTS ====================

  async getBlogs(page = 1, limit = 10, search = ''): Promise<ApiResponse<any[]>> {
    try {
      const { data } = await this.api.get('/cms/admin/blogs', {
        params: { page, limit, search: search.trim() },
      });
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getBlogById(id: string): Promise<ApiResponse<any>> {
    try {
      const { data } = await this.api.get(`/cms/admin/blogs/${id}`);
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // ==================== COURSE ENDPOINTS ====================

  async getCourses(page = 1, limit = 10, search = '', category = ''): Promise<ApiResponse<any[]>> {
    try {
      const { data } = await this.api.get('/cms/admin/courses', {
        params: { page, limit, search: search.trim(), category },
      });
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getCourseById(id: string): Promise<ApiResponse<any>> {
    try {
      const { data } = await this.api.get(`/cms/admin/courses/${id}`);
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // ==================== SCHEDULE ENDPOINTS ====================

  async getSchedules(page = 1, limit = 10, courseId = '', status = ''): Promise<ApiResponse<any[]>> {
    try {
      const { data } = await this.api.get('/cms/admin/schedules', {
        params: { page, limit, courseId, status },
      });
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getScheduleById(id: string): Promise<ApiResponse<any>> {
    try {
      const { data } = await this.api.get(`/cms/admin/schedules/${id}`);
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // ==================== REGISTRATION ENDPOINTS ====================

  async getRegistrations(page = 1, limit = 10, status = '', search = ''): Promise<ApiResponse<any[]>> {
    try {
      const { data } = await this.api.get('/cms/admin/registrations', {
        params: { page, limit, status, search: search.trim() },
      });
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getRegistrationById(id: string): Promise<ApiResponse<any>> {
    try {
      const { data } = await this.api.get(`/cms/admin/registrations/${id}`);
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // ==================== DOCUMENT ENDPOINTS ====================

  async getRegistrationDocuments(page = 1, limit = 10, registrationId = ''): Promise<ApiResponse<any[]>> {
    try {
      const { data } = await this.api.get('/cms/admin/registration-documents', {
        params: { page, limit, registrationId },
      });
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // ==================== FORM ENDPOINTS ====================

  async getFormTemplates(page = 1, limit = 10, search = ''): Promise<ApiResponse<any[]>> {
    try {
      const { data } = await this.api.get('/cms/admin/form-templates', {
        params: { page, limit, search: search.trim() },
      });
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // ==================== USER ENDPOINTS ====================

  async getUsers(page = 1, limit = 10, search = '', role = ''): Promise<ApiResponse<any[]>> {
    try {
      const { data } = await this.api.get('/cms/admin/users', {
        params: { page, limit, search: search.trim(), role },
      });
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // ==================== DASHBOARD ENDPOINTS ====================

  async getDashboardStats(): Promise<ApiResponse<any>> {
    try {
      const { data } = await this.api.get('/cms/admin/stats');
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // ==================== ERROR HANDLING ====================

  /**
   * Centralized error handling
   */
  private handleError(error: any): Error {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const data = error.response?.data;
      const message = data?.error || data?.message || error.message;

      const err = new Error(message || 'An error occurred');
      Object.assign(err, { status, data });
      return err;
    }

    return error instanceof Error ? error : new Error('Unknown error occurred');
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
