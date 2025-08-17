import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="landing">
      <nav className="navbar">
        <div className="brand">Boardy</div>
        <div className="nav-actions">
          <Link className="btn ghost" to="/login">Log in</Link>
          <Link className="btn primary" to="/board">Try Demo</Link>
        </div>
      </nav>
      <main className="hero">
        <h1>Organize work beautifully</h1>
        <p>Boardy is a sleek, modern board for managing tasks with clarity. Deep blue, fast, and focused.</p>
        <div className="hero-actions">
          <Link className="btn primary" to="/login">Get Started</Link>
          <Link className="btn ghost" to="/board">View a Demo Board</Link>
        </div>
      </main>
      <footer className="footer">Built for productivity • Designed for focus</footer>
    </div>
  );
}

export default Landing;
