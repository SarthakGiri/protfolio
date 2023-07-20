import React, { useState } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';



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

const HomePage = () => (
  <div>
    
    <section className="home">
      <div className="home-content">
        <h1>This is Sarthak Giri</h1>
        <h3>CyberSecurity Engineer</h3>
        <p>Bachelors Of Network And CyberSecurity</p>
        <div className="btn-box">
          <button>Hire me</button>
          <button>Lets Talk</button>
        </div>
        <SocialMediaIcons />
      </div>
    </section>
  </div>
);

export default HomePage;
