'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Header } from '@/components/admin/Header';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import toast from 'react-hot-toast';
import { Save, Lock, Bell, Database } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAdminAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    siteName: 'Delta Indonesia',
    adminEmail: user?.email || '',
  });

  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <AdminLayout>
      <Header title="Settings" description="Manage system configuration" />

      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl">
          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200 flex space-x-8">
            <button
              onClick={() => setActiveTab('general')}
              className={`py-4 px-2 border-b-2 font-medium transition ${
                activeTab === 'general'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              General
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`py-4 px-2 border-b-2 font-medium transition ${
                activeTab === 'security'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Security
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`py-4 px-2 border-b-2 font-medium transition ${
                activeTab === 'notifications'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Notifications
            </button>
          </div>

          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <Database size={20} />
                <span>General Configuration</span>
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Name
                  </label>
                  <input
                    type="text"
                    value={formData.siteName}
                    onChange={(e) =>
                      setFormData({ ...formData, siteName: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    API URL
                  </label>
                  <input
                    type="url"
                    value={formData.apiUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, apiUrl: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Base URL for API requests
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    <Save size={18} />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <Lock size={20} />
                <span>Security Settings</span>
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Change Password
                  </label>
                  <div className="space-y-3">
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-4">
                    Two-Factor Authentication (2FA)
                  </p>
                  <button className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition">
                    Enable 2FA
                  </button>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    <Save size={18} />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <Bell size={20} />
                <span>Notification Preferences</span>
              </h3>

              <div className="space-y-4">
                {[
                  'New Registrations',
                  'Course Updates',
                  'System Alerts',
                  'Daily Summary',
                ].map((item) => (
                  <div key={item} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <label className="text-sm font-medium text-gray-700">
                      {item}
                    </label>
                    <input
                      type="checkbox"
                      defaultChecked={true}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  <Save size={18} />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </AdminLayout>
  );
}
