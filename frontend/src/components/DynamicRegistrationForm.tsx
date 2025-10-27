'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { registrationAPI, formTemplateAPI } from '@/lib/api';

interface Field {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  options?: string[];
  validation: {
    required: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
  gridColumn: 'full' | 'half' | 'third';
  conditional?: {
    dependsOn: string;
    showWhen: string;
  };
}

interface Section {
  title: string;
  description?: string;
  fields: Field[];
}

interface FormTemplate {
  id: string;
  name: string;
  description?: string;
  sections: Section[];
}

interface DynamicRegistrationFormProps {
  courseId: string;
  scheduleIndex: number;
  templateId?: string;
}

export default function DynamicRegistrationForm({
  courseId,
  scheduleIndex,
  templateId,
}: DynamicRegistrationFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [template, setTemplate] = useState<FormTemplate | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<Record<string, File>>({});

  useEffect(() => {
    fetchTemplate();
  }, [templateId]);

  const fetchTemplate = async () => {
    try {
      const response = templateId
        ? await formTemplateAPI.getById(templateId)
        : await formTemplateAPI.getDefault();
      setTemplate(response.data);
    } catch (error) {
      console.error('Error fetching template:', error);
    }
  };

  const handleChange = (fieldName: string, value: any) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
    // Clear error when field is changed
    if (errors[fieldName]) {
      setErrors({
        ...errors,
        [fieldName]: '',
      });
    }
  };

  const handleFileChange = (fieldName: string, file: File) => {
    setFiles({
      ...files,
      [fieldName]: file,
    });
  };

  const validateField = (field: Field): string | null => {
    const value = formData[field.name];
    const { validation } = field;

    if (validation.required && !value) {
      return validation.message || `${field.label} is required`;
    }

    if (value && typeof value === 'string') {
      if (validation.minLength && value.length < validation.minLength) {
        return `${field.label} must be at least ${validation.minLength} characters`;
      }
      if (validation.maxLength && value.length > validation.maxLength) {
        return `${field.label} must be at most ${validation.maxLength} characters`;
      }
      if (validation.pattern && !new RegExp(validation.pattern).test(value)) {
        return validation.message || `${field.label} format is invalid`;
      }
    }

    if (value && typeof value === 'number') {
      if (validation.min !== undefined && value < validation.min) {
        return `${field.label} must be at least ${validation.min}`;
      }
      if (validation.max !== undefined && value > validation.max) {
        return `${field.label} must be at most ${validation.max}`;
      }
    }

    return null;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    template?.sections.forEach((section) => {
      section.fields.forEach((field) => {
        // Check conditional visibility
        if (field.conditional) {
          const dependentValue = formData[field.conditional.dependsOn];
          if (dependentValue !== field.conditional.showWhen) {
            return; // Skip validation for hidden fields
          }
        }

        const error = validateField(field);
        if (error) {
          newErrors[field.name] = error;
          isValid = false;
        }
      });
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('courseId', courseId);
      formDataToSend.append('scheduleIndex', scheduleIndex.toString());
      formDataToSend.append('formData', JSON.stringify(formData));

      // Append files
      Object.entries(files).forEach(([key, file]) => {
        formDataToSend.append('documents', file, key);
      });

      const response = await registrationAPI.create(formDataToSend);

      // Show success message
      alert(`Registration successful! Your registration number is: ${response.data.registrationNumber}`);
      router.push('/');
    } catch (error: any) {
      console.error('Error submitting registration:', error);
      alert(error.message || 'Error submitting registration');
    } finally {
      setLoading(false);
    }
  };

  const shouldShowField = (field: Field): boolean => {
    if (!field.conditional) return true;
    const dependentValue = formData[field.conditional.dependsOn];
    return dependentValue === field.conditional.showWhen;
  };

  const renderField = (field: Field) => {
    if (!shouldShowField(field)) return null;

    const baseClasses = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent";
    const errorClasses = errors[field.name] ? "border-red-500" : "";

    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'number':
      case 'date':
        return (
          <div key={field.name} className={getGridClass(field.gridColumn)}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {field.label}
              {field.validation.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type={field.type}
              value={formData[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              className={`${baseClasses} ${errorClasses}`}
            />
            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
            )}
          </div>
        );

      case 'textarea':
        return (
          <div key={field.name} className={getGridClass(field.gridColumn)}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {field.label}
              {field.validation.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <textarea
              value={formData[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              rows={4}
              className={`${baseClasses} ${errorClasses} resize-none`}
            />
            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
            )}
          </div>
        );

      case 'select':
        return (
          <div key={field.name} className={getGridClass(field.gridColumn)}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {field.label}
              {field.validation.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select
              value={formData[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className={`${baseClasses} ${errorClasses}`}
            >
              <option value="">Select {field.label}</option>
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
            )}
          </div>
        );

      case 'radio':
        return (
          <div key={field.name} className={getGridClass(field.gridColumn)}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {field.label}
              {field.validation.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="space-y-2">
              {field.options?.map((option) => (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={field.name}
                    value={option}
                    checked={formData[field.name] === option}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
            )}
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.name} className={getGridClass(field.gridColumn)}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {field.label}
              {field.validation.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="space-y-2">
              {field.options?.map((option) => (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={option}
                    checked={(formData[field.name] || []).includes(option)}
                    onChange={(e) => {
                      const currentValues = formData[field.name] || [];
                      const newValues = e.target.checked
                        ? [...currentValues, option]
                        : currentValues.filter((v: string) => v !== option);
                      handleChange(field.name, newValues);
                    }}
                    className="w-4 h-4 text-primary focus:ring-primary rounded"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
            )}
          </div>
        );

      case 'file':
        return (
          <div key={field.name} className={getGridClass(field.gridColumn)}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {field.label}
              {field.validation.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.;
                if (file) handleFileChange(field.name, file);
              }}
              className={`${baseClasses} ${errorClasses}`}
            />
            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const getGridClass = (gridColumn: string): string => {
    switch (gridColumn) {
      case 'half':
        return 'md:col-span-6';
      case 'third':
        return 'md:col-span-4';
      case 'full':
      default:
        return 'md:col-span-12';
    }
  };

  if (!template) {
    return <div className="p-12 text-center text-gray-500">Loading form...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {template.sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-dark mb-2">{section.title}</h3>
          {section.description && (
            <p className="text-gray-600 mb-6">{section.description}</p>
          )}
          <div className="grid grid-cols-12 gap-6">
            {section.fields.map(renderField)}
          </div>
        </div>
      ))}

      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Submitting...' : 'Submit Registration'}
        </button>
      </div>
    </form>
  );
}
