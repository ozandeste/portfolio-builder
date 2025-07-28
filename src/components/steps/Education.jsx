import { useState } from "react";
import { usePortfolio } from "../../hooks/usePortfolio";
import { Plus, Trash2 } from "lucide-react";

// Education Step
export default function Education() {
  const { portfolioData, addItem, removeItem } = usePortfolio();
  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    field: '',
    graduationDate: '',
    gpa: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEducation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (newEducation.institution && newEducation.degree) {
      addItem('education', newEducation);
      setNewEducation({
        institution: '',
        degree: '',
        field: '',
        graduationDate: '',
        gpa: ''
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Education</h2>
        
        <div className="mb-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Add Education</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="institution"
              value={newEducation.institution}
              onChange={handleChange}
              placeholder="Institution Name *"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              name="degree"
              value={newEducation.degree}
              onChange={handleChange}
              placeholder="Degree *"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              name="field"
              value={newEducation.field}
              onChange={handleChange}
              placeholder="Field of Study"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="month"
              name="graduationDate"
              value={newEducation.graduationDate}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              name="gpa"
              value={newEducation.gpa}
              onChange={handleChange}
              placeholder="GPA (optional)"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <button
            onClick={handleSubmit}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Education
          </button>
        </div>

        <div className="space-y-4">
          {portfolioData.education.map((edu) => (
            <div key={edu.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{edu.degree}</h4>
                  <p className="text-blue-600">{edu.institution}</p>
                  {edu.field && <p className="text-gray-600">{edu.field}</p>}
                  <p className="text-sm text-gray-500">
                    {edu.graduationDate} {edu.gpa && `• GPA: ${edu.gpa}`}
                  </p>
                </div>
                <button
                  onClick={() => removeItem('education', edu.id)}
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