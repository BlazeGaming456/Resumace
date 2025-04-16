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
      // Transform projects
      const projects = [1, 2, 3].map(num => ({
        name: data[`project${num}Name`],
        technologies: data[`project${num}Tech`],
        startDate: data[`project${num}StartDate`],
        endDate: data[`project${num}EndDate`],
        points: [
          data[`project${num}Point1`],
          data[`project${num}Point2`],
          data[`project${num}Point3`],
          data[`project${num}Point4`]
        ].filter(Boolean)
      })).filter(proj => proj.name);

      // Transform work experience
      const work = [1, 2, 3].map(num => ({
        title: data[`work${num}Title`],
        company: data[`work${num}Company`],
        location: data[`work${num}Location`],
        startDate: data[`work${num}StartDate`],
        endDate: data[`work${num}EndDate`],
        points: [
          data[`work${num}Point1`],
          data[`work${num}Point2`],
          data[`work${num}Point3`],
          data[`work${num}Point4`]
        ].filter(Boolean)
      })).filter(job => job.title);

      // Achievements
      const achievements = [
        data.achievement1,
        data.achievement2,
        data.achievement3,
        data.achievement4,
        data.achievement5,
        data.achievement6
      ].filter(ach => ach);

      // Education
      const education = [
        {
          university: data.university,
          degree: `${data.degree} - CPI - ${data.cpi} (SPI - ${data.spi})`,
          location: data.universityLocation,
          startDate: data.universityStartDate,
          endDate: data.universityEndDate,
        },
        {
          university: data.school12,
          degree: `12th Grade - ${data.percentage12}%`,
          location: data.school12Location,
          startDate: data.school12StartDate,
          endDate: data.school12EndDate,
        },
        {
          university: data.school10,
          degree: `10th Grade - ${data.percentage10}%`,
          location: data.school10Location,
          startDate: data.school10StartDate,
          endDate: data.school10EndDate,
        }
      ].filter(edu => edu.university);

      // Technical Skills
      const technicalSkills = {
        languages: data.languages,
        frameworks: data.frameworks,
        tools: data.tools,
        libraries: data.libraries
      };

      // Final form data
      const formattedData = {
        personalDetails: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          linkedin: data.linkedin,
          github: data.github
        },
        education,
        work,
        projects,
        achievements,
        technicalSkills
      };

      setFormData(formattedData);
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
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    {...register('name')}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    {...register('phone')}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    {...register('email')}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
                  <input
                    {...register('linkedin')}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">GitHub</label>
                  <input
                    {...register('github')}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Education */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Education</h2>
              
              <div className="mb-6 p-4 border rounded-lg">
                <h3 className="font-medium mb-2">University</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">University Name</label>
                    <input
                      {...register('university')}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Degree</label>
                    <input
                      {...register('degree')}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">CPI</label>
                      <input
                        {...register('cpi')}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">SPI</label>
                      <input
                        {...register('spi')}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                      {...register('universityLocation')}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Start Date</label>
                      <input
                        {...register('universityStartDate')}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">End Date</label>
                      <input
                        {...register('universityEndDate')}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6 p-4 border rounded-lg">
                <h3 className="font-medium mb-2">12th Grade</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">School Name</label>
                    <input
                      {...register('school12')}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Percentage</label>
                    <input
                      {...register('percentage12')}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                      {...register('school12Location')}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Start Date</label>
                      <input
                        {...register('school12StartDate')}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">End Date</label>
                      <input
                        {...register('school12EndDate')}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">10th Grade</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">School Name</label>
                    <input
                      {...register('school10')}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Percentage</label>
                    <input
                      {...register('percentage10')}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                      {...register('school10Location')}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Start Date</label>
                      <input
                        {...register('school10StartDate')}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">End Date</label>
                      <input
                        {...register('school10EndDate')}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Work Experience */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Work Experience</h2>
              
              {[1, 2, 3].map((num) => (
                <div key={num} className="mb-6 p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Work Experience {num}</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Job Title</label>
                      <input
                        {...register(`work${num}Title`)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Company</label>
                      <input
                        {...register(`work${num}Company`)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Location</label>
                      <input
                        {...register(`work${num}Location`)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Start Date</label>
                        <input
                          {...register(`work${num}StartDate`)}
                          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">End Date</label>
                        <input
                          {...register(`work${num}EndDate`)}
                          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>
                    </div>
                    {[1, 2, 3, 4].map((pointNum) => (
                      <div key={pointNum}>
                        <label className="block text-sm font-medium text-gray-700">Bullet Point {pointNum}</label>
                        <input
                          {...register(`work${num}Point${pointNum}`)}
                          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 4: Projects */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Projects</h2>
              
              {[1, 2, 3].map((num) => (
                <div key={num} className="mb-6 p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Project {num}</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Project Name</label>
                      <input
                        {...register(`project${num}Name`)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Technologies Used</label>
                      <input
                        {...register(`project${num}Tech`)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Start Date</label>
                        <input
                          {...register(`project${num}StartDate`)}
                          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">End Date</label>
                        <input
                          {...register(`project${num}EndDate`)}
                          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>
                    </div>
                    {[1, 2, 3, 4].map((pointNum) => (
                      <div key={pointNum}>
                        <label className="block text-sm font-medium text-gray-700">Bullet Point {pointNum}</label>
                        <input
                          {...register(`project${num}Point${pointNum}`)}
                          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 5: Achievements */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Achievements</h2>
              
              <div className="grid grid-cols-1 gap-4">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div key={num}>
                    <label className="block text-sm font-medium text-gray-700">Achievement {num}</label>
                    <input
                      {...register(`achievement${num}`)}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Technical Skills */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Technical Skills</h2>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Languages (comma separated)</label>
                  <input
                    {...register('languages')}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Frameworks (comma separated)</label>
                  <input
                    {...register('frameworks')}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Developer Tools (comma separated)</label>
                  <input
                    {...register('tools')}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Libraries (comma separated)</label>
                  <input
                    {...register('libraries')}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
              </div>
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
            
            {currentStep < 6 ? (
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
        {pdfReady && (
          <div className="mt-8">
            <PDFDownloadLink 
              document={<ResumePDF resumeData={formData} />} 
              fileName="resume.pdf"
              className="block"
            >
              {({ loading }) => (
                <button
                  className="w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  disabled={loading}
                >
                  {loading ? 'Loading document...' : 'Download PDF'}
                </button>
              )}
            </PDFDownloadLink>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
            <p className="font-bold">{error.message}</p>
            <p>{error.details}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;