
import './HomePage.css'
import React, { useState, useEffect } from 'react';

const LetsTalk = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isOnline, setIsOnline] = useState(false); // Set your online/offline status here

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    // Add the user's message to the chat window
    const userMessage = { sender: 'user', text: inputMessage };
    setMessages([...messages, userMessage]);

    // Clear the input field
    setInputMessage('');

    // Generate a chatbot response based on the user's message and online status
    let botResponse = '';

    if (isOnline) {
      // Custom logic to generate responses when you are online (can be expanded)
      botResponse = 'Hi! How can I help you today?';
    } else {
      // Response when you are offline
      botResponse = 'I am currently offline. Please leave a message, and I will get back to you!';
    }

    // Add the bot's response to the chat window after a short delay
    setTimeout(() => {
      setMessages([...messages, userMessage, { sender: 'bot', text: botResponse }]);
    }, 1000);
  };

  // Scroll to the bottom of the chat window whenever a new message is added
  useEffect(() => {
    const chatWindow = document.querySelector('.chat-window');
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, [messages]);

  return (
    <div className="lets-talk-container">
      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default LetsTalk;
