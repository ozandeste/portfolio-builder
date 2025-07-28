import { useState } from 'react';
import PersonalInfo from './components/steps/PersonalInfo';
import Experience from './components/steps/Experience';
import Education from './components/steps/Education';
import Skills from './components/steps/Skills';
import Preview from './components/steps/Preview';
import PortfolioProvider from './components/PortfolioProvider';
import Navigation from './components/Navigation';


// Main App Component
function App() {
  const [currentStep, setCurrentStep] = useState(0);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfo />;
      case 1:
        return <Experience />;
      case 2:
        return <Education />;
      case 3:
        return <Skills />;
      case 4:
        return <Preview />;
      default:
        return <PersonalInfo />;
    }
  };

  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-gray-50">
        <Navigation currentStep={currentStep} setCurrentStep={setCurrentStep} />
        {renderCurrentStep()}
      </div>
    </PortfolioProvider>
  );
}

export default App;