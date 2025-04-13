import React, {useEffect, useState} from 'react'
import axios from 'axios'
import api from '../utils/api.js';

const ResumeComparison = () => {
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [analysis, setAnalysis] = useState({
        score: 0,
        feedback: []
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleUpload = async (file, setTextValues) => {
        setLoading(true);
        setError(null);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:3000/ats/text', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setTextValues(response.data);
        }
        catch (error) {
            console.error('Error uploading file:', error);
            setError({
                message: error.response?.data?.error || 'Failed to process file',
                details: error.response?.data?.details || error.message
            });
            setTextValues('');
        }
        finally {
            setLoading(false);
        }
    }

    // ... existing code ...

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text1 || !text2) {
            setError({
                message: "Please upload both resumes",
                details: "You need to upload two resumes to compare"
            });
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await api.post('/ai/compare', { 
                text1, 
                text2 
            });
            
            if (!response.data) {
                throw new Error("No data received from server");
            }
            
            setAnalysis(response.data);
        }
        catch (error) {
            console.error('Error comparing resumes:', error);
            setError({
                message: error.response?.data?.error || 'Failed to compare resumes',
                details: error.response?.data?.details || error.message
            });
            setAnalysis({
                score1: 0,
                score2: 0,
                feedback: [
                    { message: 'Error comparing resumes', isPositive: false }
                ],
                winner: 'none'
            });
        }
        finally {
            setLoading(false);
        }
    }

// ... rest of the code ...

    useEffect(() => {
        console.log(text1);
        console.log(text2);
    },[text1,text2])

    return (
        <div>
            <h2>ATS Score Checker</h2>
            {error && (
                <div className="error">
                    <h3>Error: {error.message}</h3>
                    <p>{error.details}</p>
                </div>
            )}
            <form onSubmit={(e) => handleSubmit(e)}>
    <input type="file" accept='.pdf' onChange={(e) => handleUpload(e.target.files[0], setText1)} disabled={loading} required />
    <input type="file" accept='.pdf' onChange={(e) => handleUpload(e.target.files[0], setText2)} disabled={loading} required />
    <button type='submit' disabled={loading}>{loading ? 'Analyzing...' : 'Compare Resumes'}</button>
</form>

            {analysis && (
                <div className='results'>
                    <h3>ATS Score: {analysis.score1}/100</h3>
                    <h3>ATS Score: {analysis.score2}/100</h3>
                    <div>
                        <h4>Feedback:</h4>
                        <ul>
                            {analysis.feedback?.map((item, index) => (
                                <li key={index} >
                                    {item.message}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <h3>Winner: {analysis.winner}</h3>
                </div>
            )}
        </div>
    )
}

export default ResumeComparison