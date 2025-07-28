import { Download } from "lucide-react";
import { usePortfolio } from "../../hooks/usePortfolio";
import { useRef, useState } from "react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

// Preview Step
export default function Preview() {
  const { portfolioData } = usePortfolio();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const portfolioRef = useRef();

  const getValidationSummary = () => {
    const issues = [];
    
    // Personal Info validation
    if (!portfolioData.personal.fullName) issues.push("Personal: Full name is missing");
    if (!portfolioData.personal.email) issues.push("Personal: Email is missing");
    if (!portfolioData.personal.summary) issues.push("Personal: Professional summary is missing");
    if (portfolioData.personal.summary && portfolioData.personal.summary.length < 50) {
      issues.push("Personal: Professional summary is too short (minimum 50 characters)");
    }
    
    // Experience validation
    if (portfolioData.experience.length === 0) issues.push("Experience: At least one work experience is required");
    
    // Education validation
    if (portfolioData.education.length === 0) issues.push("Education: At least one education entry is required");
    
    // Skills validation
    if (portfolioData.skills.length === 0) issues.push("Skills: At least one skill is required");
    if (portfolioData.skills.length < 3) issues.push("Skills: Consider adding more skills (recommended: 5+ skills)");
    
    return issues;
  };

  const validationIssues = getValidationSummary();
  const isPortfolioComplete = validationIssues.length === 0;

  const generatePDF = async () => {
    setIsGeneratingPDF(true);
    
    try {
      // Get the portfolio element
      const element = portfolioRef.current;
      
      // Create a temporary clone to modify colors
      const clone = element.cloneNode(true);
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      clone.style.top = '0';
      
      // Temporarily add clone to document
      document.body.appendChild(clone);
      
      // Configure html2canvas options for better quality
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        height: clone.scrollHeight,
        width: clone.scrollWidth,
        ignoreElements: (element) => {
          // Ignore elements that might cause issues
          return element.classList && element.classList.contains('no-pdf');
        }
      });

      // Remove the clone
      document.body.removeChild(clone);

      const imgData = canvas.toDataURL('image/png');
      
      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Calculate dimensions to fit A4
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if content is longer than one page
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Generate filename with current date
      const fileName = `${portfolioData.personal.fullName || 'Portfolio'}_${new Date().toISOString().split('T')[0]}.pdf`;
      
      // Save the PDF
      pdf.save(fileName);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Validation Summary */}
      <div className={`mb-6 p-4 rounded-lg border-2 ${
        isPortfolioComplete 
          ? 'bg-green-50 border-green-200' 
          : 'bg-yellow-50 border-yellow-200'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className={`font-semibold ${
            isPortfolioComplete ? 'text-green-800' : 'text-yellow-800'
          }`}>
            Portfolio Validation Status
          </h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            isPortfolioComplete 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {isPortfolioComplete ? '✅ Ready for Export' : '⚠️ Needs Attention'}
          </span>
        </div>
        
        {!isPortfolioComplete && (
          <div className="mt-3">
            <p className="text-yellow-800 font-medium mb-2">Issues to address:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-yellow-700">
              {validationIssues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
          </div>
        )}
        
        {isPortfolioComplete && (
          <p className="text-green-700 text-sm">
            🎉 Your portfolio is complete and ready to download as PDF!
          </p>
        )}
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Preview Portfolio</h2>
        <button
          onClick={generatePDF}
          disabled={isGeneratingPDF || !isPortfolioComplete}
          className={`flex items-center px-6 py-3 rounded-lg transition-colors font-medium ${
            isPortfolioComplete && !isGeneratingPDF
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          title={!isPortfolioComplete ? 'Complete all required sections first' : ''}
        >
          <Download className="w-5 h-5 mr-2" />
          {isGeneratingPDF ? 'Generating PDF...' : 'Download PDF'}
        </button>
      </div>
      
      {/* Portfolio Preview */}
      <div 
        ref={portfolioRef}
        className="bg-white rounded-lg shadow-lg border p-8 print:shadow-none"
        style={{ minHeight: '800px' }}
      >
        {/* Header */}
        <div className="border-b-2 border-gray-300 pb-6 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            {portfolioData.personal.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap gap-6 text-base text-gray-700 mb-3">
            {portfolioData.personal.email && (
              <div className="flex items-center">
                <span className="font-medium">Email:</span>
                <span className="ml-1">{portfolioData.personal.email}</span>
              </div>
            )}
            {portfolioData.personal.phone && (
              <div className="flex items-center">
                <span className="font-medium">Phone:</span>
                <span className="ml-1">{portfolioData.personal.phone}</span>
              </div>
            )}
            {portfolioData.personal.location && (
              <div className="flex items-center">
                <span className="font-medium">Location:</span>
                <span className="ml-1">{portfolioData.personal.location}</span>
              </div>
            )}
          </div>
          {portfolioData.personal.website && (
            <div className="mb-3 text-base">
              <span className="font-medium">Website: </span>
              <span className="text-blue-600">{portfolioData.personal.website}</span>
            </div>
          )}
          {portfolioData.personal.linkedIn && (
            <div className="mb-3 text-base">
              <span className="font-medium">LinkedIn: </span>
              <span className="text-blue-600">{portfolioData.personal.linkedIn}</span>
            </div>
          )}
          {portfolioData.personal.summary && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Professional Summary</h3>
              <p className="text-gray-700 w-[782px] leading-relaxed text-base text-wrap" style={{ whiteSpace: "normal", wordWrap: "break-word"}}>
                {portfolioData.personal.summary}
              </p>
            </div>
          )}
        </div>

        {/* Experience */}
        {portfolioData.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-5 border-b-2 border-blue-200 pb-2">Experience</h2>
            <div className="space-y-6">
              {portfolioData.experience.map((exp) => (
                <div key={exp.id} className="border-l-4 border-blue-500 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{exp.position}</h3>
                    <span className="text-base text-gray-600 font-medium">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-blue-700 font-semibold text-lg mb-2">{exp.company}</p>
                  {exp.description && (
                    <p className="text-gray-700 text-base leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {portfolioData.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-5 border-b-2 border-green-200 pb-2">Education</h2>
            <div className="space-y-5">
              {portfolioData.education.map((edu) => (
                <div key={edu.id} className="border-l-4 border-green-500 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-green-700 font-semibold text-lg">{edu.institution}</p>
                      {edu.field && <p className="text-gray-700 text-base">{edu.field}</p>}
                    </div>
                    <div className="text-right text-base text-gray-600">
                      {edu.graduationDate}
                      {edu.gpa && <div className="font-medium">GPA: {edu.gpa}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {portfolioData.skills.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-5 border-b-2 border-purple-200 pb-2">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {portfolioData.skills.map((skill) => (
                <div key={skill.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <div className="text-center">
                    <span className="font-semibold text-gray-900 text-base block">{skill.name}</span>
                    <span className={`inline-block mt-1 px-3 py-1 text-sm font-medium rounded-full ${
                      skill.level === 'Expert' ? 'bg-green-200 text-green-800' :
                      skill.level === 'Advanced' ? 'bg-blue-200 text-blue-800' :
                      skill.level === 'Intermediate' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-gray-200 text-gray-800'
                    }`}>
                      {skill.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}