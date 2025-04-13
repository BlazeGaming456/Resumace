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

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Your Resumes</h2>
            {resumes.length === 0 && <p>No resumes uploaded yet</p>}
            <ul>
                {resumes.map((resume, index) => (
                    <li key={index}>
                        {resume.fileName} - {new Date(resume.createdAt).toLocaleDateString()}
                        <button onClick={() => handleDownload(resume.fileName)}>
                            Download
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ResumeList;