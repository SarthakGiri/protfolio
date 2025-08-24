import React, { useState } from 'react';
import './HireMe.css';

const HireMe = () => {
  const [form, setForm] = useState({ name: '', email: '', role: '', message: '' });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // Integrate with backend later; for now provide a mailto fallback.
    const subject = encodeURIComponent(`Hiring Inquiry (${form.role || 'General'})`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nRole: ${form.role}\n\n${form.message}`);
    window.location.href = `mailto:sarthak@example.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="page-container">
      <section className="hire-panel terminal-panel">
        <header className="hire-header">
          <div className="prompt">&gt;_</div>
          <h1 className="title">Hire Me</h1>
          <p className="subtitle">Cybersecurity Engineer • Red/Blue • Full‑Stack Sec</p>
        </header>

        <form className="hire-form" onSubmit={onSubmit}>
          <div className="row">
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" value={form.name} onChange={onChange} required />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={form.email} onChange={onChange} required />
            </div>
          </div>

          <div className="row">
            <div className="field">
              <label htmlFor="role">Role</label>
              <input id="role" name="role" type="text" placeholder="e.g., Security Engineer" value={form.role} onChange={onChange} />
            </div>
          </div>

          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="6" value={form.message} onChange={onChange} required />
          </div>

          <div className="actions">
            <button className="btn btn--primary" type="submit">Send Inquiry</button>
            <a className="btn" href="/Sarthak_Giri_Resume.pdf" target="_blank" rel="noreferrer">View Resume</a>
          </div>
        </form>
      </section>
    </div>
  );
};

export default HireMe;
