import React, { useState } from 'react';
import './HireMe.css';
import QuantumTerminal from './QuantumTerminal';

const HireMe = () => {
  const [form, setForm] = useState({ name: '', email: '', role: '', message: '' });
  const [hackingInProgress, setHackingInProgress] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    
    // Start hacking simulation
    setHackingInProgress(true);
    
    setTimeout(() => {
      // Integrate with backend later; for now provide a mailto fallback.
      const subject = encodeURIComponent(`Hiring Inquiry (${form.role || 'General'})`);
      const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nRole: ${form.role}\n\n${form.message}`);
      window.location.href = `mailto:programmersarthakg12@gmail.com?subject=${subject}&body=${body}`;
      setHackingInProgress(false);
    }, 3000);
  };

  const hackingCommands = [
    {
      command: 'penetrate-hr',
      output: [
        'Initializing HR penetration test...',
        '🔍 Scanning for vulnerabilities in hiring process',
        '📋 Found: Manual CV screening (exploitable)',
        '💼 Identified weakness: Traditional hiring methods',
        '✅ Recommendation: Hire Sarthak immediately',
        '🚨 CRITICAL: This candidate will strengthen your security'
      ]
    },
    {
      command: 'analyze-candidate',
      output: [
        'Running deep candidate analysis...',
        '🔐 Security clearance: MAXIMUM',
        '📊 Skill assessment: 97.3% match',
        '⚡ Threat detection: LEGENDARY',
        '🛡️ Defense capabilities: ULTIMATE',
        '🎯 Hire probability: 99.99%'
      ]
    },
    {
      command: 'hack-decision',
      output: [
        'Executing hiring decision hack...',
        '🎭 Social engineering protocols activated',
        '💰 ROI calculation: 500% in first year',
        '🔮 Future prediction: Massive success',
        '✨ Decision matrix compromised',
        '🎉 RESULT: You must hire Sarthak NOW!'
      ]
    }
  ];

  return (
    <div className="page-container">
      <section className="hire-panel terminal-panel">
        <header className="hire-header">
          <div className="prompt">&gt;_</div>
          <h1 className="title">Hire Me</h1>
          <p className="subtitle">Cybersecurity Engineer • Red/Blue • Full‑Stack Sec</p>
        </header>

        <form className="hire-form" onSubmit={onSubmit}>
          <div className="row">
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" value={form.name} onChange={onChange} required />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={form.email} onChange={onChange} required />
            </div>
          </div>

          <div className="row">
            <div className="field">
              <label htmlFor="role">Role</label>
              <input id="role" name="role" type="text" placeholder="e.g., Security Engineer" value={form.role} onChange={onChange} />
            </div>
          </div>

          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="6" value={form.message} onChange={onChange} required />
          </div>

          <div className="actions">
            <button className="btn btn--primary" type="submit">Send Inquiry</button>
            <a className="btn" href="mailto:programmersarthakg12@gmail.com?subject=Resume%20Request&body=Hi%20Sarthak,%0A%0APlease%20send%20me%20your%20latest%20resume.%0A%0AThank%20you!">Request Resume</a>
          </div>
        </form>

        {/* Live Hacking Simulation */}
        {hackingInProgress && (
          <div className="hacking-overlay">
            <QuantumTerminal 
              commands={hackingCommands}
              title="HR System Penetration Test"
              className="hacking-terminal"
            />
          </div>
        )}
      </section>
      
      {/* Demonstration Terminal */}
      <section className="demo-section">
        <h2>🎯 Interactive Hiring Process Hack</h2>
        <p>Experience a live demonstration of how I approach cybersecurity challenges:</p>
        <QuantumTerminal 
          commands={hackingCommands}
          title="Hiring Decision Matrix - Quantum Terminal"
          className="demo-terminal"
        />
      </section>
    </div>
  );
};

export default HireMe;
