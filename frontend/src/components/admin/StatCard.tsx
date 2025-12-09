'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number | string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: 'blue' | 'green' | 'red' | 'purple' | 'orange';
}

const colorClasses = {
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  red: 'bg-red-100 text-red-600',
  purple: 'bg-purple-100 text-purple-600',
  orange: 'bg-orange-100 text-orange-600',
};

export const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  label,
  value,
  trend,
  color,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p
              className={`text-sm mt-2 ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {trend.isPositive ? '+' : '-'}{trend.value}% from last month
            </p>
          )}
        </div>
        <div className={`p-4 rounded-lg ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};
