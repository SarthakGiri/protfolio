import React, { useEffect , useState} from 'react';
import './HomePage.css';
import MatrixRain from './MatrixRain';
import Typewriter from 'typewriter-effect';
import { Link } from 'react-router-dom';
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

  const [hireMeTrigger, setHireMeTrigger] = useState(false);
  const [letsTalkTrigger, setLetsTalkTrigger] = useState(false);

  const hireMeText = useScramble("Hire me", hireMeTrigger);
  const letsTalkText = useScramble("Let's Talk", letsTalkTrigger);

  useEffect(() => {
    const interval = setInterval(() => {
      setHireMeTrigger(!hireMeTrigger);
      setLetsTalkTrigger(!letsTalkTrigger);
    }, 1000);

    return () => clearInterval(interval);
  }, [hireMeTrigger, letsTalkTrigger]);

  return (
    <div>
      <canvas id="canvas"></canvas>
      <section className="home">
        <div className="home-content">
          <div className="typewriter-container">
            <Typewriter
              options={{
                strings: ['This is Sarthak Giri', 'CyberSecurity Engineer', 'Bachelors Of Network And CyberSecurity'],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
          <div className="btn-box">
            <Link to="/hire-me" className="glitch-btn" data-text={hireMeText}>{hireMeText}</Link>
            <Link to="/lets-talk" className="glitch-btn" data-text={letsTalkText}>{letsTalkText}</Link>
          </div>
          <SocialMediaIcons />
        </div>
      </section>
    </div>
  );
};

export default HomePage;