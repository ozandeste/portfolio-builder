import { useState } from "react";
import { usePortfolio } from "../../hooks/usePortfolio";

// Personal Information Step
export default function PersonalInfo() {
  const { portfolioData, updateSection } = usePortfolio();
  const [formData, setFormData] = useState(portfolioData.personal);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Full name must be at least 2 characters';
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'Full name can only contain letters and spaces';
        break;
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        break;
      case 'phone':
        if (value && !/^[\+\-\s\(\)\d]+$/.test(value)) return 'Please enter a valid phone number';
        break;
      case 'website':
        if (value && !/^https?:\/\/.+\..+/.test(value)) return 'Please enter a valid URL (including http:// or https://)';
        break;
      case 'linkedIn':
        if (value && !/^https?:\/\/(www\.)?linkedin\.com\/in\/.+/.test(value)) return 'Please enter a valid LinkedIn URL';
        break;
      case 'summary':
        if (!value.trim()) return 'Professional summary is required';
        if (value.trim().length < 50) return 'Professional summary should be at least 50 characters';
        if (value.trim().length > 500) return 'Professional summary should not exceed 500 characters';
        break;
      default:
        break;
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    updateSection('personal', updatedData);

    // Validate field
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const isFormValid = () => {
    const requiredFields = ['fullName', 'email', 'summary'];
    return requiredFields.every(field => 
      formData[field] && formData[field].trim() && !errors[field]
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.fullName && touched.fullName 
                  ? 'border-red-500 bg-red-50' 
                  : formData.fullName && !errors.fullName 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-300'
              }`}
              placeholder="John Doe"
            />
            {errors.fullName && touched.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.email && touched.email 
                  ? 'border-red-500 bg-red-50' 
                  : formData.email && !errors.email 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-300'
              }`}
              placeholder="john@example.com"
            />
            {errors.email && touched.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.phone && touched.phone 
                  ? 'border-red-500 bg-red-50' 
                  : formData.phone && !errors.phone 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-300'
              }`}
              placeholder="+1 (555) 123-4567"
            />
            {errors.phone && touched.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="New York, NY"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website
            </label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.website && touched.website 
                  ? 'border-red-500 bg-red-50' 
                  : formData.website && !errors.website 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-300'
              }`}
              placeholder="https://johndoe.com"
            />
            {errors.website && touched.website && (
              <p className="mt-1 text-sm text-red-600">{errors.website}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              LinkedIn
            </label>
            <input
              type="url"
              name="linkedIn"
              value={formData.linkedIn}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.linkedIn && touched.linkedIn 
                  ? 'border-red-500 bg-red-50' 
                  : formData.linkedIn && !errors.linkedIn 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-300'
              }`}
              placeholder="https://linkedin.com/in/johndoe"
            />
            {errors.linkedIn && touched.linkedIn && (
              <p className="mt-1 text-sm text-red-600">{errors.linkedIn}</p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Professional Summary * 
            <span className="text-sm text-gray-500">({formData.summary.length}/500 characters)</span>
          </label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={4}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.summary && touched.summary 
                ? 'border-red-500 bg-red-50' 
                : formData.summary && !errors.summary 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-300'
            }`}
            placeholder="Write a brief professional summary highlighting your key skills and experience..."
          />
          {errors.summary && touched.summary && (
            <p className="mt-1 text-sm text-red-600">{errors.summary}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            Write a compelling summary that highlights your key skills, experience, and career objectives.
          </p>
        </div>

        {/* Form Validation Status */}
        <div className="mt-8 p-4 rounded-lg border-2 border-dashed">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              Form Completion Status:
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              isFormValid() 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {isFormValid() ? 'Complete ✓' : 'Incomplete'}
            </span>
          </div>
          {!isFormValid() && (
            <p className="mt-2 text-sm text-gray-600">
              Please fill in all required fields (marked with *) to continue.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}