import React, { useState } from 'react'
import axios from 'axios'
import api from '../utils/api';

const CoverLetter = () => {

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const [text, setText] = useState('');
    const [error, setError] = useState(null);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState("");

    const handleUpload = async (file) => {
        setLoading(true);
        setError(null);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`${BACKEND_URL}/ats/text`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setText(response.data);
        }
        catch (error) {
            console.error('Error uploading file:', error);
            setError({
                message: error.response?.data?.error || 'Failed to process file',
                details: error.response?.data?.details || error.message
            });
            setText('');
        }
        finally {
            setLoading(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            setLoading(true);
            setError(null);
    
            // Use the api instance from utils/api.js which automatically adds the token
            const response = await api.post('/ai/cover-letter', { 
                text, 
                description 
            });
    
            setAnalysis(response.data.cover_letter);
        }
        catch (error) {
            console.error('Error generating cover letter:', error);
            setError({
                message: error.response?.data?.error || 'Failed to generate cover letter',
                details: error.response?.data?.details || error.message
            });
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    Cover Letter Generator
                </h1>

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

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload Your Resume (PDF)
                        </label>
                        <input 
                            type="file" 
                            onChange={(e) => handleUpload(e.target.files[0])} 
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Job Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            rows={4}
                            placeholder="Paste the job description here..."
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Generating...
                            </>
                        ) : 'Generate Cover Letter'}
                    </button>
                </form>

                {analysis && (
                    <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Generated Cover Letter</h2>
                        <div className="prose max-w-none">
                            <p>{analysis}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CoverLetter