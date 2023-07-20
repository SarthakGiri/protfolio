import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const { name, email, message } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    console.log(formData);

    // clear form fields
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div>
      <h1>Contact Us</h1>
      <form onSubmit={e => onSubmit(e)}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={e => onChange(e)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </label>
        <label>
          Message:
          <textarea
            name="message"
            value={message}
            onChange={e => onChange(e)}
            required
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Contact;
