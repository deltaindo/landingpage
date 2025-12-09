'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient } from '@/lib/api';
import toast from 'react-hot-toast';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'pic' | 'viewer';
}

interface AuthContextType {
  user: AdminUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = apiClient.getToken();
      if (!token) {
        setIsLoading(false);
        return;
      }

      const response = await apiClient.getMe();
      if (response.success && response.data) {
        setUser(response.data);
      } else {
        apiClient.clearToken();
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      apiClient.clearToken();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await apiClient.login(email, password);

      if (!response.success) {
        throw new Error(response.error || 'Login failed');
      }

      if (response.data?.token) {
        apiClient.setToken(response.data.token);
        setUser(response.data);
        toast.success('Login successful!');
      }
    } catch (error: any) {
      const message = error.response?.data?.error || error.message || 'Login failed';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    apiClient.clearToken();
    setUser(null);
    toast.success('Logged out successfully');
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
};
