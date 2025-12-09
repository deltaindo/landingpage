'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  BookOpen,
  Calendar,
  FileText,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import clsx from 'clsx';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { logout } = useAdminAuth();

  const menuItems = [
    { label: 'Dashboard', icon: BarChart3, href: '/admin/dashboard' },
    { label: 'Blogs', icon: BookOpen, href: '/admin/blogs' },
    { label: 'Courses', icon: FileText, href: '/admin/courses' },
    { label: 'Schedules', icon: Calendar, href: '/admin/schedules' },
    { label: 'Registrations', icon: Users, href: '/admin/registrations' },
    { label: 'Documents', icon: FileText, href: '/admin/documents' },
    { label: 'Form Templates', icon: FileText, href: '/admin/forms' },
    { label: 'Users', icon: Users, href: '/admin/users' },
    { label: 'Settings', icon: Settings, href: '/admin/settings' },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = '/admin/login';
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-indigo-900 to-indigo-800 text-white z-30 transition-transform duration-300 ease-in-out overflow-y-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-indigo-900">Δ</span>
            </div>
            <div>
              <h1 className="font-bold text-lg">Delta</h1>
              <p className="text-xs text-indigo-200">Admin</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link key={item.href} href={item.href}>
                  <a
                    className={clsx(
                      'flex items-center space-x-3 px-4 py-3 rounded-lg transition duration-200',
                      isActive
                        ? 'bg-white text-indigo-900 font-medium'
                        : 'text-indigo-100 hover:bg-indigo-700'
                    )}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </a>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-indigo-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-indigo-100 hover:bg-indigo-700 transition duration-200"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => (isOpen ? onClose : null)}
        className="fixed lg:hidden top-4 left-4 z-40 p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </>
  );
};
