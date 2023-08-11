import React from 'react';
import './Terminal.css';

const Terminal = ({ title, children }) => (
  <div className="terminal">
    <div className="terminal-header">{title}</div>
    <div className="terminal-body">{children}</div>
  </div>
);

export default Terminal;
