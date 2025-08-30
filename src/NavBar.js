import React, { useEffect, useState, useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './NavBar.css';

const NavigationBar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'green');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemLoad, setSystemLoad] = useState(Math.random() * 100);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setSystemLoad(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 10)));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Unified effect for scroll and keydown events
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 4);
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };
    
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuActive(false);
    };

    onScroll(); // Initial call
    window.addEventListener('scroll', onScroll);
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  // Effect to prevent body scroll when the menu is open
  useEffect(() => {
    document.body.classList.toggle('no-scroll', menuActive);
  }, [menuActive]);

  // Effect to apply and save the current theme
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Use useCallback to memoize functions and prevent unnecessary re-renders
  const closeMenu = useCallback(() => {
    setMenuActive(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuActive(prev => !prev);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'cyan' ? 'green' : 'cyan'));
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav-header">
        <div className="nav-system-info">
          <span className="nav-time">[{formatTime(currentTime)}]</span>
          <span className="nav-load">CPU: {systemLoad.toFixed(1)}%</span>
          <span className="nav-status">
            <span className="status-dot"></span>
            SECURE
          </span>
        </div>
      </div>
      
      <div className="nav-inner">
        <Link to="/" className="nav-brand" onClick={closeMenu}>
          <span className="brand-prompt">root@sarthak.sec:~$</span>
          <span className="brand-cursor">_</span>
        </Link>
        
        <div className="nav-actions">
          <button
            className="theme-toggle"
            type="button"
            aria-label="Toggle theme"
            onClick={toggleTheme}
            title={theme === 'cyan' ? 'Switch to Matrix Mode' : 'Switch to Cyberpunk Mode'}
          >
            <span className="theme-icon">◉</span>
            <span className="theme-label">[{theme.toUpperCase()}]</span>
          </button>
          <button
            className="nav-toggle"
            type="button"
            aria-expanded={menuActive}
            aria-controls="primary-navigation"
            aria-label="Toggle navigation menu"
            onClick={toggleMenu}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
        
        <ul id="primary-navigation" className={`nav-links ${menuActive ? 'active' : ''}`}>
          <li>
            <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>
              <span className="nav-cmd">./</span>
              <span className="nav-label">home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/skills" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>
              <span className="nav-cmd">cat</span>
              <span className="nav-label">skills.txt</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/projects" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>
              <span className="nav-cmd">ls</span>
              <span className="nav-label">projects/</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>
              <span className="nav-cmd">ping</span>
              <span className="nav-label">contact.sh</span>
            </NavLink>
          </li>
          <li className="nav-resume">
            <a href="mailto:programmersarthakg12@gmail.com?subject=Resume%20Request&body=Hi%20Sarthak,%0A%0APlease%20send%20me%20your%20latest%20resume.%0A%0AThank%20you!" onClick={closeMenu}>
              <span className="nav-cmd">wget</span>
              <span className="nav-label">resume.pdf</span>
            </a>
          </li>
        </ul>
        
        <div className="scroll-progress" style={{ width: `${progress}%` }} />
      </div>
      
      <div className="nav-scanline"></div>
    </nav>
  );
};

export default NavigationBar;