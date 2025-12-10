'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api';
import toast from 'react-hot-toast';

/**
 * 🔐 Authentication Context
 * Unified auth context for the entire application
 * Uses the improved api.ts client with better error handling
 */

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'pic' | 'viewer';
  isActive?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  error: string | null;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Authentication Provider
 * Wraps the application to provide auth context
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  /**
   * Check authentication status on mount
   */
  useEffect(() => {
    checkAuth();
  }, []);

  /**
   * Verify if user has valid token and is authenticated
   */
  const checkAuth = async () => {
    try {
      setError(null);
      const token = apiClient.getToken();

      if (!token) {
        console.log('[Auth] No token found');
        setLoading(false);
        return;
      }

      console.log('[Auth] Token found, validating with backend...');
      const response = await apiClient.getMe();

      if (response.success && response.data) {
        setUser(response.data);
        console.log('[Auth] User authenticated:', response.data.email);
      } else {
        console.log('[Auth] Invalid token response, clearing storage');
        apiClient.clearToken();
        setUser(null);
      }
    } catch (error: any) {
      console.error('[Auth] Check auth failed:', error.message);
      apiClient.clearToken();
      setUser(null);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Login with email and password
   */
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setError(null);
      setLoading(true);

      // Validate inputs
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      if (!email.includes('@')) {
        throw new Error('Invalid email format');
      }

      console.log('[Auth] Attempting login for:', email);
      const response = await apiClient.login(email, password);

      if (!response.success) {
        throw new Error(response.error || 'Login failed');
      }

      if (!response.data?.token) {
        throw new Error('No token received from server');
      }

      // Store token and set user
      apiClient.setToken(response.data.token);
      setUser(response.data);

      console.log('[Auth] Login successful for:', email);
      toast.success('Login successful!');
    } catch (error: any) {
      const message =
        error.response?.data?.error ||
        error.message ||
        'Login failed. Please check your credentials.';

      setError(message);
      console.error('[Auth] Login error:', message);
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout and clear authentication
   */
  const logout = (): void => {
    try {
      apiClient.clearToken();
      setUser(null);
      setError(null);
      console.log('[Auth] Logged out');
      toast.success('Logged out successfully');
      router.push('/admin/login');
    } catch (error) {
      console.error('[Auth] Logout error:', error);
      toast.error('Error logging out');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
        error,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to use auth context
 * Must be used within AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
