import { useState } from "react";
import { usePortfolio } from "../../hooks/usePortfolio";
import { Plus, Trash2 } from "lucide-react";

// Skills Step
export default function Skills() {
  const { portfolioData, addItem, removeItem } = usePortfolio();
  const [newSkill, setNewSkill] = useState({ name: '', level: 'Intermediate' });
  const [error, setError] = useState('');

  const validateSkill = (name) => {
    if (!name.trim()) return 'Skill name is required';
    if (name.trim().length < 2) return 'Skill name must be at least 2 characters';
    if (portfolioData.skills.some(skill => skill.name.toLowerCase() === name.toLowerCase())) {
      return 'This skill has already been added';
    }
    return '';
  };

  const handleSubmit = () => {
    const validationError = validateSkill(newSkill.name);
    setError(validationError);
    
    if (!validationError) {
      addItem('skills', newSkill);
      setNewSkill({ name: '', level: 'Intermediate' });
      setError('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Skills</h2>
        
        <div className="mb-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Add Skill</h3>
          
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <input
                type="text"
                value={newSkill.name}
                onChange={(e) => {
                  setNewSkill(prev => ({ ...prev, name: e.target.value }));
                  if (error) setError(''); // Clear error as user types
                }}
                onKeyPress={handleKeyPress}
                placeholder="Skill name *"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  error ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
              )}
            </div>
            <select
              value={newSkill.level}
              onChange={(e) => setNewSkill(prev => ({ ...prev, level: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
            <button
              onClick={handleSubmit}
              disabled={!newSkill.name.trim()}
              className={`px-4 py-2 rounded-lg transition-colors ${
                newSkill.name.trim()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <div className="text-sm text-gray-600">
            <p>💡 <strong>Tip:</strong> Add both technical and soft skills. Examples:</p>
            <p className="mt-1">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mr-2">JavaScript</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs mr-2">Team Leadership</span>
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs mr-2">Problem Solving</span>
            </p>
          </div>
        </div>

        {/* Skills Summary */}
        {portfolioData.skills.length > 0 && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">
              Skills Summary ({portfolioData.skills.length} skills added)
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-medium">Expert:</span> {portfolioData.skills.filter(s => s.level === 'Expert').length}
              </div>
              <div>
                <span className="font-medium">Advanced:</span> {portfolioData.skills.filter(s => s.level === 'Advanced').length}
              </div>
              <div>
                <span className="font-medium">Intermediate:</span> {portfolioData.skills.filter(s => s.level === 'Intermediate').length}
              </div>
              <div>
                <span className="font-medium">Beginner:</span> {portfolioData.skills.filter(s => s.level === 'Beginner').length}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {portfolioData.skills.map((skill) => (
            <div key={skill.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <span className="font-medium text-gray-800">{skill.name}</span>
                <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                  skill.level === 'Expert' ? 'bg-green-100 text-green-800' :
                  skill.level === 'Advanced' ? 'bg-blue-100 text-blue-800' :
                  skill.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {skill.level}
                </span>
              </div>
              <button
                onClick={() => removeItem('skills', skill.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}