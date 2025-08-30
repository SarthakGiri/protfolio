import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const loadingPhases = [
    { text: 'Initializing Quantum Core...', duration: 800 },
    { text: 'Loading Neural Networks...', duration: 600 },
    { text: 'Establishing Secure Tunnels...', duration: 700 },
    { text: 'Calibrating Cyber Defenses...', duration: 500 },
    { text: 'Activating Holographic Interface...', duration: 600 },
    { text: 'System Ready!', duration: 400 }
  ];

  useEffect(() => {
    let progressInterval;
    let phaseTimeout;

    const startLoading = () => {
      // Simulate loading progress
      progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + Math.random() * 15;
          return newProgress >= 100 ? 100 : newProgress;
        });
      }, 100);

      // Handle phase transitions
      const cyclePhases = (index = 0) => {
        if (index < loadingPhases.length) {
          setCurrentPhase(index);
          phaseTimeout = setTimeout(() => {
            cyclePhases(index + 1);
          }, loadingPhases[index].duration);
        } else {
          // Loading complete
          setIsComplete(true);
          setTimeout(() => {
            onLoadingComplete();
          }, 500);
        }
      };

      cyclePhases();
    };

    startLoading();

    // Cleanup
    return () => {
      if (progressInterval) clearInterval(progressInterval);
      if (phaseTimeout) clearTimeout(phaseTimeout);
    };
  }, [onLoadingComplete]);

  return (
    <div className={`loading-screen ${isComplete ? 'fade-out' : ''}`}>
      <div className="loading-container">
        {/* Quantum Loader */}
        <div className="quantum-loader">
          <div className="quantum-ring ring-1"></div>
          <div className="quantum-ring ring-2"></div>
          <div className="quantum-ring ring-3"></div>
          <div className="quantum-core">
            <div className="core-pulse"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="loading-content">
          <h1 className="loading-title">SARTHAK.SEC</h1>
          <div className="loading-phase">
            {loadingPhases[currentPhase]?.text}
          </div>
          
          {/* Progress Bar */}
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
              <div className="progress-glow"></div>
            </div>
            <div className="progress-text">
              {Math.round(Math.min(progress, 100))}%
            </div>
          </div>

          {/* System Status */}
          <div className="system-status">
            <div className="status-grid">
              <div className="status-item">
                <span className="status-dot active"></span>
                <span>Neural Networks</span>
              </div>
              <div className="status-item">
                <span className="status-dot active"></span>
                <span>Quantum Core</span>
              </div>
              <div className="status-item">
                <span className="status-dot active"></span>
                <span>Security Layer</span>
              </div>
              <div className="status-item">
                <span className={`status-dot ${progress > 80 ? 'active' : ''}`}></span>
                <span>Holographic UI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Particles */}
        <div className="loading-particles">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
