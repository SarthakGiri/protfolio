import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import MatrixRain from './MatrixRain';
import useScramble from './useScramble';

const SocialMediaIcons = () => (
  <div className="home-sci">
    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
      <img src="https://img.icons8.com/ios-filled/50/ffffff/facebook-new.png" alt="Facebook Icon" />
    </a>
    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
      <img src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png" alt="Instagram Icon" />
    </a>
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
      <img src="https://img.icons8.com/ios-filled/50/ffffff/twitter.png" alt="Twitter Icon" />
    </a>
    <a href="https://www.linkedin.com/in/sarthak-giri-7b0686108/" target="_blank" rel="noopener noreferrer">
      <img src="https://img.icons8.com/ios-filled/50/ffffff/linkedin.png" alt="LinkedIn Icon" />
    </a>
  </div>
);

const HomePage = () => {
  useEffect(() => {
    MatrixRain();
  }, []);

  const [hoverHireMe, setHoverHireMe] = useState(false);
  const [hoverLetsTalk, setHoverLetsTalk] = useState(false);
  const hireMeText = useScramble('Hire me', hoverHireMe);
  const letsTalkText = useScramble('Lets Talk', hoverLetsTalk);

  return (
    <div>
      <canvas id="canvas"></canvas>
      <section className="home">
        <div className="home-content">
          <h1>This is Sarthak Giri</h1>
          <h3>CyberSecurity Engineer</h3>
          <p>Bachelors Of Network And CyberSecurity</p>
          <div className="btn-box">
            <button
              onMouseEnter={() => setHoverHireMe(hover => !hover)}
              onMouseLeave={() => setHoverHireMe(hover => !hover)}
            >
              {hireMeText}
            </button>
            <button
              onMouseEnter={() => setHoverLetsTalk(hover => !hover)}
              onMouseLeave={() => setHoverLetsTalk(hover => !hover)}
            >
              {letsTalkText}
            </button>
          </div>
          <SocialMediaIcons />
        </div>
      </section>
    </div>
  );
};

export default HomePage;