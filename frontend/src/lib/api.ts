import axios, { AxiosInstance, AxiosError } from 'axios';

// Get API URL from environment or detect from window location
const getApiUrl = (): string => {
  // Use env variable if available
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // In browser, detect from location
  if (typeof window !== 'undefined') {
    const protocol = window.location.protocol;
    const host = window.location.host;
    
    // If on localhost, use localhost backend
    if (host.includes('localhost') || host.includes('127.0.0.1')) {
      return 'http://localhost:5000/api';
    }
    
    // If on dev domain, use dev backend
    if (host.includes('dev-landing.deltaindo.co.id')) {
      return 'https://api-dev.deltaindo.co.id/api';
    }
    
    // If on production domain, use production backend
    if (host.includes('landing.deltaindo.co.id')) {
      return 'https://api.deltaindo.co.id/api';
    }
    
    // Default to localhost for development
    return 'http://localhost:5000/api';
  }
  
  // Server-side fallback
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
};

const API_BASE_URL = getApiUrl();

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    showing: string;
  };
}

class ApiClient {
  private api: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10 second timeout
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('[API Request]', config.method?.toUpperCase(), `${API_BASE_URL}${config.url}`);
        return config;
      },
      (error) => {
        console.error('[API Request Error]', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => {
        console.log('[API Response]', response.config.url, response.status);
        return response;
      },
      (error: AxiosError) => {
        console.error('[API Response Error]', error.config?.url, error.message, error.code);
        
        if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
          console.error('❌ Backend server is not running or not reachable at:', API_BASE_URL);
          console.error('Make sure backend is running on port 5000');
        }
        
        if (error.response?.status === 401) {
          // Handle unauthorized
          if (typeof window !== 'undefined') {
            localStorage.removeItem('admin_token');
            if (!window.location.pathname.includes('/admin/login')) {
              window.location.href = '/admin/login';
            }
          }
        }
        
        // Log CORS errors
        if (error.message.includes('CORS') || error.message.includes('blocked')) {
          console.error('❌ CORS Error: Backend needs to allow requests from', window.location.origin);
        }
        
        return Promise.reject(error);
      }
    );
  }

  setToken(token: string): void {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_token', token);
    }
  }

  getToken(): string | null {
    if (this.token) return this.token;
    if (typeof window !== 'undefined') {
      return localStorage.getItem('admin_token');
    }
    return null;
  }

  clearToken(): void {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
    }
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<ApiResponse<any>> {
    const { data } = await this.api.post('/auth/login', { email, password });
    return data;
  }

  async getMe(): Promise<ApiResponse<any>> {
    const { data } = await this.api.get('/auth/me');
    return data;
  }

  // CMS Admin endpoints
  async getBlogs(page = 1, limit = 10, search = ''): Promise<ApiResponse<any[]>> {
    const { data } = await this.api.get('/cms/admin/blogs', {
      params: { page, limit, search },
    });
    return data;
  }

  async getBlogById(id: string): Promise<ApiResponse<any>> {
    const { data } = await this.api.get(`/cms/admin/blogs/${id}`);
    return data;
  }

  async getCourses(page = 1, limit = 10, search = '', category = ''): Promise<ApiResponse<any[]>> {
    const { data } = await this.api.get('/cms/admin/courses', {
      params: { page, limit, search, category },
    });
    return data;
  }

  async getCourseById(id: string): Promise<ApiResponse<any>> {
    const { data } = await this.api.get(`/cms/admin/courses/${id}`);
    return data;
  }

  async getSchedules(page = 1, limit = 10, courseId = '', status = ''): Promise<ApiResponse<any[]>> {
    const { data } = await this.api.get('/cms/admin/schedules', {
      params: { page, limit, courseId, status },
    });
    return data;
  }

  async getScheduleById(id: string): Promise<ApiResponse<any>> {
    const { data } = await this.api.get(`/cms/admin/schedules/${id}`);
    return data;
  }

  async getRegistrations(page = 1, limit = 10, status = '', search = ''): Promise<ApiResponse<any[]>> {
    const { data } = await this.api.get('/cms/admin/registrations', {
      params: { page, limit, status, search },
    });
    return data;
  }

  async getRegistrationById(id: string): Promise<ApiResponse<any>> {
    const { data } = await this.api.get(`/cms/admin/registrations/${id}`);
    return data;
  }

  async getRegistrationDocuments(page = 1, limit = 10, registrationId = ''): Promise<ApiResponse<any[]>> {
    const { data } = await this.api.get('/cms/admin/registration-documents', {
      params: { page, limit, registrationId },
    });
    return data;
  }

  async getFormTemplates(page = 1, limit = 10, search = ''): Promise<ApiResponse<any[]>> {
    const { data } = await this.api.get('/cms/admin/form-templates', {
      params: { page, limit, search },
    });
    return data;
  }

  async getUsers(page = 1, limit = 10, search = '', role = ''): Promise<ApiResponse<any[]>> {
    const { data } = await this.api.get('/cms/admin/users', {
      params: { page, limit, search, role },
    });
    return data;
  }

  async getDashboardStats(): Promise<ApiResponse<any>> {
    const { data } = await this.api.get('/cms/admin/stats');
    return data;
  }
}

export const apiClient = new ApiClient();
