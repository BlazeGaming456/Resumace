import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFileAlt, FaList, FaBalanceScale, FaEnvelope, FaChartLine } from 'react-icons/fa';

const Features = () => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const features = [
    {
      icon: <FaFileAlt className="w-6 h-6" />,
      title: "Create Resume",
      description: "Build your professional resume with our easy-to-use form",
      path: "/form"
    },
    {
      icon: <FaList className="w-6 h-6" />,
      title: "My Resumes",
      description: "View and manage all your saved resumes",
      path: "/resumes"
    },
    {
      icon: <FaBalanceScale className="w-6 h-6" />,
      title: "Compare Resumes",
      description: "Analyze and compare different versions of your resume",
      path: "/ats-compare"
    },
    {
      icon: <FaEnvelope className="w-6 h-6" />,
      title: "Cover Letter",
      description: "Generate personalized cover letters for your applications",
      path: "/cover-letter"
    },
    {
      icon: <FaChartLine className="w-6 h-6" />,
      title: "ATS Score",
      description: "Check how well your resume performs with ATS systems",
      path: "/ats-score"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Heading Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Select from Our Many Features
          </h1>
          <p className="text-xl text-gray-600">
            Explore our comprehensive suite of tools to enhance your career journey
          </p>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-blue-600">
              <tr>
                <th className="px-8 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Feature</th>
                <th className="px-8 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {features.map((feature, index) => (
                <tr
                  key={index}
                  className={`transition-all duration-300 ${
                    hoveredRow === index ? 'bg-blue-50 scale-[1.02]' : 'hover:bg-gray-50'
                  }`}
                  onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className="px-8 py-6 whitespace-nowrap">
                    <Link to={feature.path} className="flex items-center space-x-6">
                      <div className="text-blue-600">
                        {feature.icon}
                      </div>
                      <div className="text-lg font-medium text-gray-900">
                        {feature.title}
                      </div>
                    </Link>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-base text-gray-600">
                      {feature.description}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Features;