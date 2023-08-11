import React from 'react';
import Console from 'react-console-emulator';

const commands = {
  frontend: {
    fn: () => 'HTML, CSS, JavaScript, React, Redux'
  },
  backend: {
    fn: () => 'Node.js, Express, MongoDB , Azure'
  },
  cybersecurity: {
    fn: () => 'Network Security, Ethical Hacking, Cryptography'
  },
  other: {
    fn: () => 'Git, Linux, Bash'
  }
};

const Skills = () => (
  <section className="skills">
    <h2>Skills</h2>
    <Console
      commands={commands}
      welcomeMessage={'Enter "frontend", "backend", "cybersecurity", or "other" to see my skills in each category.'}
      promptLabel={'$'}
      autoFocus={true}
    />
  </section>
);

export default Skills;
