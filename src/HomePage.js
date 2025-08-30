import React, { useEffect, useState } from 'react';
import './HomePage.css';
import MatrixRain from './MatrixRain';
import Typewriter from 'typewriter-effect';
import { Link } from 'react-router-dom';

const SocialMediaIcons = () => (
  <div className="home-sci">
    <a href="https://github.com/sarthakgiri" target="_blank" rel="noopener noreferrer" title="GitHub">
      <span className="social-icon">⚡</span>
      <span className="social-label">github</span>
    </a>
    <a href="https://www.linkedin.com/in/sarthak-giri-7b0686108/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
      <span className="social-icon">💼</span>
      <span className="social-label">linkedin</span>
    </a>
    <a href="https://twitter.com/sarthak_sec" target="_blank" rel="noopener noreferrer" title="Twitter">
      <span className="social-icon">🐦</span>
      <span className="social-label">twitter</span>
    </a>
    <a href="mailto:sarthak@security.com" target="_blank" rel="noopener noreferrer" title="Email">
      <span className="social-icon">📧</span>
      <span className="social-label">email</span>
    </a>
  </div>
);

const HomePage = () => {
  const [currentCommand, setCurrentCommand] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  useEffect(() => { 
    const cleanup = MatrixRain(); 
    return cleanup; 
  }, []);

  useEffect(() => {
    const commands = ['ssh sarthak@portfolio', 'cat skills.txt', 'ls projects/', 'ping contact.sh'];
    let commandIndex = 0;
    
    const typeCommand = () => {
      const command = commands[commandIndex];
      let charIndex = 0;
      setIsTyping(true);
      setCurrentCommand('');
      
      const typingInterval = setInterval(() => {
        if (charIndex < command.length) {
          setCurrentCommand(command.slice(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            setIsTyping(false);
            commandIndex = (commandIndex + 1) % commands.length;
            setTimeout(typeCommand, 2000);
          }, 1500);
        }
      }, 100);
    };

    const initialTimer = setTimeout(typeCommand, 1000);
    return () => clearTimeout(initialTimer);
  }, []);

  return (
    <div className="page-container">
      <canvas id="matrix-canvas"></canvas>
      <section className="home">
        <div className="home-content">
          <div className="hero">
            <div className="hero__left">
              <div className="pretitle">
                <span className="prompt">root@security:~$</span>
                <span className="command">{currentCommand}</span>
                <span className={`cursor ${isTyping ? 'typing' : ''}`}>_</span>
              </div>
              <h1 className="title">
                <span className="title-bracket">[</span>
                Sarthak Giri
                <span className="title-bracket">]</span>
              </h1>
              <div className="headline typewriter-container">
                <Typewriter
                  options={{
                    strings: [
                      'Cybersecurity Engineer',
                      'Ethical Hacker | OSCP',
                      'Full-Stack Developer',
                      'Azure Security Specialist',
                      'Penetration Tester'
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 50,
                    deleteSpeed: 30,
                  }}
                />
              </div>
              <p className="subtitle">
                Breaking systems to secure them. Building resilient architectures in the digital battlefield.
              </p>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-number">3+</span>
                  <span className="stat-label">Years Security</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Vulns Found</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">99.9%</span>
                  <span className="stat-label">Uptime</span>
                </div>
              </div>
              <div className="btn-box">
                <Link to="/hire-me" className="btn btn--primary">
                  <span className="btn-icon">⚡</span>
                  Initialize Contact
                </Link>
                <Link to="/projects" className="btn btn--secondary">
                  <span className="btn-icon">📁</span>
                  View Arsenal
                </Link>
              </div>
              <div className="badges">
                <span className="badge">Security+</span>
                <span className="badge">OSCP</span>
                <span className="badge">Azure</span>
                <span className="badge">OWASP</span>
                <span className="badge">Kali Linux</span>
              </div>
              <SocialMediaIcons />
            </div>
            <div className="hero__right">
              <div className="terminal-card">
                <div className="terminal-card__header">
                  <span className="dot dot--red"></span>
                  <span className="dot dot--yellow"></span>
                  <span className="dot dot--green"></span>
                  <span className="terminal-title">sarthak@security: ~</span>
                </div>
                <div className="terminal-card__body">
                  <pre>
                    <code>{`┌─[sarthak@security]─[~]
└──╼ $ cat /etc/passwd | grep sarthak
sarthak:x:1337:1337:Cybersecurity Engineer:/home/sarthak:/bin/bash

┌─[sarthak@security]─[~]
└──╼ $ nmap -sV localhost
PORT     STATE SERVICE    VERSION
22/tcp   open  ssh        OpenSSH 8.9
80/tcp   open  http       nginx/1.21.6
443/tcp  open  ssl/https  nginx/1.21.6
3389/tcp open  ms-wbt     Microsoft Terminal

┌─[sarthak@security]─[~]
└──╼ $ whoami --capabilities
PENTESTER | DEVELOPER | GUARDIAN`}
                    </code>
                  </pre>
                  <div className="terminal-cursor">█</div>
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