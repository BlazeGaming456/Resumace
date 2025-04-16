import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFileAlt, FaList, FaBalanceScale, FaEnvelope, FaChartLine, FaLinkedin } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Features = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  const handleFeatureClick = (path) => {
    const token = localStorage.getItem('token');
    if (!token && path !== '/pricing') {
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  const features = [
    {
      icon: <FaFileAlt className="w-8 h-8" />,
      title: "Resume Builder",
      description: "Craft professional resumes with our intuitive, step-by-step builder",
      path: "/form",
      color: "from-blue-100 to-blue-200"
    },
    {
      icon: <FaList className="w-8 h-8" />,
      title: "Resume Vault",
      description: "Securely store and manage all your resume versions in one place",
      path: "/resumes",
      color: "from-purple-100 to-purple-200"
    },
    {
      icon: <FaBalanceScale className="w-8 h-8" />,
      title: "Resume Comparison",
      description: "Analyze and optimize different versions of your resume",
      path: "/ats-compare",
      color: "from-green-100 to-green-200"
    },
    {
      icon: <FaEnvelope className="w-8 h-8" />,
      title: "Cover Letter Generator",
      description: "Create tailored cover letters that match your resume",
      path: "/cover-letter",
      color: "from-pink-100 to-pink-200"
    },
    {
      icon: <FaChartLine className="w-8 h-8" />,
      title: "ATS Optimization",
      description: "Get instant feedback on your resume's ATS compatibility",
      path: "/ats-score",
      color: "from-indigo-100 to-indigo-200"
    },
    {
      icon: <FaLinkedin className="w-8 h-8" />,
      title: "LinkedIn Sync",
      description: "Coming Soon! Seamlessly integrate your LinkedIn profile",
      path: "#",
      color: "from-teal-100 to-teal-200",
      comingSoon: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Career Toolkit
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to create, optimize, and manage your professional presence
          </p>
        </div>

        {/* Features List */}
        <div className="space-y-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden group ${
                hoveredIndex === index ? 'ring-2 ring-blue-500' : ''
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {feature.comingSoon && (
                <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">
                  Coming Soon
                </div>
              )}
              
              <div 
                onClick={() => handleFeatureClick(feature.path)}
                className={`block p-8 h-full bg-gradient-to-br ${feature.color} hover:brightness-105 transition-all duration-300 cursor-pointer`}
              >
                <div className="flex items-center space-x-6">
                  <div className="p-4 rounded-full bg-white shadow-md group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;