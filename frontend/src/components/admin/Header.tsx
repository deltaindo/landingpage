'use client';

import React from 'react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { LogOut, User, Bell } from 'lucide-react';
import toast from 'react-hot-toast';

interface HeaderProps {
  title: string;
  description?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, description }) => {
  const { user, logout } = useAdminAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/admin/login';
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
            <Bell size={20} />
          </button>

          {/* User Menu */}
          <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white">
              <User size={20} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
