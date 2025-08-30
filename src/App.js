import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import LoadingScreen from './LoadingScreen';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import HomePage from './HomePage.js';
import Contact from './Contact.js';
import Skills from './Skills.js';
import Projects from './Projects.js';
import HireMe from './HireMe';
import LetsTalk from './LetsTalk';
import Chatbot from './ChatBot';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import SecurityFeatures from './SecurityFeatures';
import FuturisticBackground from './FuturisticBackground';
import AIAssistant from './AIAssistant';
import BiometricScanner from './BiometricScanner';
import ErrorBoundary from './ErrorBoundary';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showSecurity, setShowSecurity] = useState(false);
  const [showBiometric, setShowBiometric] = useState(false);

  useEffect(() => {
    // Performance monitoring
    const performanceObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'navigation') {
          console.log(`🚀 Page loaded in ${Math.round(entry.loadEventEnd - entry.loadEventStart)}ms`);
        }
      });
    });

    if ('PerformanceObserver' in window) {
      performanceObserver.observe({ entryTypes: ['navigation'] });
    }

    // Show security features after loading
    const securityTimer = setTimeout(() => {
      setShowSecurity(true);
    }, 5000);

    // Show biometric scanner for first-time visitors
    const biometricTimer = setTimeout(() => {
      const hasVisited = localStorage.getItem('portfolio-visited');
      if (!hasVisited) {
        setShowBiometric(true);
        localStorage.setItem('portfolio-visited', 'true');
      }
    }, 8000);

    return () => {
      clearTimeout(securityTimer);
      clearTimeout(biometricTimer);
      if ('PerformanceObserver' in window) {
        performanceObserver.disconnect();
      }
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <FuturisticBackground />
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/hire-me" element={<HireMe />} />
            <Route path="/lets-talk" element={<LetsTalk />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
          
          {showSecurity && <SecurityFeatures />}
          <AIAssistant />
          {showBiometric && (
            <BiometricScanner 
              isActive={showBiometric}
              onScanComplete={() => setShowBiometric(false)}
            />
          )}
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
