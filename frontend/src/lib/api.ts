import axios, { AxiosInstance, AxiosError } from 'axios';

// Use environment variable or fallback to localhost:3001
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

console.log('API Base URL:', API_BASE_URL);

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
        console.log('API Request:', config.method?.toUpperCase(), config.url);
        return config;
      },
      (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => {
        console.log('API Response:', response.status, response.config.url);
        return response;
      },
      (error: AxiosError) => {
        console.error('API Error:', {
          url: error.config?.url,
          status: error.response?.status,
          message: error.message,
          data: error.response?.data
        });
        
        if (error.response?.status === 401) {
          // Handle unauthorized
          if (typeof window !== 'undefined') {
            localStorage.removeItem('admin_token');
            window.location.href = '/admin/login';
          }
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
    try {
      const { data } = await this.api.post('/auth/login', { email, password });
      return data;
    } catch (error: any) {
      throw error;
    }
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
