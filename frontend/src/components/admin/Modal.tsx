'use client';

import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  children,
  onClose,
  footer,
  size = 'md',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`bg-white rounded-lg shadow-xl w-full mx-4 ${sizeClasses[size]}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="p-6 border-t border-gray-200 flex items-center justify-end space-x-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
