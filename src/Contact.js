import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState(null);
  const { name, email, message } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

 

// Inside your form submit handler

const onSubmit = e => {
  e.preventDefault();
  if (!name.trim()) {
    alert('Name is required');
    return;
  }

  // Validate email
  if (!email.trim() || !email.includes('@')) {
    alert('Please enter a valid email address');
    return;
  }

  // Validate message
  if (!message.trim()) {
    alert('Message is required');
    return;
  }
  // Make a POST request to the server with the form data
  axios.post('http://localhost:3001/api/contact', formData)
    .then(response => {
      // Handle successful form submission
      // You can display a success message or redirect the user
      console.log(response.data.message); // "Form submitted successfully"
      setFormData({ name: '', email: '', message: '' }); // Clear the form
    })
    .catch(error => {
      // Handle any errors that occur during the submission
      console.error('An error occurred while submitting the form:', error);
    });
};
  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <form className="contact-form" onSubmit={onSubmit}>
        <div className="input-group">
          <label>$ name: </label>
          <input type="text" name="name" value={name} onChange={onChange} required />
        </div>
        <div className="input-group">
          <label>$ email: </label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="input-group">
          <label>$ message: </label>
          <textarea name="message" value={message} onChange={onChange} required />
        </div>
        <div className="input-group">
          <button type="submit">$ submit</button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
