import React, { useEffect , useState} from 'react';
import './HomePage.css';
import MatrixRain from './MatrixRain';
import Typewriter from 'typewriter-effect';
import { Link } from 'react-router-dom';
// import useScramble from './useScramble';

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
  // Subtle matrix rain background with cleanup
  useEffect(() => { const cleanup = MatrixRain(); return cleanup; }, []);

  const hireMeText = "Hire me";
  const letsTalkText = "Let's Talk";

  return (
    <div>
      {/* removed matrix canvas for minimal theme */}
      <section className="home">
        <div className="home-content">
          <div className="hero">
            <div className="hero__left">
              <div className="pretitle">$ whoami</div>
              <h1 className="title">Sarthak Giri</h1>
              <div className="headline typewriter-container">
                <Typewriter
                  options={{
                    strings: ['Cybersecurity Engineer', 'Offensive Security | Blue Team', 'React • Node.js • Azure'],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </div>
              <p className="subtitle">I secure systems, break barriers, and build resilient products.</p>
              <div className="btn-box">
                <Link to="/hire-me" className="btn btn--primary">{hireMeText}</Link>
                <Link to="/lets-talk" className="btn link-underline">{letsTalkText}</Link>
              </div>
              <div className="badges">
                <span className="badge">Security+</span>
                <span className="badge">OWASP</span>
                <span className="badge">Azure</span>
              </div>
              <SocialMediaIcons />
            </div>
            <div className="hero__right">
              <div className="terminal-card">
                <div className="terminal-card__header">
                  <span className="dot dot--red"></span>
                  <span className="dot dot--yellow"></span>
                  <span className="dot dot--green"></span>
                  <span className="terminal-title">/home/sarthak ~</span>
                </div>
                <div className="terminal-card__body">
                  <pre>
                    <code>{`$ whoami _
> Cybersecurity Engineer | React/Node Developer

$ skills --top
> Network Security, Ethical Hacking, Cryptography, Azure

$ projects --recent
> Slider-based portfolio, Secure contact API, Chatbot

$ contact --open
> email: you@example.com | LinkedIn: /in/sarthak-giri`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;