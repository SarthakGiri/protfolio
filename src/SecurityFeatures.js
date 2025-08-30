import React, { useState, useEffect } from 'react';
import './SecurityFeatures.css';

const SecurityFeatures = () => {
  const [threatLevel, setThreatLevel] = useState('GREEN');
  const [activeScan, setActiveScan] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [securityStats, setSecurityStats] = useState({
    threatsBlocked: 0,
    vulnerabilitiesPatched: 47,
    securityScore: 98.7,
    lastScan: new Date().toISOString()
  });

  const [logs, setLogs] = useState([
    '[INIT] Security monitoring system initialized',
    '[INFO] Firewall rules loaded: 2,847 active rules',
    '[INFO] IDS/IPS system online',
    '[INFO] SSL/TLS certificates validated',
    '[SUCCESS] All security systems operational'
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecurityStats(prev => ({
        ...prev,
        threatsBlocked: prev.threatsBlocked + Math.floor(Math.random() * 3),
        securityScore: Math.max(95, Math.min(100, prev.securityScore + (Math.random() - 0.5) * 0.1))
      }));

      // Randomly add security logs
      if (Math.random() > 0.7) {
        const newLogs = [
          '[BLOCKED] Attempted port scan from 192.168.1.100',
          '[ALERT] SQL injection attempt detected and blocked',
          '[INFO] Certificate rotation completed successfully',
          '[SCAN] Vulnerability scan completed - 0 critical issues',
          '[UPDATE] Security patches applied automatically',
          '[MONITOR] Network traffic analysis complete',
          '[SECURE] Encryption protocols validated'
        ];
        
        setLogs(prev => {
          const newLog = newLogs[Math.floor(Math.random() * newLogs.length)];
          const timestamp = new Date().toLocaleTimeString();
          return [`[${timestamp}] ${newLog}`, ...prev.slice(0, 19)];
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const runSecurityScan = () => {
    setActiveScan(true);
    setLogs(prev => [
      '[SCAN] Initiating comprehensive security scan...',
      '[SCAN] Analyzing network topology...',
      '[SCAN] Checking for vulnerabilities...',
      '[SCAN] Validating security configurations...',
      ...prev
    ]);

    setTimeout(() => {
      setActiveScan(false);
      setThreatLevel(['GREEN', 'YELLOW', 'GREEN', 'GREEN'][Math.floor(Math.random() * 4)]);
      setLogs(prev => [
        '[COMPLETE] Security scan finished - System secure',
        '[REPORT] 0 critical vulnerabilities found',
        '[INFO] Security score updated',
        ...prev
      ]);
    }, 5000);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={`security-features ${isVisible ? 'visible' : 'minimized'}`}>
      <div className="security-header">
        <h2 className="security-title">
          <span className="title-icon">🛡️</span>
          PORTFOLIO DEFENSE SYSTEM
        </h2>
        <div className="header-controls">
          <div className="threat-level">
            <span className="threat-label">THREAT LEVEL:</span>
            <span className={`threat-indicator threat-${threatLevel.toLowerCase()}`}>
              {threatLevel}
            </span>
          </div>
          <button className="minimize-btn" onClick={toggleVisibility} aria-label="Toggle security monitor">
            {isVisible ? '─' : '□'}
          </button>
        </div>
      </div>

      <div className="security-grid">
        <div className="security-stats">
          <div className="stat-card">
            <div className="stat-icon">🚫</div>
            <div className="stat-content">
              <div className="stat-value">{securityStats.threatsBlocked}</div>
              <div className="stat-label">Threats Blocked</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">🔧</div>
            <div className="stat-content">
              <div className="stat-value">{securityStats.vulnerabilitiesPatched}</div>
              <div className="stat-label">Vulnerabilities Patched</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-value">{securityStats.securityScore.toFixed(1)}%</div>
              <div className="stat-label">Security Score</div>
            </div>
          </div>
        </div>

        <div className="security-logs">
          <div className="logs-header">
            <span className="logs-title">🔍 SECURITY LOGS</span>
            <button 
              onClick={runSecurityScan}
              disabled={activeScan}
              className={`scan-button ${activeScan ? 'scanning' : ''}`}
            >
              {activeScan ? 'SCANNING...' : 'RUN SCAN'}
            </button>
          </div>
          <div className="logs-content">
            {logs.map((log, index) => (
              <div key={index} className="log-entry">
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityFeatures;
