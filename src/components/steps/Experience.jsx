import { useState } from "react";
import { usePortfolio } from "../../hooks/usePortfolio";
import { Plus, Trash2 } from "lucide-react";

// Experience Step
export default function Experience() {
  const { portfolioData, addItem, removeItem } = usePortfolio();
  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateExperienceField = (name, value, formData) => {
    switch (name) {
      case 'company':
        if (!value.trim()) return 'Company name is required';
        if (value.trim().length < 2) return 'Company name must be at least 2 characters';
        break;
      case 'position':
        if (!value.trim()) return 'Job title is required';
        if (value.trim().length < 2) return 'Job title must be at least 2 characters';
        break;
      case 'startDate':
        if (!value) return 'Start date is required';
        if (formData.endDate && !formData.current && new Date(value) >= new Date(formData.endDate)) {
          return 'Start date must be before end date';
        }
        break;
      case 'endDate':
        if (!formData.current && !value) return 'End date is required (or mark as current position)';
        if (value && formData.startDate && new Date(value) <= new Date(formData.startDate)) {
          return 'End date must be after start date';
        }
        break;
      case 'description':
        if (value && value.length > 500) return 'Description should not exceed 500 characters';
        break;
      default:
        break;
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedData = {
      ...newExperience,
      [name]: type === 'checkbox' ? checked : value
    };
    
    // Clear end date if current is checked
    if (name === 'current' && checked) {
      updatedData.endDate = '';
    }
    
    setNewExperience(updatedData);

    // Validate the field
    const error = validateExperienceField(name, type === 'checkbox' ? checked : value, updatedData);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    // Also validate related fields
    if (name === 'startDate' || name === 'endDate' || name === 'current') {
      const endDateError = validateExperienceField('endDate', updatedData.endDate, updatedData);
      const startDateError = validateExperienceField('startDate', updatedData.startDate, updatedData);
      
      setErrors(prev => ({
        ...prev,
        endDate: endDateError,
        startDate: startDateError
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const handleSubmit = () => {
    // Validate all fields
    const validationErrors = {};
    Object.keys(newExperience).forEach(key => {
      const error = validateExperienceField(key, newExperience[key], newExperience);
      if (error) validationErrors[key] = error;
    });

    setErrors(validationErrors);
    setTouched({
      company: true,
      position: true,
      startDate: true,
      endDate: true,
      description: true
    });

    // Only add if no errors
    if (Object.keys(validationErrors).length === 0) {
      addItem('experience', newExperience);
      setNewExperience({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      });
      setErrors({});
      setTouched({});
    }
  };

  const isFormValid = () => {
    const requiredFields = ['company', 'position', 'startDate'];
    const hasRequiredFields = requiredFields.every(field => newExperience[field] && newExperience[field].trim());
    const hasEndDateOrCurrent = newExperience.current || newExperience.endDate;
    const hasNoErrors = Object.keys(errors).every(key => !errors[key]);
    
    return hasRequiredFields && hasEndDateOrCurrent && hasNoErrors;
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Work Experience</h2>
        
        {/* Add New Experience Section */}
        <div className="mb-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Add Experience</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <input
                type="text"
                name="company"
                value={newExperience.company}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Company Name *"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.company && touched.company 
                    ? 'border-red-500 bg-red-50' 
                    : newExperience.company && !errors.company 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-300'
                }`}
              />
              {errors.company && touched.company && (
                <p className="mt-1 text-sm text-red-600">{errors.company}</p>
              )}
            </div>
            
            <div>
              <input
                type="text"
                name="position"
                value={newExperience.position}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Job Title *"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.position && touched.position 
                    ? 'border-red-500 bg-red-50' 
                    : newExperience.position && !errors.position 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-300'
                }`}
              />
              {errors.position && touched.position && (
                <p className="mt-1 text-sm text-red-600">{errors.position}</p>
              )}
            </div>
            
            <div>
              <input
                type="month"
                name="startDate"
                value={newExperience.startDate}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.startDate && touched.startDate 
                    ? 'border-red-500 bg-red-50' 
                    : newExperience.startDate && !errors.startDate 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-300'
                }`}
              />
              <label className="block text-xs text-gray-500 mt-1">Start Date *</label>
              {errors.startDate && touched.startDate && (
                <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>
              )}
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-1">
                <input
                  type="month"
                  name="endDate"
                  value={newExperience.endDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={newExperience.current}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${
                    errors.endDate && touched.endDate 
                      ? 'border-red-500 bg-red-50' 
                      : newExperience.endDate && !errors.endDate 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-300'
                  }`}
                />
                <label className="block text-xs text-gray-500 mt-1">End Date</label>
                {errors.endDate && touched.endDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>
                )}
              </div>
              <label className="flex items-center mt-2">
                <input
                  type="checkbox"
                  name="current"
                  checked={newExperience.current}
                  onChange={handleChange}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Current Position</span>
              </label>
            </div>
          </div>
          
          <div className="mb-4">
            <textarea
              name="description"
              value={newExperience.description}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Describe your responsibilities and achievements..."
              rows={3}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.description && touched.description 
                  ? 'border-red-500 bg-red-50' 
                  : 'border-gray-300'
              }`}
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">
                {newExperience.description.length}/500 characters
              </span>
              {errors.description && touched.description && (
                <span className="text-sm text-red-600">{errors.description}</span>
              )}
            </div>
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={!isFormValid()}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors font-medium ${
              isFormValid()
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Experience
          </button>
          
          {!isFormValid() && (touched.company || touched.position || touched.startDate) && (
            <p className="mt-2 text-sm text-yellow-600">
              Please fill in all required fields correctly to add this experience.
            </p>
          )}
        </div>

        {/* Experience List */}
        <div className="space-y-4">
          {portfolioData.experience.map((exp) => (
            <div key={exp.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{exp.position}</h4>
                  <p className="text-blue-600">{exp.company}</p>
                  <p className="text-sm text-gray-500">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                  {exp.description && (
                    <p className="mt-2 text-gray-600 text-sm">{exp.description}</p>
                  )}
                </div>
                <button
                  onClick={() => removeItem('experience', exp.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}