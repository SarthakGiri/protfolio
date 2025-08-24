import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: string }
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { name, email, message } = formData;

  const API_BASE = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '';

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

 

// Inside your form submit handler

const onSubmit = e => {
  e.preventDefault();
  const nextErrors = {};
  if (!name.trim()) nextErrors.name = 'Name is required';
  if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Enter a valid email';
  if (!message.trim()) nextErrors.message = 'Message is required';
  setErrors(nextErrors);
  if (Object.keys(nextErrors).length) return;

  setSubmitting(true);
  setStatus(null);
  axios.post(`${API_BASE}/api/contact`, formData)
    .then(response => {
      setStatus({ type: 'success', message: 'Message sent successfully.' });
      setFormData({ name: '', email: '', message: '' });
    })
    .catch(error => {
      console.error('An error occurred while submitting the form:', error);
      setStatus({ type: 'error', message: 'Failed to send. Please try again later.' });
    })
    .finally(() => setSubmitting(false));
};
  return (
    <div className="page-container">
      <div className="contact">
        <div className="contact-header">
          <div className="pretitle">$ contact --open</div>
          <h1>Get In Touch</h1>
          <p className="subtitle">Have a security question, project idea, or an opportunity? Send a message and I’ll reply shortly.</p>
        </div>
        <div className="contact-layout">
          <div className="contact-left">
            <div className="terminal-card">
              <div className="terminal-card__header">
                <span className="dot dot--red"></span>
                <span className="dot dot--yellow"></span>
                <span className="dot dot--green"></span>
                <span className="terminal-title">/contact ~</span>
              </div>
              <div className="terminal-card__body">
                <div className="term">
                  <div className="term-line">$ whoami</div>
                  <div className="term-line">&gt; Cybersecurity Engineer | React/Node Developer</div>
                  <br />
                  <div className="term-line">$ ping contact</div>
                  <div className="term-line">&gt; email: <a href="mailto:programmersarthakg12@gmail.com">programmersarthakg12@gmail.com</a></div>
                  <div className="term-line">&gt; LinkedIn: <a href="https://www.linkedin.com/in/sarthak-giri-7b0686108/" target="_blank" rel="noopener noreferrer">/in/sarthak-giri-7b0686108</a></div>
                  <div className="term-line">&gt; GitHub: <a href="https://github.com/SarthakGiri" target="_blank" rel="noopener noreferrer">github.com/SarthakGiri</a></div>
                  <br />
                  <div className="term-line">$ availability --timezone</div>
                  <div className="term-line">&gt; IST (GMT+5:30)</div>
                </div>
              </div>
            </div>
          </div>
          <div className="contact-right">
            {status && (
              <div className={`status ${status.type}`}>{status.message}</div>
            )}
            <form className="contact-form" onSubmit={onSubmit} noValidate>
        <div className="input-group">
          <label>$ name: </label>
          <input type="text" name="name" value={name} onChange={onChange} aria-invalid={!!errors.name} />
          {errors.name && <small className="error-text">{errors.name}</small>}
        </div>
        <div className="input-group">
          <label>$ email: </label>
          <input type="email" name="email" value={email} onChange={onChange} aria-invalid={!!errors.email} />
          {errors.email && <small className="error-text">{errors.email}</small>}
        </div>
        <div className="input-group">
          <label>$ message: </label>
          <textarea name="message" value={message} onChange={onChange} aria-invalid={!!errors.message} />
          {errors.message && <small className="error-text">{errors.message}</small>}
        </div>
        <div className="input-group">
          <button type="submit" disabled={submitting}>{submitting ? '$ sending…' : '$ submit'}</button>
        </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
