'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push('/admin/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setIsSubmitting(true);
      await login(email, password);
      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-indigo-600 text-white mb-4">
            <span className="text-xl font-bold">Δ</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Portal</h1>
          <p className="text-gray-600">Delta Indonesia CMS</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@deltaindonesia.com"
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition disabled:bg-gray-50 disabled:text-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-3 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
            >
              {isSubmitting && <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>}
              <span>{isSubmitting ? 'Signing in...' : 'Sign In'}</span>
            </button>
          </form>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm font-medium text-blue-900 mb-2">Demo Credentials:</p>
            <p className="text-xs text-blue-700 mb-1">Email: admin@deltaindonesia.com</p>
            <p className="text-xs text-blue-700">Password: password123</p>
          </div>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          © 2025 Delta Indonesia. All rights reserved.
        </p>
      </div>
    </div>
  );
}
