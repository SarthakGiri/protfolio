import React from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      matrixRain: []
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Generate matrix rain effect
    const rain = [];
    for (let i = 0; i < 50; i++) {
      rain.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4
      });
    }
    this.setState({ matrixRain: rain });

    // Log error for debugging
    console.error('🚨 System Breach Detected:', error, errorInfo);
  }

  handleReboot = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null,
      matrixRain: []
    });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          {/* Matrix Rain Background */}
          <div className="matrix-rain">
            {this.state.matrixRain.map(drop => (
              <div
                key={drop.id}
                className="matrix-drop"
                style={{
                  left: `${drop.x}%`,
                  animationDelay: `${drop.delay}s`,
                  animationDuration: `${drop.duration}s`
                }}
              >
                {Array.from({ length: 20 }, (_, i) => (
                  <span key={i} className="matrix-char">
                    {String.fromCharCode(0x30A0 + Math.random() * 96)}
                  </span>
                ))}
              </div>
            ))}
          </div>

          {/* Error Terminal */}
          <div className="error-terminal">
            <div className="terminal-header">
              <div className="terminal-controls">
                <span className="control-dot red pulsing"></span>
                <span className="control-dot yellow"></span>
                <span className="control-dot green"></span>
              </div>
              <div className="terminal-title">SECURITY BREACH DETECTED</div>
            </div>

            <div className="terminal-body">
              <div className="breach-alert">
                <div className="alert-icon">⚠️</div>
                <h1 className="breach-title">SYSTEM COMPROMISED</h1>
                <div className="breach-subtitle">Unauthorized access attempt intercepted</div>
              </div>

              <div className="error-details">
                <div className="error-section">
                  <div className="section-header">
                    <span className="prompt">root@security:~$</span>
                    <span className="command">cat error.log</span>
                  </div>
                  <div className="error-log">
                    <div className="log-line error">
                      ERROR: {this.state.error && this.state.error.toString()}
                    </div>
                    <div className="log-line warning">
                      STACK_TRACE: Component malfunction detected
                    </div>
                    <div className="log-line info">
                      STATUS: Firewall active, intrusion contained
                    </div>
                    <div className="log-line success">
                      RECOMMENDATION: Initiate system reboot sequence
                    </div>
                  </div>
                </div>

                <div className="error-section">
                  <div className="section-header">
                    <span className="prompt">root@security:~$</span>
                    <span className="command">nmap -sV localhost</span>
                  </div>
                  <div className="scan-output">
                    <div className="scan-line">Starting Nmap scan...</div>
                    <div className="scan-line">Host is up (0.00042s latency)</div>
                    <div className="scan-line">PORT     STATE    SERVICE</div>
                    <div className="scan-line">3000/tcp open     portfolio</div>
                    <div className="scan-line">443/tcp  open     https</div>
                    <div className="scan-line">Status: SECURE ✅</div>
                  </div>
                </div>
              </div>

              <div className="recovery-options">
                <h3>🛡️ Recovery Protocols Available:</h3>
                <div className="protocols">
                  <div className="protocol">
                    <span className="protocol-icon">🔄</span>
                    <span className="protocol-name">System Reboot</span>
                    <span className="protocol-status">RECOMMENDED</span>
                  </div>
                  <div className="protocol">
                    <span className="protocol-icon">🏠</span>
                    <span className="protocol-name">Return to Base</span>
                    <span className="protocol-status">AVAILABLE</span>
                  </div>
                  <div className="protocol">
                    <span className="protocol-icon">📧</span>
                    <span className="protocol-name">Report Issue</span>
                    <span className="protocol-status">READY</span>
                  </div>
                </div>
              </div>

              <div className="action-buttons">
                <button 
                  className="reboot-btn" 
                  onClick={this.handleReboot}
                >
                  <span className="btn-icon">🔄</span>
                  INITIATE REBOOT
                </button>
                <a 
                  href="/" 
                  className="home-btn"
                >
                  <span className="btn-icon">🏠</span>
                  SECURE RETURN
                </a>
                <a 
                  href="mailto:programmersarthakg12@gmail.com?subject=Portfolio%20Error%20Report"
                  className="report-btn"
                >
                  <span className="btn-icon">📧</span>
                  REPORT BREACH
                </a>
              </div>
            </div>
          </div>

          {/* Glitch Effects */}
          <div className="glitch-overlay">
            <div className="glitch-line" style={{ top: '20%', animationDelay: '0s' }}></div>
            <div className="glitch-line" style={{ top: '45%', animationDelay: '1.5s' }}></div>
            <div className="glitch-line" style={{ top: '70%', animationDelay: '3s' }}></div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
