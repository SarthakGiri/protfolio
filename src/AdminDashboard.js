import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [letsTalkMessages, setLetsTalkMessages] = useState([]); // New state

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:3001/api/admin/contact-messages').then(response => setMessages(response.data));
    axios.get('http://localhost:3001/api/admin/hire-me-inquiries').then(response => setInquiries(response.data));
    axios.get('http://localhost:3001/api/admin/lets-talk-messages').then(response => setLetsTalkMessages(response.data)); // Fetching Let's Talk messages
  };

  const deleteMessage = (id, endpoint) => {
    axios.delete(`http://localhost:3001/api/admin/${endpoint}/${id}`).then(() => fetchData()); // Generic delete function
  };

  // Render the messages in a separate function
  const renderMessages = (messagesArray, title, endpoint) => (
    <div>
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="bg-white shadow-md rounded p-6">
        {messagesArray.map(message => (
          <div key={message._id} className="border-b pb-4 mb-4">
            <p><strong>Name:</strong> {message.name}</p>
            <p><strong>Email:</strong> {message.email}</p>
            <p><strong>Message:</strong> {message.message}</p>
            <button onClick={() => deleteMessage(message._id, endpoint)} className="text-red-500">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-8">
      {renderMessages(messages, 'Contact Messages', 'contact-messages')}
      {renderMessages(inquiries, 'Hiring Inquiries', 'hire-me-inquiries')}
      {renderMessages(letsTalkMessages, "Let's Talk Messages", 'lets-talk-messages')} // Rendering Let's Talk messages
    </div>
  );
};

export default AdminDashboard;
