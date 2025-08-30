import React, { useState, useEffect, useRef } from 'react';
import './Skills.css';
import NeuralNetwork from './NeuralNetwork';

const Skills = () => {
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [systemStats, setSystemStats] = useState({
    uptime: 0,
    processes: 127,
    memory: 78.3,
    cpu: 23.7
  });
  const terminalRef = useRef(null);

  const skillCategories = {
    cybersecurity: {
      title: 'Cybersecurity Arsenal',
      icon: '🛡️',
      level: 95,
      color: '#ff3333',
      tools: [
        { name: 'Kali Linux', proficiency: 95, status: 'MASTERED' },
        { name: 'Metasploit', proficiency: 90, status: 'EXPERT' },
        { name: 'Nmap/Nessus', proficiency: 92, status: 'EXPERT' },
        { name: 'Burp Suite', proficiency: 88, status: 'EXPERT' },
        { name: 'Wireshark', proficiency: 87, status: 'EXPERT' },
        { name: 'OWASP Top 10', proficiency: 93, status: 'MASTERED' },
        { name: 'Cryptography', proficiency: 85, status: 'ADVANCED' },
        { name: 'Digital Forensics', proficiency: 82, status: 'ADVANCED' }
      ],
      certs: ['Security+', 'OSCP', 'CEH', 'CISSP (In Progress)']
    },
    development: {
      title: 'Development Stack',
      icon: '💻',
      level: 88,
      color: '#00ff41',
      tools: [
        { name: 'React.js', proficiency: 90, status: 'EXPERT' },
        { name: 'Node.js', proficiency: 85, status: 'EXPERT' },
        { name: 'TypeScript', proficiency: 83, status: 'ADVANCED' },
        { name: 'Python', proficiency: 87, status: 'EXPERT' },
        { name: 'Express.js', proficiency: 86, status: 'EXPERT' },
        { name: 'MongoDB', proficiency: 82, status: 'ADVANCED' },
        { name: 'Docker', proficiency: 78, status: 'ADVANCED' },
        { name: 'Git/GitHub', proficiency: 92, status: 'EXPERT' }
      ],
      certs: ['AWS Cloud Practitioner', 'Azure Fundamentals']
    },
    networking: {
      title: 'Network Operations',
      icon: '🌐',
      level: 91,
      color: '#00ffff',
      tools: [
        { name: 'TCP/IP Protocol', proficiency: 94, status: 'MASTERED' },
        { name: 'Firewall Config', proficiency: 89, status: 'EXPERT' },
        { name: 'VPN Setup', proficiency: 87, status: 'EXPERT' },
        { name: 'IDS/IPS', proficiency: 85, status: 'EXPERT' },
        { name: 'SIEM Tools', proficiency: 83, status: 'ADVANCED' },
        { name: 'Network Forensics', proficiency: 80, status: 'ADVANCED' },
        { name: 'Packet Analysis', proficiency: 88, status: 'EXPERT' },
        { name: 'Incident Response', proficiency: 86, status: 'EXPERT' }
      ],
      certs: ['CCNA', 'Network+', 'GCIH']
    }
  };

  const commands = {
    help: () => `Available commands:
┌─────────────────────────────────────────────────────────────┐
│ scan [category]     - Analyze skill category                │
│ status             - Show system status                     │
│ certifications     - List all certifications               │
│ projects           - Show recent projects                   │
│ exploits           - List known vulnerabilities            │
│ clear              - Clear terminal                         │
│ whoami             - Display user information               │
│ neofetch           - System information                     │
└─────────────────────────────────────────────────────────────┘`,
    
    status: () => `┌─[SYSTEM STATUS]─────────────────────────────────┐
│ Uptime: ${Math.floor(systemStats.uptime / 3600)}h ${Math.floor((systemStats.uptime % 3600) / 60)}m ${systemStats.uptime % 60}s           │
│ Active Processes: ${systemStats.processes}                     │
│ Memory Usage: ${systemStats.memory}%                      │
│ CPU Load: ${systemStats.cpu}%                         │
│ Security Level: MAXIMUM                         │
│ Threat Level: GREEN                             │
└─────────────────────────────────────────────────┘`,

    certifications: () => `🏆 SECURITY CERTIFICATIONS:
├── CompTIA Security+ (ACTIVE)
├── Offensive Security OSCP (ACTIVE) 
├── Certified Ethical Hacker (CEH)
├── CISSP (In Progress - 2024)
├── AWS Cloud Practitioner
├── Microsoft Azure Fundamentals
├── CompTIA Network+
└── GIAC Certified Incident Handler (GCIH)

📊 Certification Score: 8/10 Complete`,

    projects: () => `🚀 ACTIVE PROJECT DEPLOYMENTS:
┌──────────────────────────────────────────────────────┐
│ PROJECT             STATUS      THREAT LEVEL         │
├──────────────────────────────────────────────────────┤
│ Zero Waste Toolkit  DEPLOYED    LOW                  │
│ SafetyNet Scanner   ACTIVE      CRITICAL             │
│ SecureChat Protocol DEVELOPMENT HIGH                 │
│ Portfolio Defense   ONLINE      SECURE              │
└──────────────────────────────────────────────────────┘`,

    exploits: () => `⚠️  VULNERABILITY DATABASE:
┌─────────────────────────────────────────────────────┐
│ CVE-2024-XXXX: Buffer Overflow in WebApp Framework │
│ CVE-2023-YYYY: SQL Injection in Legacy System      │
│ CVE-2023-ZZZZ: XSS Vulnerability in Chat App       │
│                                                     │
│ 🔍 Total Discovered: 47 vulnerabilities            │
│ 🛡️  Patched: 45 (95.7% success rate)              │
│ ⏳ Pending: 2 critical fixes in progress           │
└─────────────────────────────────────────────────────┘`,

    whoami: () => `┌─[USER PROFILE]──────────────────────────────────────┐
│ Username: sarthak                                   │
│ Role: Cybersecurity Engineer                        │
│ Clearance Level: TOP SECRET                         │
│ Location: ~/.portfolio/skills                       │
│ Last Login: ${new Date().toLocaleString()}          │
│ Failed Login Attempts: 0                            │
│ Active Sessions: 1                                  │
└─────────────────────────────────────────────────────┘`,

    neofetch: () => `
    ╭─────────────────────────────────────────────────────╮
    │                                                     │
    │    ██████╗ ██╗   ██╗██████╗ ███████╗██████╗         │
    │   ██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗        │
    │   ██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝        │
    │   ██║       ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██╗        │
    │   ╚██████╗   ██║   ██████╔╝███████╗██║  ██║        │
    │    ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝        │
    │                                                     │
    │   OS: Kali Linux 2024.1                            │
    │   Kernel: 6.1.0-kali7-amd64                        │
    │   Shell: zsh 5.9                                    │
    │   Resolution: 1920x1080                             │
    │   CPU: Intel i7-12700H (16) @ 4.700GHz             │
    │   Memory: 16384MiB                                  │
    │   Security: Maximum                                 │
    │                                                     │
    ╰─────────────────────────────────────────────────────╯`,

    clear: () => 'CLEAR_TERMINAL'
  };

  useEffect(() => {
    // System stats updater
    const statsInterval = setInterval(() => {
      setSystemStats(prev => ({
        uptime: prev.uptime + 1,
        processes: 120 + Math.floor(Math.random() * 15),
        memory: 75 + Math.random() * 10,
        cpu: 15 + Math.random() * 25
      }));
    }, 1000);

    // Initial welcome message
    setTerminalOutput([
      '┌─[sarthak@security]─[~/skills]',
      '└──╼ $ sudo ./initialize_skills_analysis.sh',
      '',
      '🔐 INITIALIZING CYBERSECURITY SKILLS MATRIX...',
      '✅ Loading penetration testing tools...',
      '✅ Scanning development frameworks...',  
      '✅ Analyzing network protocols...',
      '✅ All systems operational.',
      '',
      '💀 WELCOME TO THE SKILLS TERMINAL 💀',
      '🛡️  Type "help" for available commands',
      '⚡ Type "scan [category]" to analyze skills',
      '',
      '┌─[sarthak@security]─[~/skills]',
      '└──╼ $ _'
    ]);

    return () => clearInterval(statsInterval);
  }, []);

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    setTerminalOutput(prev => [
      ...prev,
      '',
      `┌─[sarthak@security]─[~/skills]`,
      `└──╼ $ ${trimmedCmd}`
    ]);

    if (trimmedCmd === 'clear') {
      setTerminalOutput([
        '┌─[sarthak@security]─[~/skills]',
        '└──╼ $ _'
      ]);
      return;
    }

    if (trimmedCmd.startsWith('scan ')) {
      const category = trimmedCmd.split(' ')[1];
      if (skillCategories[category]) {
        const cat = skillCategories[category];
        setSelectedSkill(category);
        setTerminalOutput(prev => [
          ...prev,
          '',
          `🔍 SCANNING ${cat.title.toUpperCase()}...`,
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          '',
          `📊 Overall Proficiency: ${cat.level}%`,
          `🎯 Status: ${cat.level >= 90 ? 'MASTERED' : cat.level >= 80 ? 'EXPERT' : 'ADVANCED'}`,
          '',
          '🛠️  TOOL ANALYSIS:',
          ...cat.tools.map(tool => 
            `├── ${tool.name.padEnd(20)} [${tool.proficiency}%] ${tool.status}`
          ),
          '',
          '🏆 CERTIFICATIONS:',
          ...cat.certs.map(cert => `├── ${cert}`),
          '',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          '✅ Scan complete.',
          '',
          '┌─[sarthak@security]─[~/skills]',
          '└──╼ $ _'
        ]);
      } else {
        setTerminalOutput(prev => [
          ...prev,
          '',
          `❌ Unknown category: ${category}`,
          '📋 Available categories: cybersecurity, development, networking',
          '',
          '┌─[sarthak@security]─[~/skills]',
          '└──╼ $ _'
        ]);
      }
    } else if (commands[trimmedCmd]) {
      const result = commands[trimmedCmd]();
      setTerminalOutput(prev => [
        ...prev,
        '',
        result,
        '',
        '┌─[sarthak@security]─[~/skills]',
        '└──╼ $ _'
      ]);
    } else {
      setTerminalOutput(prev => [
        ...prev,
        '',
        `❌ Command not found: ${trimmedCmd}`,
        '💡 Type "help" for available commands',
        '',
        '┌─[sarthak@security]─[~/skills]',
        '└──╼ $ _'
      ]);
    }

    // Auto-scroll to bottom
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && currentCommand.trim()) {
      executeCommand(currentCommand);
      setCurrentCommand('');
    }
  };

  return (
    <div className="page-container">
      <div className="skills-container">
        <div className="skills-header">
          <div className="header-info">
            <h2 className="section-title">
              <span className="title-bracket">[</span>
              SKILLS MATRIX
              <span className="title-bracket">]</span>
            </h2>
            <div className="system-info">
              <div className="info-item">
                <span className="info-label">Uptime:</span>
                <span className="info-value">{Math.floor(systemStats.uptime / 3600)}h {Math.floor((systemStats.uptime % 3600) / 60)}m</span>
              </div>
              <div className="info-item">
                <span className="info-label">Load:</span>
                <span className="info-value">{systemStats.cpu.toFixed(1)}%</span>
              </div>
              <div className="info-item">
                <span className="info-label">Memory:</span>
                <span className="info-value">{systemStats.memory.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Neural Network Visualization */}
        <NeuralNetwork 
          skills={Object.values(skillCategories).map(category => category.title)}
          isActive={true}
        />

        <div className="skills-layout">
          <div className="skills-grid">
            {Object.entries(skillCategories).map(([key, category]) => (
              <div 
                key={key} 
                className={`skill-category ${selectedSkill === key ? 'selected' : ''}`}
                onClick={() => executeCommand(`scan ${key}`)}
              >
                <div className="category-header">
                  <div className="category-icon">{category.icon}</div>
                  <div className="category-info">
                    <h3 className="category-title">{category.title}</h3>
                    <div className="category-level">
                      <div className="level-bar">
                        <div 
                          className="level-fill" 
                          style={{ 
                            width: `${category.level}%`,
                            backgroundColor: category.color
                          }}
                        ></div>
                      </div>
                      <span className="level-text">{category.level}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="category-preview">
                  {category.tools.slice(0, 4).map((tool, idx) => (
                    <div key={idx} className="tool-preview">
                      <span className="tool-name">{tool.name}</span>
                      <span className="tool-status">{tool.status}</span>
                    </div>
                  ))}
                  <div className="tool-more">
                    +{category.tools.length - 4} more tools
                  </div>
                </div>

                <button className="scan-button">
                  <span className="scan-icon">🔍</span>
                  SCAN CATEGORY
                </button>
              </div>
            ))}
          </div>

          <div className="terminal-section">
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-controls">
                  <span className="control-dot control-red"></span>
                  <span className="control-dot control-yellow"></span>
                  <span className="control-dot control-green"></span>
                </div>
                <div className="terminal-title">sarthak@security: ~/skills</div>
              </div>
              
              <div className="terminal-body" ref={terminalRef}>
                <div className="terminal-content">
                  {terminalOutput.map((line, idx) => (
                    <div key={idx} className="terminal-line">
                      {line}
                    </div>
                  ))}
                </div>
                
                <div className="terminal-input">
                  <span className="input-prompt">└──╼ $ </span>
                  <input
                    type="text"
                    value={currentCommand}
                    onChange={(e) => setCurrentCommand(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="command-input"
                    placeholder="Type command here..."
                    autoFocus
                  />
                  <span className="input-cursor">_</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;