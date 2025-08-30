import React, { useState, useEffect } from "react";
import './Projects.css';
import HolographicCard from './HolographicCard';

const projects = [
  {
    id: "project_001",
    title: "Zero Waste Toolkit",
    imageUrl: "/wastetoolkit.png",
    description: "Environmental assistant that identifies the correct bin for waste and promotes sustainable habits.",
    techDetails: [
      "React.js frontend with responsive design",
      "Material identification algorithm",
      "Real-time waste sorting guidance",
      "Environmental impact tracking"
    ],
    features: [
      "Smart bin identification",
      "Sustainability metrics",
      "Mobile-first design",
      "Offline capability"
    ],
    tags: ["React", "Sustainability", "PWA", "UX/UI"],
    status: "DEPLOYED",
    lines: "2,847",
    demo: "https://wastetoolkit.vercel.app",
    code: "https://github.com/sarthakgiri/waste-toolkit",
    vulnerability: "LOW"
  },
  {
    id: "project_002", 
    title: "SafetyNet Scanner",
    imageUrl: "/safetychecker.png",
    description: "Advanced web security scanner that analyzes websites for potential threats using DNS lookups and threat intelligence.",
    techDetails: [
      "DNS-over-HTTPS implementation",
      "Threat intelligence integration",
      "Real-time reputation analysis",
      "Security headers validation"
    ],
    features: [
      "Multi-layer threat detection",
      "SSL/TLS certificate analysis",
      "Malware signature scanning",
      "Phishing detection engine"
    ],
    tags: ["Node.js", "Security", "DNS", "Threat Intel"],
    status: "ACTIVE",
    lines: "3,291",
    demo: "https://safetynet-scanner.vercel.app",
    code: "https://github.com/sarthakgiri/safety-scanner",
    vulnerability: "CRITICAL"
  },
  {
    id: "project_003",
    title: "SecureChat Protocol",
    imageUrl: "/project1.png",
    description: "End-to-end encrypted messaging system with advanced cryptographic protocols and zero-knowledge authentication.",
    techDetails: [
      "Signal Protocol implementation",
      "Perfect Forward Secrecy (PFS)",
      "Zero-knowledge proof system",
      "Quantum-resistant encryption"
    ],
    features: [
      "E2E encryption",
      "Disappearing messages",
      "Voice & video calls",
      "Anonymous authentication"
    ],
    tags: ["Cryptography", "WebRTC", "Security", "Privacy"],
    status: "DEVELOPMENT",
    lines: "5,672",
    demo: "#",
    code: "https://github.com/sarthakgiri/secure-chat",
    vulnerability: "HIGH"
  }
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [terminalLines, setTerminalLines] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');

  useEffect(() => {
    // Initialize terminal with welcome message
    setTerminalLines([
      "┌─[sarthak@security]─[~/projects]",
      "└──╼ $ ls -la --sort=date",
      "",
      "total 3 directories, 12 files",
      "drwxr-xr-x 2 sarthak security 4096 Dec 15 10:30 .",
      "drwxr-xr-x 3 sarthak security 4096 Dec 15 10:29 ..",
      "-rw-r--r-- 1 sarthak security 2847 Dec 14 15:22 zero-waste-toolkit/",
      "-rw-r--r-- 1 sarthak security 3291 Dec 13 09:45 safetynet-scanner/", 
      "-rw-r--r-- 1 sarthak security 5672 Dec 12 18:30 secure-chat-protocol/",
      "",
      "┌─[sarthak@security]─[~/projects]",
      "└──╼ $ cat README.md",
      "",
      "# PROJECT ARSENAL",
      "## Status: 3 Active | 2 Deployed | 1 Development",
      "## Security Level: CLASSIFIED",
      "",
      "┌─[sarthak@security]─[~/projects]",
      "└──╼ $ _"
    ]);
  }, []);

  const handleProjectScan = (project) => {
    setSelectedProject(project);
    setTerminalLines(prev => [
      ...prev,
      "",
      `┌─[sarthak@security]─[~/projects]`,
      `└──╼ $ nmap -sS -sV ${project.id}`,
      "",
      `Starting Nmap scan on ${project.title}...`,
      `Host is up (0.0023s latency).`,
      "",
      `PORT     STATE SERVICE    VERSION`,
      `22/tcp   open  ssh        OpenSSH 8.9`,
      `80/tcp   open  http       nginx/1.21.6`,
      `443/tcp  open  ssl/https  nginx/1.21.6`,
      "",
      `Vulnerability Assessment: ${project.vulnerability}`,
      `Code Lines: ${project.lines}`,
      `Status: ${project.status}`,
      "",
      `┌─[sarthak@security]─[~/projects]`,
      `└──╼ $ _`
    ]);
  };

  const handleImgError = (e) => {
    e.currentTarget.src = '/project1.png';
  };

  return (
    <div className="page-container">
      <div className="projects-container">
        <div className="projects-header">
          <div className="terminal-prompt">
            <span className="prompt-path">~/projects$</span>
            <span className="prompt-command">ls --detailed --secure</span>
          </div>
          <h2 className="section-title">
            <span className="title-bracket">[</span>
            PROJECT ARSENAL
            <span className="title-bracket">]</span>
          </h2>
          <div className="projects-stats">
            <div className="stat">
              <span className="stat-value">{projects.length}</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat">
              <span className="stat-value">
                {projects.reduce((sum, p) => sum + parseInt(p.lines.replace(',', '')), 0).toLocaleString()}
              </span>
              <span className="stat-label">Lines of Code</span>
            </div>
            <div className="stat">
              <span className="stat-value">24/7</span>
              <span className="stat-label">Monitoring</span>
            </div>
          </div>
        </div>

        <div className="projects-layout">
          <div className="projects-grid">
            {projects.map((project, idx) => (
              <HolographicCard key={project.id} className="project-card" intensity={0.3}>
                <article className="project-content">
                <div className="project-header">
                  <div className="project-status">
                    <span className={`status-indicator status-${project.status.toLowerCase()}`}></span>
                    <span className="status-text">{project.status}</span>
                  </div>
                  <div className="project-id">{project.id}</div>
                </div>

                <div className="project-media">
                  <img src={project.imageUrl} alt={project.title} onError={handleImgError} />
                  <div className="media-overlay">
                    <button 
                      className="scan-btn"
                      onClick={() => handleProjectScan(project)}
                    >
                      <span className="scan-icon">🔍</span>
                      SCAN
                    </button>
                  </div>
                </div>

                <div className="project-body">
                  <h3 className="project-title">
                    <span className="title-prefix">./</span>
                    {project.title}
                  </h3>
                  
                  <p className="project-description">{project.description}</p>

                  <div className="project-specs">
                    <div className="spec-section">
                      <h4 className="spec-title">
                        <span className="spec-icon">⚙️</span>
                        Technical Stack
                      </h4>
                      <ul className="spec-list">
                        {project.techDetails.map((detail, i) => (
                          <li key={i}>
                            <span className="list-bullet">▸</span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="spec-section">
                      <h4 className="spec-title">
                        <span className="spec-icon">🛡️</span>
                        Security Features
                      </h4>
                      <ul className="spec-list">
                        {project.features.map((feature, i) => (
                          <li key={i}>
                            <span className="list-bullet">▸</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-tag">
                        <span className="tag-hash">#</span>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="project-metadata">
                    <div className="metadata-item">
                      <span className="metadata-label">Lines:</span>
                      <span className="metadata-value">{project.lines}</span>
                    </div>
                    <div className="metadata-item">
                      <span className="metadata-label">Risk:</span>
                      <span className={`metadata-value risk-${project.vulnerability.toLowerCase()}`}>
                        {project.vulnerability}
                      </span>
                    </div>
                  </div>

                  <div className="project-actions">
                    <a 
                      className="action-btn action-btn--primary" 
                      href={project.demo} 
                      target="_blank" 
                      rel="noreferrer"
                      title="Deploy & Test"
                    >
                      <span className="btn-icon">🚀</span>
                      Deploy
                    </a>
                    <a 
                      className="action-btn action-btn--secondary" 
                      href={project.code} 
                      target="_blank" 
                      rel="noreferrer"
                      title="Source Code"
                    >
                      <span className="btn-icon">⚡</span>
                      Source
                    </a>
                  </div>
                </div>
                </article>
              </HolographicCard>
            ))}
          </div>

          <div className="terminal-sidebar">
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-controls">
                  <span className="control-dot control-red"></span>
                  <span className="control-dot control-yellow"></span>
                  <span className="control-dot control-green"></span>
                </div>
                <div className="terminal-title">security@projects:~</div>
              </div>
              <div className="terminal-body">
                <div className="terminal-content">
                  {terminalLines.map((line, idx) => (
                    <div key={idx} className="terminal-line">
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
