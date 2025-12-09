'use client';

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { ProtectedRoute } from './ProtectedRoute';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-100">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
          {children}
        </div>
      </div>
    </ProtectedRoute>
  );
};
