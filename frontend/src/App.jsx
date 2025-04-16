import React from 'react'
import Form from './pages/Form'
import ATSScore from './pages/ATSScore'
import ResumeComparison from './pages/ResumeComparison.jsx'
import CoverLetter from './pages/CoverLetter.jsx'
import {Routes, Route} from 'react-router-dom'
import Auth from './pages/Auth.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ResumeList from './pages/ResumeList.jsx'
import Home from './pages/Home.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Features from './pages/Features.jsx'
import Pricing from './pages/Pricing.jsx'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Auth isLogin={true} />} />
        <Route path="/signup" element={<Auth isLogin={false} />} />
        <Route path="/" element={<Home />} />
        <Route path="/features" element={
          // <ProtectedRoute>
            <Features />
          // </ProtectedRoute>
        } />
        <Route path="/pricing" element={<Pricing />} />

        <Route path="/form" element={
          // <ProtectedRoute>
            <Form />
          // </ProtectedRoute>
        } />
        <Route path="/ats-score" element={
          // <ProtectedRoute>
            <ATSScore />
          // </ProtectedRoute>
        } />
        <Route path="/ats-compare" element={
          // <ProtectedRoute>
            <ResumeComparison />
          // </ProtectedRoute>
        } />
        <Route path="/cover-letter" element={
          // <ProtectedRoute>
            <CoverLetter />
          // </ProtectedRoute>
        } />
        <Route path="/resumes" element={
          // <ProtectedRoute>
            <ResumeList />
          // </ProtectedRoute>
        } />
      </Routes>
      <Footer/>
    </div>
  );
};

export default App