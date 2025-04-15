import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResumePDF from '../components/ResumePDF';

const Form = () => {
  const { register, handleSubmit } = useForm();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const [pdfReady, setPdfReady] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    
    try {
      setFormData(data);
      setPdfReady(true);
    } catch (error) {
      setError({
        message: 'Failed to generate PDF',
        details: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create Your Resume</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Personal Details */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Details</h2>
              {['name', 'email', 'phone', 'linkedin', 'github'].map((field) => (
                <div key={field} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
                  <input
                    {...register(`personalDetails.${field}`)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    required
                  />
                </div>
              ))}
            </div>
          )}

          {/* Step 2: Education */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Education</h2>
              {[...Array(2)].map((_, index) => (
                <div key={index} className="mb-6">
                  <h3 className="font-medium mb-2">Education #{index + 1}</h3>
                  {['degree', 'course', 'university', 'location', 'cpi', 'spi'].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
                      <input
                        {...register(`education.${index}.${field}`)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        type="text"
                        placeholder={field.toUpperCase()}
                        required
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Start Year</label>
                    <input {...register(`education.${index}.startyear`)} className="mt-1 block w-full border border-gray-300 rounded-md p-2" type="text" placeholder="2023" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">End Year</label>
                    <input {...register(`education.${index}.endyear`)} className="mt-1 block w-full border border-gray-300 rounded-md p-2" type="text" placeholder="2027" required />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 3: Skills */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills</h2>
              <label className="block text-sm font-medium text-gray-700">Technical Skills (Comma-Separated)</label>
              <input {...register(`skills`)} className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="React, Node.js, MongoDB" required />
            </div>
          )}

          {/* Step 4: Projects */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Projects</h2>
              {[...Array(3)].map((_, index) => (
                <div key={index} className="mb-6">
                  <h3 className="font-medium mb-2">Project #{index + 1}</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Project Name</label>
                    <input {...register(`project.${index}.name`)} className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="Project Name" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description (Use new lines for bullet points)</label>
                    <textarea {...register(`project.${index}.description`)} rows={4} className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="• Built UI with React&#10;• Integrated MongoDB&#10;• Deployed to Netlify" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Start Time</label>
                    <input {...register(`project.${index}.starttime`)} className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="April, 2025" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">End Time</label>
                    <input {...register(`project.${index}.endtime`)} className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="May, 2025" required />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 5: Work Experience */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Work Experience</h2>
              {[...Array(3)].map((_, index) => (
                <div key={index} className="mb-6">
                  <h3 className="font-medium mb-2">Company #{index + 1}</h3>
                  {['name', 'role', 'description', 'starttime', 'endtime'].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
                      <input
                        {...register(`work.${index}.${field}`)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                Previous
              </button>
            )}
            
            {currentStep < 5 ? (
              <button
                type="button"
                onClick={nextStep}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Generating...' : 'Generate PDF'}
              </button>
            )}
          </div>
        </form>

        {/* PDF Download Section */}
{currentStep === 5 && pdfReady && (
  <div className="mt-8">
    <PDFDownloadLink 
      document={<ResumePDF resumeData={formData} />} 
      fileName="resume.pdf"
    >
      {({ loading }) => (
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          disabled={loading}
        >
          {loading ? 'Loading document...' : 'Download PDF'}
        </button>
      )}
    </PDFDownloadLink>
  </div>
        )}
      </div>
    </div>
  );
};

export default Form;