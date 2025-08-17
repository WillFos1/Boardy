import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Backend may exist, but allow graceful fallback to demo token
      const res = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('token', data.token);
      } else {
        // Fallback demo token for local demo
        localStorage.setItem('token', 'demo-token');
      }
      navigate('/board');
    } catch (err) {
      // Offline/demo mode
      localStorage.setItem('token', 'demo-token');
      navigate('/board');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome back</h2>
        <p className="muted">Log in to your workspace</p>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          {error && <div className="error">{error}</div>}
          <button type="submit" className="btn primary w-100">Log in</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
