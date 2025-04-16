import React, { useState } from 'react'
import axios from 'axios'

const ATSScore = () => {

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const [analysis, setAnalysis] = useState({
        score: 0,
        feedback: []
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleUpload = async (file) => {
        setLoading(true);
        setError(null);
        const formData = new FormData();
        formData.append('file', file);
    
        try {
            const response = await axios.post(`${BACKEND_URL}/ats/parse`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setAnalysis(response.data);
        }
        catch (error) {
            console.error('Error uploading file:', error);
            setError({
                message: error.response?.data?.error || 'Failed to process file',
                details: error.response?.data?.details || error.message
            });
            setAnalysis({
                score: 0,
                feedback: [
                    { message: 'Error processing file', isPositive: false }
                ]
            });
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-xl p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        ATS Score Checker
                    </h2>

                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">Error: {error.message}</h3>
                                    <p className="mt-2 text-sm text-red-700">{error.details}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="bg-gray-50 p-6 rounded-lg mb-8">
                        <form onSubmit={(e) => { e.preventDefault(); }} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Upload Your Resume (PDF)
                                </label>
                                <div className="flex items-center space-x-4">
                                    <input 
                                        type="file" 
                                        accept=".pdf" 
                                        onChange={(e) => handleUpload(e.target.files[0])} 
                                        disabled={loading} 
                                        className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        required 
                                    />
                                    <button 
                                        type="submit" 
                                        disabled={loading}
                                        className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Analyzing...
                                            </>
                                        ) : 'Check ATS Score'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {analysis && (
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    Your ATS Score: <span className="text-blue-600">{analysis.score}/100</span>
                                </h3>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div 
                                        className="bg-blue-600 h-2.5 rounded-full" 
                                        style={{ width: `${analysis.score}%` }}
                                    ></div>
                                </div>
                            </div>

                            {analysis.feedback?.length > 0 && (
                                <div className="bg-white p-6 rounded-lg shadow">
                                    <h4 className="text-xl font-semibold text-gray-900 mb-4">
                                        Detailed Feedback
                                    </h4>
                                    <ul className="space-y-3">
                                        {analysis.feedback.map((item, index) => (
                                            <li 
                                                key={index} 
                                                className={`p-3 rounded-md ${
                                                    item.isPositive 
                                                        ? 'bg-green-50 border-l-4 border-green-400' 
                                                        : 'bg-red-50 border-l-4 border-red-400'
                                                }`}
                                            >
                                                <div className="flex items-start">
                                                    <div className="flex-shrink-0">
                                                        {item.isPositive ? (
                                                            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                            </svg>
                                                        ) : (
                                                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-sm text-gray-700">{item.message}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ATSScore