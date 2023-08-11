import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import HomePage from './HomePage.js';
import Contact from './Contact.js';
import Skills from './Skills.js';
import Projects from './Projects.js';
import HireMe from './HireMe';
import LetsTalk from './LetsTalk';
import Chatbot from './ChatBot';
import AdminLogin from './AdminLogin'; // Path to AdminLogin.js
import AdminDashboard from './AdminDashboard'; // Path to AdminDashboard.js

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/hire-me" element={<HireMe />} />
          <Route path="/lets-talk" element={<LetsTalk />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/admin/login" element={<AdminLogin />} /> {/* Corrected this line */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} /> {/* Corrected this line */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
