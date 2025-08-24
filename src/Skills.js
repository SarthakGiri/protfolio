import React from 'react';
import Console from 'react-console-emulator';
import './Skills.css';

const commands = {
  frontend: {
    fn: () => `🌐 Frontend Technologies:
    ├── Languages: HTML5, CSS3, JavaScript (ES6+)
    ├── Frameworks: React, Redux
    ├── Styling: Sass, Tailwind CSS, Bootstrap
    └── Tools: Webpack, Babel, npm/yarn`
  },
  backend: {
    fn: () => `⚙️ Backend Technologies:
    ├── Runtime: Node.js
    ├── Framework: Express.js
    ├── Database: MongoDB, SQL
    ├── Cloud: Microsoft Azure
    └── APIs: RESTful, GraphQL`
  },
  cybersecurity: {
    fn: () => `🔒 Cybersecurity Expertise:
    ├── Network Security & Monitoring
    ├── Ethical Hacking & Penetration Testing  
    ├── Cryptography & Encryption
    ├── Security Assessment & Vulnerability Analysis
    └── Incident Response & Digital Forensics`
  },
  other: {
    fn: () => `🛠️ Development Tools & Others:
    ├── Version Control: Git, GitHub
    ├── Operating Systems: Linux, Windows
    ├── Shell Scripting: Bash, PowerShell
    ├── Containerization: Docker
    └── CI/CD: GitHub Actions, Jenkins`
  }
};

const skillGroups = [
  {
    icon: '🧠',
    title: 'Cybersecurity',
    level: 92,
    tags: ['Network Security', 'Pentesting', 'Cryptography', 'OWASP', 'SIEM']
  },
  {
    icon: '⚙️',
    title: 'Backend',
    level: 85,
    tags: ['Node.js', 'Express', 'MongoDB', 'REST', 'Auth']
  },
  {
    icon: '🌐',
    title: 'Frontend',
    level: 83,
    tags: ['React', 'Redux', 'TypeScript', 'Sass', 'Vite/Webpack']
  },
  {
    icon: '☁️',
    title: 'Cloud & DevOps',
    level: 78,
    tags: ['Azure', 'Docker', 'GitHub Actions', 'Linux', 'Bash']
  }
];

const categories = ['All', 'Cybersecurity', 'Backend', 'Frontend', 'Cloud & DevOps'];

const Skills = () => {
  const [active, setActive] = React.useState('All');

  const filtered = active === 'All' ? skillGroups : skillGroups.filter(g => g.title === active);

  return (
    <div className="page-container">
      <section className="skills">
        <div className="skills-header">
          <div className="pretitle">$ skills --show</div>
          <h2>Technical Skillset</h2>
          <p className="subtitle">Focused on secure systems design, offensive testing, and production-grade web apps.</p>
        </div>

        <div className="skills-filters" role="tablist" aria-label="Skill categories">
          {categories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={active === c}
              className={`chip ${active === c ? 'chip--active' : ''}`}
              onClick={() => setActive(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="skills-layout">
          <div className="skills-left">
            <div className="terminal-panel skills-terminal">
              <Console
                commands={commands}
                welcomeMessage={'💻 Welcome to the skills terminal. Type "help" or try: frontend, backend, cybersecurity, other'}
                promptLabel={'sarthak@portfolio:~$'}
                autoFocus={true}
              />
              <div className="terminal-actions">
                <a className="btn btn--primary" href="/resume.pdf" download>Download Resume</a>
              </div>
            </div>
          </div>
          <div className="skills-right">
            <div className="skill-grid">
              {filtered.map((g, i) => (
                <div className="skill-card" key={i}>
                  <div className="skill-card__header">
                    <span className="skill-card__icon" aria-hidden>{g.icon}</span>
                    <h3 className="skill-card__title">{g.title}</h3>
                  </div>
                  <div className="meter" aria-label={`${g.title} proficiency`}>
                    <div className="meter__fill" style={{ width: `${g.level}%` }} />
                    <div className="meter__value">{g.level}%</div>
                  </div>
                  <div className="tags">
                    {g.tags.map((t, idx) => (
                      <span className="tag" key={idx}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skills;
