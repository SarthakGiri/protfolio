import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavigationBar = () => {
  const [menuActive, setMenuActive] = useState(false);

  return (
    <nav className="nav">
      <div className="nav-inner">
        <button className="nav-toggle" onClick={() => setMenuActive(!menuActive)}>
          {menuActive ? 'X' : '☰'}
        </button>
        <ul className={`nav-links ${menuActive ? 'active' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/skills">Skills</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
