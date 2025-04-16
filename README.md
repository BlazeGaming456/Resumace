[Work in Progress]

# Resumace - Your AI-Powered Resume Assistant

Resumace is a comprehensive web application designed to help users create, optimize, and manage their professional resumes with the power of AI. Whether you're crafting a new resume, comparing different versions, or optimizing for ATS compatibility, Resumace has you covered.

![image](https://github.com/user-attachments/assets/70d77a40-7f8c-44e1-9fac-dfbbf07f8b48)

## Features

- **Resume Builder**: Create professional resumes with an intuitive, step-by-step form
- **ATS Optimization**: Get instant feedback on your resume's ATS compatibility
- **Resume Comparison**: Analyze and compare different versions of your resume
- **Cover Letter Generator**: Create tailored cover letters that match your resume
- **Resume Vault**: Securely store and manage all your resume versions
- **LinkedIn Sync**: (Coming Soon) Seamlessly integrate your LinkedIn profile

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Google Gemini AI

## Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- Google Gemini API Key

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend

2. Install dependencies:
   ```bash
   npm install
    ```
3. Create a .env file with the following variables:
   ```env
   mongoDBUrl=mongodb://localhost:27017/resumace
   PORT=3000
   GEMINI_API_KEY=your_api_key_here
   JWT_SECRET=your_jwt_secret_here
    ```
4. Start the server:
   ```bash
   npm start
    ```
### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
    ```
2. Install dependencies:
   ```bash
   npm install
    ```
3. Create a .env file with the following variable:
   ```env
   VITE_BACKEND_URL=http://localhost:3000
    ```
4. Start the development server:
   ```bash
   npm run dev
    ```
