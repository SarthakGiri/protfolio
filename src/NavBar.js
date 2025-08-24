import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './NavBar.css';

const NavigationBar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 4);
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuActive) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [menuActive]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuActive(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-brand" onClick={() => setMenuActive(false)}>
          <span className="brand-mark">&gt;_</span>
          <span className="brand-name">Sarthak</span>
          <span className="brand-accent">.sec</span>
        </Link>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={menuActive}
          aria-controls="primary-navigation"
          aria-label="Toggle navigation menu"
          onClick={() => setMenuActive(!menuActive)}
        >
          {menuActive ? '✕' : '☰'}
        </button>
        <ul id="primary-navigation" className={`nav-links ${menuActive ? 'active' : ''}`}>
          <li>
            <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMenuActive(false)}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMenuActive(false)}>Contact</NavLink>
          </li>
          <li>
            <NavLink to="/projects" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMenuActive(false)}>Projects</NavLink>
          </li>
          <li>
            <NavLink to="/skills" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMenuActive(false)}>Skills</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
