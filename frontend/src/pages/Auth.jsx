import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = ({ isLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const endpoint = isLogin ? '/auth/login' : '/auth/signup';
            const response = await axios.post(`http://localhost:3000${endpoint}`, {
                email,
                password
            });

            // Store token and user ID
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId);
            
            navigate('/');
        } catch (error) {
            setError(error.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <div>
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
            </form>
        </div>
    );
};

export default Auth;