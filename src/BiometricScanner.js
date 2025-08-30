import React, { useState, useEffect } from 'react';
import './BiometricScanner.css';

const BiometricScanner = ({ onScanComplete, isActive = false }) => {
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStage, setScanStage] = useState('idle'); // idle, scanning, analyzing, complete
  const [fingerprintData, setFingerprintData] = useState([]);
  const [retinaScan, setRetinaScan] = useState(false);
  const [voicePrint, setVoicePrint] = useState(false);

  useEffect(() => {
    if (isActive && scanStage === 'idle') {
      startBiometricScan();
    }
  }, [isActive]);

  const generateFingerprintPattern = () => {
    const patterns = [];
    for (let i = 0; i < 8; i++) {
      patterns.push({
        id: i,
        x: Math.random() * 200,
        y: Math.random() * 200,
        type: Math.random() > 0.5 ? 'ridge' : 'valley',
        angle: Math.random() * 360
      });
    }
    return patterns;
  };

  const startBiometricScan = () => {
    setScanStage('scanning');
    setScanProgress(0);
    setFingerprintData(generateFingerprintPattern());

    // Simulate fingerprint scanning
    const fingerprintInterval = setInterval(() => {
      setScanProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(fingerprintInterval);
          setScanStage('analyzing');
          
          // Start retina and voice analysis
          setTimeout(() => setRetinaScan(true), 500);
          setTimeout(() => setVoicePrint(true), 1000);
          
          // Complete scan
          setTimeout(() => {
            setScanStage('complete');
            onScanComplete && onScanComplete({
              fingerprint: true,
              retina: true,
              voice: true,
              confidence: 98.7
            });
          }, 2500);
          
          return 100;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(fingerprintInterval);
  };

  const getScanStatusText = () => {
    switch (scanStage) {
      case 'scanning':
        return 'Scanning fingerprint patterns...';
      case 'analyzing':
        return 'Analyzing biometric data...';
      case 'complete':
        return 'Identity verified - Access granted';
      default:
        return 'Place finger on scanner';
    }
  };

  const getScanColor = () => {
    switch (scanStage) {
      case 'scanning':
        return '#00eaff';
      case 'analyzing':
        return '#ff9500';
      case 'complete':
        return '#00ff88';
      default:
        return '#666';
    }
  };

  return (
    <div className={`biometric-scanner ${isActive ? 'active' : ''} ${scanStage}`}>
      <div className="scanner-container">
        
        {/* Header */}
        <div className="scanner-header">
          <div className="scanner-title">BIOMETRIC AUTHENTICATION</div>
          <div className="scanner-status">
            <div className={`status-dot ${scanStage}`}></div>
            <span>{getScanStatusText()}</span>
          </div>
        </div>

        {/* Main Scanner Area */}
        <div className="scanner-main">
          
          {/* Fingerprint Scanner */}
          <div className="fingerprint-scanner">
            <div className="scanner-glass">
              <div className="fingerprint-pattern">
                {fingerprintData.map((point) => (
                  <div
                    key={point.id}
                    className={`pattern-point ${point.type}`}
                    style={{
                      left: `${point.x}px`,
                      top: `${point.y}px`,
                      transform: `rotate(${point.angle}deg)`
                    }}
                  />
                ))}
              </div>
              
              {/* Scanning Grid */}
              <div className="scanning-grid">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="grid-line horizontal" style={{ top: `${i * 10}%` }} />
                ))}
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="grid-line vertical" style={{ left: `${i * 10}%` }} />
                ))}
              </div>
              
              {/* Scan Line */}
              {scanStage === 'scanning' && (
                <div className="scan-line" style={{ '--scan-color': getScanColor() }} />
              )}
              
              {/* Scanner Reticle */}
              <div className="scanner-reticle">
                <div className="reticle-corner top-left"></div>
                <div className="reticle-corner top-right"></div>
                <div className="reticle-corner bottom-left"></div>
                <div className="reticle-corner bottom-right"></div>
              </div>
            </div>
            
            {/* Progress Ring */}
            <div className="progress-ring">
              <svg width="260" height="260">
                <circle
                  cx="130"
                  cy="130"
                  r="125"
                  fill="none"
                  stroke="rgba(0, 234, 255, 0.1)"
                  strokeWidth="3"
                />
                <circle
                  cx="130"
                  cy="130"
                  r="125"
                  fill="none"
                  stroke={getScanColor()}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 125}`}
                  strokeDashoffset={`${2 * Math.PI * 125 * (1 - scanProgress / 100)}`}
                  style={{ transition: 'stroke-dashoffset 0.1s ease' }}
                />
              </svg>
              <div className="progress-text">
                {Math.round(scanProgress)}%
              </div>
            </div>
          </div>

          {/* Additional Biometric Scanners */}
          <div className="additional-scanners">
            
            {/* Retina Scanner */}
            <div className={`retina-scanner ${retinaScan ? 'active' : ''}`}>
              <div className="scanner-icon">👁️</div>
              <div className="scanner-label">Retina Scan</div>
              <div className="scanner-result">
                {retinaScan ? '✓ Verified' : '○ Pending'}
              </div>
            </div>

            {/* Voice Print */}
            <div className={`voice-scanner ${voicePrint ? 'active' : ''}`}>
              <div className="scanner-icon">🎤</div>
              <div className="scanner-label">Voice Print</div>
              <div className="scanner-result">
                {voicePrint ? '✓ Verified' : '○ Pending'}
              </div>
            </div>

            {/* DNA Sequence (decorative) */}
            <div className={`dna-scanner ${scanStage === 'complete' ? 'active' : ''}`}>
              <div className="scanner-icon">🧬</div>
              <div className="scanner-label">DNA Match</div>
              <div className="scanner-result">
                {scanStage === 'complete' ? '✓ 99.7%' : '○ Standby'}
              </div>
            </div>
          </div>
        </div>

        {/* Security Metrics */}
        <div className="security-metrics">
          <div className="metric">
            <span className="metric-label">Encryption:</span>
            <span className="metric-value">AES-256</span>
          </div>
          <div className="metric">
            <span className="metric-label">Confidence:</span>
            <span className="metric-value">
              {scanStage === 'complete' ? '98.7%' : '--'}
            </span>
          </div>
          <div className="metric">
            <span className="metric-label">Security Level:</span>
            <span className="metric-value">
              {scanStage === 'complete' ? 'MAXIMUM' : 'SCANNING'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiometricScanner;
