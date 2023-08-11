import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/admin/login', credentials);
      const token = response.data.token;
      // Store token in local storage or context
      localStorage.setItem('token', token);
      // Redirect to admin dashboard
      window.location.href = '/admin/dashboard';
    } catch (err) {
        setError(err.response?.data?.message || 'Invalid credentials');
    }
  };
 
    
  
  return (
    <div className="admin-login">
      <h1>Admin Login</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
