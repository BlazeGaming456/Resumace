import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFileAlt, FaList, FaBalanceScale, FaEnvelope, FaChartLine, FaLinkedin } from 'react-icons/fa';
import welcomeLogo from '../assets/welcome.png';

const Home = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const features = [
    {
      icon: <FaFileAlt className="w-8 h-8" />,
      title: "Create Resume",
      description: "Build your professional resume with our easy-to-use form",
      path: "/form",
      color: "from-blue-100 to-blue-200"
    },
    {
      icon: <FaList className="w-8 h-8" />,
      title: "My Resumes",
      description: "View and manage all your saved resumes",
      path: "/resumes",
      color: "from-purple-100 to-purple-200"
    },
    {
      icon: <FaBalanceScale className="w-8 h-8" />,
      title: "Compare Resumes",
      description: "Analyze and compare different versions of your resume",
      path: "/ats-compare",
      color: "from-green-100 to-green-200"
    },
    {
      icon: <FaEnvelope className="w-8 h-8" />,
      title: "Cover Letter",
      description: "Generate personalized cover letters for your applications",
      path: "/cover-letter",
      color: "from-pink-100 to-pink-200"
    },
    {
      icon: <FaChartLine className="w-8 h-8" />,
      title: "ATS Score",
      description: "Check how well your resume performs with ATS systems",
      path: "/ats-score",
      color: "from-indigo-100 to-indigo-200"
    },
    {
      icon: <FaLinkedin className="w-8 h-8" />,
      title: "LinkedIn Optimization",
      description: "Coming Soon! Import all your details directly from Linkedin",
      path: "#",
      color: "from-teal-100 to-teal-200",
      comingSoon: true
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Welcome Section */}
      <div className="bg-gradient-to-b from-white to-gray-100 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="flex-1 text-left space-y-6">
              <h1 className="text-4xl font-bold text-gray-900">
                Craft Your Career Story
              </h1>
              <p className="text-lg text-gray-600">
                Create professional resumes, optimize for ATS, and land your dream job with our comprehensive tools
              </p>
              <div className="flex gap-4">
                <Link
                  to="/form"
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  to="/features"
                  className="border border-blue-600 text-blue-600 px-6 py-2.5 rounded-md font-medium hover:bg-blue-50 transition-colors"
                >
                  Explore Features
                </Link>
              </div>
            </div>
            <div className="flex-1">
              <img 
                src={welcomeLogo} 
                alt="Welcome" 
                className="w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Our Powerful Features
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Unlock your career potential with our comprehensive suite of professional tools
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden ${
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
                
                <Link 
                  to={feature.path} 
                  className={`block p-8 h-full bg-gradient-to-br ${feature.color}`}
                >
                  <div className="text-center">
                    <div className="inline-block p-4 rounded-full bg-white shadow-md">
                      {feature.icon}
                    </div>
                    <h3 className="mt-6 text-2xl font-bold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="mt-4 text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;