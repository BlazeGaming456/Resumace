import React, { useState } from 'react'
import axios from 'axios'

// ... existing imports ...

const ATSScore = () => {
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
            const response = await axios.post('http://localhost:3000/ats/parse', formData, {
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
        <div>
            <h2>ATS Score Checker</h2>
            {error && (
                <div className="error">
                    <h3>Error: {error.message}</h3>
                    <p>{error.details}</p>
                </div>
            )}
            <form onSubmit={handleUpload}>
                <input type="file" accept='.pdf' onChange={(e)=>handleUpload(e.target.files[0])} disabled={loading} required />
                <button type='submit' disabled={loading} >{loading ? 'Analyzing...' : 'Check ATS Score'}</button>
            </form>

            {analysis && (
                <div className='results'>
                    <h3>ATS Score: {analysis.score}/100</h3>
                    <div>
                        <h4>Feedback:</h4>
                        <ul>
                            {analysis.feedback?.map((item, index) => (
                                <li key={index} className={`${item.isPositive ? 'positive' : 'negative'}`} >
                                    {item.message}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ATSScore;