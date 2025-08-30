import React, { useState, useEffect, useRef } from 'react';
import './AIAssistant.css';

const AIAssistant = () => {
  const [isActive, setIsActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check if speech recognition is supported
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setVoiceSupported(true);
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUserInput(transcript);
        handleSendMessage(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    // Initialize with welcome message
    setMessages([{
      id: 1,
      type: 'ai',
      text: 'Hello! I\'m ARIA (Advanced Reconnaissance Intelligence Assistant). I can help you navigate my portfolio, answer questions about my skills, or discuss cybersecurity topics. How can I assist you today?',
      timestamp: new Date()
    }]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const aiResponses = {
    greetings: [
      "Hello! I'm here to help you explore Sarthak's cybersecurity expertise.",
      "Greetings! Ready to dive into the world of ethical hacking and security?",
      "Welcome! I'm ARIA, your guide through this cybersecurity portfolio."
    ],
    skills: [
      "Sarthak specializes in penetration testing, ethical hacking, and secure full-stack development. He's OSCP certified and has experience with Azure security, network analysis, and vulnerability assessment.",
      "His technical arsenal includes Python, JavaScript, React, Node.js, Kali Linux, Metasploit, Burp Suite, and various security frameworks. He's particularly skilled in web application security and cloud security.",
      "Sarthak has expertise in OWASP Top 10, SQL injection detection, XSS prevention, network reconnaissance, and building secure applications from the ground up."
    ],
    projects: [
      "Check out the Zero Waste Toolkit - an environmental impact assessment tool, and the Safety Checker - a comprehensive web security scanner that analyzes domains for potential threats.",
      "His projects showcase both cybersecurity focus and environmental consciousness, demonstrating versatility in solving real-world problems through technology.",
      "Each project incorporates security best practices, from input validation to secure API design."
    ],
    contact: [
      "You can reach Sarthak at programmersarthakg12@gmail.com or connect on LinkedIn. He's always interested in discussing cybersecurity opportunities and collaborative projects.",
      "Feel free to use the contact form on this site - it's secured with proper validation and encryption protocols.",
      "For urgent security matters or consulting opportunities, direct email is the fastest way to reach him."
    ],
    security: [
      "Cybersecurity is about staying ahead of threats through continuous learning, ethical practices, and building robust defense systems.",
      "The field requires both technical expertise and creative problem-solving - you need to think like an attacker to build better defenses.",
      "Modern cybersecurity involves cloud security, DevSecOps, threat intelligence, and understanding the evolving landscape of digital threats."
    ],
    default: [
      "That's an interesting question! Feel free to explore the different sections of the portfolio or ask me about Sarthak's experience in cybersecurity.",
      "I can help you learn more about his projects, skills, or how to get in touch. What would you like to know?",
      "Try asking me about his cybersecurity experience, technical skills, or specific projects!"
    ]
  };

  const getAIResponse = (input) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return aiResponses.greetings[Math.floor(Math.random() * aiResponses.greetings.length)];
    }
    
    if (lowerInput.includes('skill') || lowerInput.includes('technical') || lowerInput.includes('experience')) {
      return aiResponses.skills[Math.floor(Math.random() * aiResponses.skills.length)];
    }
    
    if (lowerInput.includes('project') || lowerInput.includes('portfolio') || lowerInput.includes('work')) {
      return aiResponses.projects[Math.floor(Math.random() * aiResponses.projects.length)];
    }
    
    if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('reach')) {
      return aiResponses.contact[Math.floor(Math.random() * aiResponses.contact.length)];
    }
    
    if (lowerInput.includes('security') || lowerInput.includes('cyber') || lowerInput.includes('hacking')) {
      return aiResponses.security[Math.floor(Math.random() * aiResponses.security.length)];
    }
    
    return aiResponses.default[Math.floor(Math.random() * aiResponses.default.length)];
  };

  const handleSendMessage = async (messageText = userInput) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        text: getAIResponse(messageText),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const startVoiceRecognition = () => {
    if (recognitionRef.current && voiceSupported) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const toggleAssistant = () => {
    setIsActive(!isActive);
  };

  const quickPrompts = [
    "Tell me about skills",
    "Show me projects", 
    "How to contact?",
    "Cybersecurity experience"
  ];

  return (
    <>
      {/* AI Assistant Toggle Button */}
      <button 
        className={`ai-toggle ${isActive ? 'active' : ''}`}
        onClick={toggleAssistant}
        aria-label="Toggle AI Assistant"
      >
        <div className="ai-icon">
          <div className="ai-core"></div>
          <div className="ai-ring ring-1"></div>
          <div className="ai-ring ring-2"></div>
        </div>
        <span className="ai-label">ARIA</span>
      </button>

      {/* AI Assistant Panel */}
      <div className={`ai-assistant ${isActive ? 'active' : ''}`}>
        <div className="ai-header">
          <div className="ai-title">
            <span className="ai-name">ARIA</span>
            <span className="ai-subtitle">AI Assistant</span>
          </div>
          <div className="ai-status">
            <div className="status-indicator online"></div>
            <span>Online</span>
          </div>
        </div>

        <div className="ai-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.type}`}>
              <div className="message-content">
                {message.text}
              </div>
              <div className="message-time">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message ai typing">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="ai-quick-prompts">
          {quickPrompts.map((prompt, index) => (
            <button
              key={index}
              className="quick-prompt"
              onClick={() => handleSendMessage(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>

        <div className="ai-input">
          <div className="input-container">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything..."
              className="message-input"
            />
            {voiceSupported && (
              <button
                className={`voice-btn ${isListening ? 'listening' : ''}`}
                onClick={startVoiceRecognition}
                disabled={isListening}
                aria-label="Voice input"
              >
                🎤
              </button>
            )}
            <button
              className="send-btn"
              onClick={() => handleSendMessage()}
              disabled={!userInput.trim()}
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIAssistant;
