import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Code,
  Eye,
  GraduationCap,
  User,
} from "lucide-react";
import { usePortfolio } from "../hooks/usePortfolio";

// Navigation Component
export default function Navigation({ currentStep, setCurrentStep }) {
  const { portfolioData } = usePortfolio();

  const steps = [
    { id: 0, label: 'Personal Info', icon: User },
    { id: 1, label: 'Experience', icon: Briefcase },
    { id: 2, label: 'Education', icon: GraduationCap },
    { id: 3, label: 'Skills', icon: Code },
    { id: 4, label: 'Preview', icon: Eye }
  ];

  const validateStep = (stepIndex) => {
    const personal = portfolioData.personal;
    switch (stepIndex) {
      case 0: // Personal Info
        return personal.fullName && 
               personal.email && 
               personal.summary && 
               personal.fullName.length >= 2 && 
               /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personal.email) &&
               personal.summary.length >= 50;
      case 1: // Experience
        return portfolioData.experience.length > 0;
      case 2: // Education
        return portfolioData.education.length > 0;
      case 3: // Skills
        return portfolioData.skills.length > 0;
      default:
        return true;
    }
  };

  const getStepStatus = (stepIndex) => {
    if (stepIndex < currentStep) {
      return validateStep(stepIndex) ? 'completed' : 'incomplete';
    } else if (stepIndex === currentStep) {
      return 'active';
    } else {
      return 'upcoming';
    }
  };

  const canNavigateToStep = (stepIndex) => {
    if (stepIndex <= currentStep) return true;
    
    // Check if all previous steps are valid
    for (let i = 0; i < stepIndex; i++) {
      if (!validateStep(i)) return false;
    }
    return true;
  };

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      const isCurrentStepValid = validateStep(currentStep);
      if (isCurrentStepValid) {
        setCurrentStep(currentStep + 1);
      } else {
        alert('Please complete all required fields in the current step before proceeding.');
      }
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex) => {
    if (canNavigateToStep(stepIndex)) {
      setCurrentStep(stepIndex);
    } else {
      alert('Please complete the previous steps before accessing this section.');
    }
  };

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Portfolio Builder</h1>
          <div className="text-sm text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>

        {/* Step Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={goToPrevStep}
            disabled={currentStep === 0}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </button>

          <div className="flex space-x-2">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const status = getStepStatus(index);
              const canAccess = canNavigateToStep(index);
              
              return (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(index)}
                  disabled={!canAccess}
                  className={`p-2 rounded-lg transition-colors relative ${
                    status === 'active' 
                      ? 'bg-blue-600 text-white' 
                      : status === 'completed' 
                        ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                        : status === 'incomplete'
                          ? 'bg-red-100 text-red-600'
                          : canAccess
                            ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                  title={
                    status === 'completed' ? `${step.label} - Completed` :
                    status === 'incomplete' ? `${step.label} - Incomplete` :
                    !canAccess ? `${step.label} - Complete previous steps first` :
                    step.label
                  }
                >
                  <Icon className="w-5 h-5" />
                  {status === 'completed' && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
                  )}
                  {status === 'incomplete' && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={goToNextStep}
            disabled={currentStep === steps.length - 1 || !validateStep(currentStep)}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              currentStep === steps.length - 1 || !validateStep(currentStep)
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>

        {/* Validation Warning */}
        {!validateStep(currentStep) && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              ⚠️ Please complete all required fields in this section to proceed to the next step.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}