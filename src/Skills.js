import React from 'react';

function Terminal() {

  const skills = [
    'Learn basics of Linux commands',
    'Understand networking fundamentals',
    'Set up a virtual lab environment',
    'Use Kali Linux for penetration testing',
    'Learn Python for security automation',
    'Study cryptography concepts',
    'Practice ethical hacking techniques',
    'Learn about common cyber attacks',
    'Monitor systems with ELK stack',
    'Secure code review and QA testing',
  ];

  return (
    <div className="terminal">
      <p className="prompt">user@computer:~$ skills</p>
      
      {skills.map(skill => (
        <p key={skill}>{skill}</p>
      ))}

    </div>
  );
}

// Styles


export default Terminal;