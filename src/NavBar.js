import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const NavigationBar = () => {
    const [open, setOpen] = useState(false);
  
    return (
      <nav className="nav">
        <div className="nav-hamburger" onClick={() => setOpen(!open)}>
          <div />
          <div />
          <div />
        </div>
        <ul className={`nav-links ${open ? 'nav-active' : ''}`}>
      <li><Link to="/">$Home</Link></li>
      
      <li><Link to="/contact">$Contact</Link></li>
      <li><Link to="/projects">$Projects</Link></li>
      <li><Link to="/skills">$Skills</Link></li>
  </ul>
      </nav>
    );
  };
  export default NavigationBar;
  