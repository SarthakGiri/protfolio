import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    priority: 'normal',
    project_type: ''
  });
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [securityStatus, setSecurityStatus] = useState({
    encryption: 'AES-256',
    firewall: 'ACTIVE',
    intrusion_detection: 'ENABLED',
    threat_level: 'GREEN'
  });
  const [connectionStats, setConnectionStats] = useState({
    latency: 23,
    packets_sent: 0,
    packets_received: 0,
    uptime: 0
  });

  const { name, email, message, priority, project_type } = formData;
  const API_BASE = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '';

  useEffect(() => {
    // Initialize terminal logs
    setTerminalLogs([
      '┌─[sarthak@security]─[~/contact]',
      '└──╼ $ ./initialize_secure_channel.sh',
      '',
      '🔐 INITIALIZING ENCRYPTED COMMUNICATION CHANNEL...',
      '✅ SSL/TLS handshake completed',
      '✅ End-to-end encryption established',
      '✅ Firewall rules configured',
      '✅ Intrusion detection active',
      '',
      '🛡️  SECURITY STATUS: ALL SYSTEMS OPERATIONAL',
      '📡 Channel ready for secure transmission',
      '',
      '┌─[sarthak@security]─[~/contact]',
      '└──╼ $ _'
    ]);

    // Update connection stats
    const statsInterval = setInterval(() => {
      setConnectionStats(prev => ({
        latency: 20 + Math.random() * 10,
        packets_sent: prev.packets_sent + Math.floor(Math.random() * 3),
        packets_received: prev.packets_received + Math.floor(Math.random() * 2),
        uptime: prev.uptime + 1
      }));
    }, 1000);

    return () => clearInterval(statsInterval);
  }, []);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear specific field error when user starts typing
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const addTerminalLog = (message) => {
    setTerminalLogs(prev => [
      ...prev,
      '',
      `┌─[sarthak@security]─[~/contact]`,
      `└──╼ $ ${message}`,
      ''
    ]);
  };

  const onSubmit = e => {
    e.preventDefault();
    
    addTerminalLog('validate_form_data --strict');
    
    const nextErrors = {};
    if (!name.trim()) nextErrors.name = 'Name field cannot be empty';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Valid email address required';
    }
    if (!message.trim()) nextErrors.message = 'Message content required';
    if (message.trim().length < 10) nextErrors.message = 'Message too short (minimum 10 characters)';

    setErrors(nextErrors);
    
    if (Object.keys(nextErrors).length) {
      addTerminalLog('❌ Form validation failed');
      setTerminalLogs(prev => [
        ...prev,
        '🚨 VALIDATION ERRORS DETECTED:',
        ...Object.values(nextErrors).map(error => `   └── ${error}`),
        '',
        '┌─[sarthak@security]─[~/contact]',
        '└──╼ $ _'
      ]);
      return;
    }

    setSubmitting(true);
    setStatus(null);
    
    addTerminalLog('encrypt_and_send --secure-channel');
    setTerminalLogs(prev => [
      ...prev,
      '🔐 Encrypting message with AES-256...',
      '📡 Establishing secure connection...',
      '🚀 Transmitting encrypted payload...'
    ]);

    // Simulate encryption delay
    setTimeout(() => {
      axios.post(`${API_BASE}/api/contact`, {
        ...formData,
        timestamp: new Date().toISOString(),
        security_hash: Math.random().toString(36).substring(2, 15),
        client_ip: 'masked_for_privacy'
      })
        .then(response => {
          setStatus({ type: 'success', message: 'TRANSMISSION SUCCESSFUL' });
          setFormData({ name: '', email: '', message: '', priority: 'normal', project_type: '' });
          setTerminalLogs(prev => [
            ...prev,
            '',
            '✅ Message encrypted and transmitted successfully',
            '🔍 Server response: 200 OK',
            '📨 Delivery confirmation received',
            '⏰ Expected response time: 24-48 hours',
            '',
            '┌─[sarthak@security]─[~/contact]',
            '└──╼ $ _'
          ]);
        })
        .catch(error => {
          console.error('Transmission error:', error);
          
          // Fallback to mailto
          const subject = encodeURIComponent(`Portfolio Contact: ${priority.toUpperCase()} - ${project_type || 'General'}`);
          const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPriority: ${priority}\nProject Type: ${project_type}\n\nMessage:\n${message}`);
          
          setStatus({ type: 'info', message: 'SWITCHING TO BACKUP PROTOCOL - OPENING EMAIL CLIENT' });
          setTerminalLogs(prev => [
            ...prev,
            '',
            '❌ Primary transmission failed',
            '🔄 Activating backup protocol',
            '📧 Initializing email gateway...',
            '🚀 Redirecting to secure email channel',
            '',
            '┌─[sarthak@security]─[~/contact]',
            '└──╼ $ _'
          ]);
          
          // Open email after delay
          setTimeout(() => {
            window.location.href = `mailto:programmersarthakg12@gmail.com?subject=${subject}&body=${body}`;
          }, 2000);
        })
        .finally(() => setSubmitting(false));
    }, 1500);
  };

  return (
    <div className="page-container">
      <div className="contact-container">
        <div className="contact-header">
          <div className="header-terminal">
            <span className="prompt">root@security:~/contact$</span>
            <span className="command">./establish_secure_communication</span>
          </div>
          <h2 className="section-title">
            <span className="title-bracket">[</span>
            SECURE COMMUNICATION CHANNEL
            <span className="title-bracket">]</span>
          </h2>
          <div className="security-status">
            <div className="status-grid">
              <div className="status-item">
                <span className="status-label">Encryption:</span>
                <span className="status-value secure">{securityStatus.encryption}</span>
              </div>
              <div className="status-item">
                <span className="status-label">Firewall:</span>
                <span className="status-value active">{securityStatus.firewall}</span>
              </div>
              <div className="status-item">
                <span className="status-label">IDS:</span>
                <span className="status-value enabled">{securityStatus.intrusion_detection}</span>
              </div>
              <div className="status-item">
                <span className="status-label">Threat Level:</span>
                <span className="status-value safe">{securityStatus.threat_level}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-layout">
          <div className="contact-form-section">
            <div className="form-terminal">
              <div className="terminal-header">
                <div className="terminal-controls">
                  <span className="control-dot control-red"></span>
                  <span className="control-dot control-yellow"></span>
                  <span className="control-dot control-green"></span>
                </div>
                <div className="terminal-title">secure_message_composer.exe</div>
              </div>

              <div className="terminal-body">
                {status && (
                  <div className={`transmission-status ${status.type}`}>
                    <div className="status-icon">
                      {status.type === 'success' ? '✅' : '❌'}
                    </div>
                    <div className="status-message">{status.message}</div>
                  </div>
                )}

                <form className="secure-form" onSubmit={onSubmit} noValidate>
                  <div className="form-section">
                    <h3 className="section-header">
                      <span className="section-icon">👤</span>
                      SENDER IDENTIFICATION
                    </h3>
                    
                    <div className="input-group">
                      <label className="input-label">
                        <span className="label-prompt">$</span>
                        <span className="label-text">name --required</span>
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="text" 
                          name="name" 
                          value={name} 
                          onChange={onChange}
                          className={`secure-input ${errors.name ? 'error' : ''}`}
                          placeholder="Enter your full name"
                          autoComplete="name"
                        />
                        <span className="input-cursor">|</span>
                      </div>
                      {errors.name && <div className="error-message">❌ {errors.name}</div>}
                    </div>

                    <div className="input-group">
                      <label className="input-label">
                        <span className="label-prompt">$</span>
                        <span className="label-text">email --verified</span>
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="email" 
                          name="email" 
                          value={email} 
                          onChange={onChange}
                          className={`secure-input ${errors.email ? 'error' : ''}`}
                          placeholder="your.email@domain.com"
                          autoComplete="email"
                        />
                        <span className="input-cursor">|</span>
                      </div>
                      {errors.email && <div className="error-message">❌ {errors.email}</div>}
                    </div>
                  </div>

                  <div className="form-section">
                    <h3 className="section-header">
                      <span className="section-icon">📋</span>
                      MESSAGE CONFIGURATION
                    </h3>

                    <div className="input-row">
                      <div className="input-group">
                        <label className="input-label">
                          <span className="label-prompt">$</span>
                          <span className="label-text">priority --level</span>
                        </label>
                        <select 
                          name="priority" 
                          value={priority} 
                          onChange={onChange}
                          className="secure-select"
                        >
                          <option value="low">LOW - General inquiry</option>
                          <option value="normal">NORMAL - Standard request</option>
                          <option value="high">HIGH - Urgent matter</option>
                          <option value="critical">CRITICAL - Emergency</option>
                        </select>
                      </div>

                      <div className="input-group">
                        <label className="input-label">
                          <span className="label-prompt">$</span>
                          <span className="label-text">project_type --category</span>
                        </label>
                        <select 
                          name="project_type" 
                          value={project_type} 
                          onChange={onChange}
                          className="secure-select"
                        >
                          <option value="">Select project type</option>
                          <option value="security_audit">Security Audit</option>
                          <option value="penetration_testing">Penetration Testing</option>
                          <option value="web_development">Web Development</option>
                          <option value="consultation">Security Consultation</option>
                          <option value="collaboration">Collaboration</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="input-group">
                      <label className="input-label">
                        <span className="label-prompt">$</span>
                        <span className="label-text">message --encrypted</span>
                      </label>
                      <div className="textarea-wrapper">
                        <textarea 
                          name="message" 
                          value={message} 
                          onChange={onChange}
                          className={`secure-textarea ${errors.message ? 'error' : ''}`}
                          placeholder="Enter your secure message here... (minimum 10 characters)"
                          rows="6"
                        />
                        <div className="textarea-footer">
                          <span className="char-count">{message.length} characters</span>
                          <span className="encryption-status">🔐 AES-256 Encrypted</span>
                        </div>
                      </div>
                      {errors.message && <div className="error-message">❌ {errors.message}</div>}
                    </div>
                  </div>

                  <div className="form-actions">
                    <button 
                      type="submit" 
                      disabled={submitting}
                      className={`transmit-button ${submitting ? 'transmitting' : ''}`}
                    >
                      <span className="button-icon">
                        {submitting ? '📡' : '🚀'}
                      </span>
                      <span className="button-text">
                        {submitting ? 'ENCRYPTING & TRANSMITTING...' : 'ENCRYPT & TRANSMIT'}
                      </span>
                      {submitting && <span className="loading-spinner"></span>}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="terminal-logs-section">
            <div className="connection-stats">
              <div className="stats-header">
                <span className="stats-icon">📊</span>
                CONNECTION STATISTICS
              </div>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-label">Latency:</span>
                  <span className="stat-value">{connectionStats.latency.toFixed(1)}ms</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Packets Sent:</span>
                  <span className="stat-value">{connectionStats.packets_sent}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Packets RX:</span>
                  <span className="stat-value">{connectionStats.packets_received}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Uptime:</span>
                  <span className="stat-value">{Math.floor(connectionStats.uptime / 60)}m {connectionStats.uptime % 60}s</span>
                </div>
              </div>
            </div>

            <div className="logs-terminal">
              <div className="terminal-header">
                <div className="terminal-controls">
                  <span className="control-dot control-red"></span>
                  <span className="control-dot control-yellow"></span>
                  <span className="control-dot control-green"></span>
                </div>
                <div className="terminal-title">security@logs: ~/contact</div>
              </div>
              
              <div className="terminal-body">
                <div className="logs-content">
                  {terminalLogs.map((log, idx) => (
                    <div key={idx} className="log-line">
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="info-header">
                <span className="info-icon">📞</span>
                DIRECT ACCESS CHANNELS
              </div>
              <div className="info-content">
                <div className="info-item">
                  <span className="info-label">Email:</span>
                  <a href="mailto:programmersarthakg12@gmail.com" className="info-link">
                    programmersarthakg12@gmail.com
                  </a>
                </div>
                <div className="info-item">
                  <span className="info-label">LinkedIn:</span>
                  <a href="https://www.linkedin.com/in/sarthak-giri-7b0686108/" target="_blank" rel="noopener noreferrer" className="info-link">
                    /in/sarthak-giri-7b0686108
                  </a>
                </div>
                <div className="info-item">
                  <span className="info-label">GitHub:</span>
                  <a href="https://github.com/SarthakGiri" target="_blank" rel="noopener noreferrer" className="info-link">
                    github.com/SarthakGiri
                  </a>
                </div>
                <div className="info-item">
                  <span className="info-label">Response Time:</span>
                  <span className="info-value">24-48 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;