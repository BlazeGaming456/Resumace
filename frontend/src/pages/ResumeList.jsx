import React, { useEffect, useState } from 'react';
import api from '../utils/api.js';

const ResumeList = () => {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const response = await api.get('/resume');
                setResumes(response.data);
            } catch (error) {
                console.error('Error fetching resumes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchResumes();
    }, []);

    const handleDownload = async (fileName) => {
        try {
            const response = await api.get(`/resume/download/${fileName}`, {
                responseType: 'blob'
            });
            
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading resume:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Resumes</h2>
                
                {resumes.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">No resumes uploaded yet</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {resumes.map((resume, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">{resume.fileName}</h3>
                                    <p className="text-sm text-gray-500">
                                        Uploaded on {new Date(resume.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleDownload(resume.fileName)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    Download
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResumeList;