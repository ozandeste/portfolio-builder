import { useState } from "react";
import { PortfolioContext } from "../context/PortfolioContext";

// Initial portfolio data structure
const initialPortfolioData = {
  personal: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedIn: '',
    summary: ''
  },
  experience: [],
  education: [],
  skills: [],
  projects: []
};

// Portfolio Provider Component
export default function PortfolioProvider({ children }) {
  const [portfolioData, setPortfolioData] = useState(initialPortfolioData);

  const updateSection = (section, data) => {
    setPortfolioData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const addItem = (section, item) => {
    setPortfolioData(prev => ({
      ...prev,
      [section]: [...prev[section], { ...item, id: Date.now() }]
    }));
  };

  const removeItem = (section, id) => {
    setPortfolioData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  };

  return (
    <PortfolioContext.Provider value={{
      portfolioData,
      updateSection,
      addItem,
      removeItem
    }}>
      {children}
    </PortfolioContext.Provider>
  );
}