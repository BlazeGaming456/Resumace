import React from 'react';
import { Link } from 'react-router-dom';
import { FaFileAlt, FaList, FaBalanceScale, FaEnvelope, FaChartLine } from 'react-icons/fa';
import welcomeLogo from '../assets/welcome.png';

const Home = () => {
  const features = [
    {
      title: "Create Resume",
      description: "Build your professional resume with our easy-to-use form",
      icon: <FaFileAlt className="w-8 h-8 mb-4" />,
      path: "/form",
      image: "/images/resume-builder.jpg"
    },
    {
      title: "My Resumes",
      description: "View and manage all your saved resumes",
      icon: <FaList className="w-8 h-8 mb-4" />,
      path: "/resumes",
      image: "/images/resume-list.jpg"
    },
    {
      title: "Compare Resumes",
      description: "Analyze and compare different versions of your resume",
      icon: <FaBalanceScale className="w-8 h-8 mb-4" />,
      path: "/ats-compare",
      image: "/images/resume-comparison.jpg"
    },
    {
      title: "Cover Letter",
      description: "Generate personalized cover letters for your applications",
      icon: <FaEnvelope className="w-8 h-8 mb-4" />,
      path: "/cover-letter",
      image: "/images/cover-letter.jpg"
    },
    {
      title: "ATS Score",
      description: "Check how well your resume performs with ATS systems",
      icon: <FaChartLine className="w-8 h-8 mb-4" />,
      path: "/ats-score",
      image: "/images/ats-score.jpg"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Welcome Section */}
      <div className="flex-grow flex items-center justify-center px-8 py-12 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-gray-900">
              Your Career Journey Starts Here
            </h1>
            <p className="text-xl text-gray-600">
              Create, optimize, and perfect your resume with our AI-powered tools. 
              Stand out in the competitive job market with professional resumes 
              that get you noticed.
            </p>
            <div className="flex gap-4">
              <Link 
                to="/form" 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
          
          {/* Image */}
          <div className="hidden md:block">
            <img 
              src={welcomeLogo}
              alt="Resume Illustration"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Our Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link 
                key={index} 
                to={feature.path}
                className="group block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                </div>
                <div className="p-6 bg-white">
                  <div className="text-blue-600">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;