import React, { useState } from 'react'
import axios from 'axios'

const CoverLetter = () => {
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
            const response = await axios.post('http://localhost:3000/ats/text', formData, {
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

            const response = await axios.post('http://localhost:3000/ai/cover-letter', { 
                text, 
                description 
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
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
        <div>
            {error && (
                <div className="error">
                    <h3>Error: {error.message}</h3>
                    <p>{error.details}</p>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={(e)=>handleUpload(e.target.files[0])} />
                <input type="text" className='border border-2' onChange={((e)=>setDescription(e.target.value))}/>
                <button disabled={loading}>{loading ? 'Generating...' : 'Generate the Cover Letter'}</button>    
            </form>
            {analysis && (
                <div className='results'>
                    <h2>Generated Cover Letter:</h2>
                    <p>{analysis}</p>
                </div>
            )}
        </div>
    )
}

export default CoverLetter