'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient, AdminUser } from '@/lib/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: AdminUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Admin Authentication Provider
 * Manages user authentication state and provides auth methods
 */
export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Check authentication status on mount
   */
  useEffect(() => {
    checkAuth();
  }, []);

  /**
   * Check if user is authenticated and load user data
   */
  const checkAuth = async (): Promise<void> => {
    try {
      setError(null);
      const token = apiClient.getToken();

      if (!token) {
        console.log('[Auth] No token found');
        setIsLoading(false);
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
      // Don't show error toast during auto-check
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Login with email and password
   */
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setError(null);
      setIsLoading(true);

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
      setIsLoading(false);
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
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        checkAuth,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook to use admin auth context
 * Must be used within AdminAuthProvider
 */
export const useAdminAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
};
