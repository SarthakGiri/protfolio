import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();

  // Validate form  

  // Login logic

  navigate('/dashboard');
}

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input 
          type="password" 
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
        />

        <button type="submit">Login</button>

      </form>
    </div>
  );

}

export default Login;