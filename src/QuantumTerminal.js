import React, { useState, useEffect, useRef } from 'react';
import './QuantumTerminal.css';

const QuantumTerminal = ({ commands = [], title = "Quantum Terminal", className = "" }) => {
  const [output, setOutput] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [quantumState, setQuantumState] = useState('stable');
  const [entanglement, setEntanglement] = useState(0);
  const terminalRef = useRef(null);

  const quantumCommands = {
    'quantum-scan': {
      description: 'Perform quantum security scan',
      execute: () => [
        'Initializing quantum scanner...',
        'Scanning quantum entangled nodes...',
        '🔍 Found 42 quantum vulnerabilities',
        '✅ Quantum encryption: ACTIVE',
        'Scan complete. System secure.'
      ]
    },
    'entangle': {
      description: 'Create quantum entanglement with secure systems',
      execute: () => {
        setEntanglement(prev => Math.min(prev + 25, 100));
        return [
          'Creating quantum entanglement...',
          '⚡ Establishing quantum channel',
          '🔗 Entanglement established',
          `Entanglement level: ${Math.min(entanglement + 25, 100)}%`
        ];
      }
    },
    'superposition': {
      description: 'Enter quantum superposition state',
      execute: () => {
        setQuantumState('superposition');
        setTimeout(() => setQuantumState('stable'), 3000);
        return [
          'Entering quantum superposition...',
          '⚛️ System exists in multiple states simultaneously',
          '📊 Probability calculations active',
          'Warning: Observation will collapse wavefunction'
        ];
      }
    },
    'teleport': {
      description: 'Quantum teleport data packets',
      execute: () => [
        'Initializing quantum teleportation...',
        '🌀 Creating quantum portal',
        '📡 Transmitting entangled data',
        '✨ Data successfully teleported',
        'No information lost in quantum realm'
      ]
    },
    'decrypt-quantum': {
      description: 'Break quantum encryption using quantum computing',
      execute: () => [
        'Loading quantum decryption algorithms...',
        '🔑 Applying Shor\'s algorithm',
        '💎 Factoring large prime numbers',
        '⚡ RSA-2048 cracked in 0.003 seconds',
        'Quantum supremacy achieved'
      ]
    },
    'help': {
      description: 'Show available quantum commands',
      execute: () => [
        'Available Quantum Commands:',
        '• quantum-scan - Perform quantum security scan',
        '• entangle - Create quantum entanglement',
        '• superposition - Enter quantum superposition',
        '• teleport - Quantum teleport data',
        '• decrypt-quantum - Quantum decryption',
        '• clear - Clear terminal',
        '• status - Show quantum system status'
      ]
    },
    'status': {
      description: 'Show quantum system status',
      execute: () => [
        'Quantum System Status:',
        `State: ${quantumState}`,
        `Entanglement: ${entanglement}%`,
        `Qubits: ${Math.floor(Math.random() * 1000) + 500}`,
        `Coherence: ${Math.floor(Math.random() * 20) + 80}%`,
        `Temperature: ${(Math.random() * 0.1).toFixed(3)}K`
      ]
    },
    'clear': {
      description: 'Clear terminal',
      execute: () => {
        setOutput([]);
        return [];
      }
    }
  };

  useEffect(() => {
    // Initialize with welcome message
    setOutput([
      '⚛️ Quantum Terminal v3.14.159 initialized',
      '🔮 Quantum state: STABLE',
      '📡 Entanglement: 0%',
      '',
      'Type "help" for available quantum commands',
      ''
    ]);

    // Simulate quantum fluctuations
    const fluctuationInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        const states = ['stable', 'fluctuating', 'coherent', 'decoherent'];
        setQuantumState(states[Math.floor(Math.random() * states.length)]);
        
        setTimeout(() => setQuantumState('stable'), 2000);
      }
    }, 5000);

    return () => clearInterval(fluctuationInterval);
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  const executeCommand = async (command) => {
    if (!command.trim()) return;

    setIsProcessing(true);
    setOutput(prev => [...prev, `quantum@terminal:~$ ${command}`]);

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

    const cmd = command.toLowerCase().trim();
    const quantumCmd = quantumCommands[cmd];

    if (quantumCmd) {
      const result = quantumCmd.execute();
      if (result.length > 0) {
        setOutput(prev => [...prev, ...result, '']);
      }
    } else {
      // Try custom commands passed as props
      const customCmd = commands.find(c => c.command === cmd);
      if (customCmd) {
        setOutput(prev => [...prev, ...customCmd.output, '']);
      } else {
        setOutput(prev => [...prev, 
          `bash: ${command}: command not found`,
          'Type "help" for available commands',
          ''
        ]);
      }
    }

    setIsProcessing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentInput.trim() && !isProcessing) {
      executeCommand(currentInput);
      setCurrentInput('');
    }
  };

  const getQuantumStateColor = () => {
    switch (quantumState) {
      case 'superposition': return '#ff9500';
      case 'fluctuating': return '#ff4444';
      case 'coherent': return '#00ff88';
      case 'decoherent': return '#ff006e';
      default: return '#00eaff';
    }
  };

  return (
    <div className={`quantum-terminal ${className}`}>
      {/* Terminal Header */}
      <div className="quantum-header">
        <div className="quantum-controls">
          <span className="control-dot red"></span>
          <span className="control-dot yellow"></span>
          <span className="control-dot green"></span>
        </div>
        <div className="quantum-title">{title}</div>
        <div className="quantum-status">
          <div 
            className={`quantum-indicator ${quantumState}`}
            style={{ backgroundColor: getQuantumStateColor() }}
          ></div>
          <span className="quantum-state">{quantumState.toUpperCase()}</span>
        </div>
      </div>

      {/* Quantum Stats Bar */}
      <div className="quantum-stats">
        <div className="stat">
          <span className="stat-label">Entanglement:</span>
          <div className="stat-bar">
            <div 
              className="stat-fill"
              style={{ width: `${entanglement}%` }}
            ></div>
          </div>
          <span className="stat-value">{entanglement}%</span>
        </div>
        <div className="stat">
          <span className="stat-label">Coherence:</span>
          <div className="stat-bar">
            <div 
              className="stat-fill coherence"
              style={{ width: `${85 + Math.random() * 15}%` }}
            ></div>
          </div>
          <span className="stat-value">{Math.floor(85 + Math.random() * 15)}%</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="quantum-body" ref={terminalRef}>
        <div className="quantum-content">
          {output.map((line, index) => (
            <div key={index} className="quantum-line">
              {line.startsWith('quantum@terminal:~$') ? (
                <span className="command-line">{line}</span>
              ) : (
                <span className="output-line">{line}</span>
              )}
            </div>
          ))}
          
          {isProcessing && (
            <div className="quantum-line processing">
              <span className="quantum-loader">
                <span className="quantum-dot"></span>
                <span className="quantum-dot"></span>
                <span className="quantum-dot"></span>
              </span>
              <span>Processing quantum command...</span>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="quantum-input">
        <span className="quantum-prompt">quantum@terminal:~$</span>
        <input
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          disabled={isProcessing}
          placeholder="Enter quantum command..."
          autoComplete="off"
          autoFocus
        />
        <button type="submit" disabled={!currentInput.trim() || isProcessing}>
          ⚡
        </button>
      </form>

      {/* Quantum Particles Background */}
      <div className="quantum-particles">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="quantum-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default QuantumTerminal;
