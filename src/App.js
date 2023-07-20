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

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar /> {/* NavBar should be here */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          <Route path="/contact" element={<Contact />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
