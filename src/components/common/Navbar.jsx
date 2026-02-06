import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui'; // Assuming we have a Button component
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          HireBuddy
        </Link>

        {/* User requested specific links on Left Side */}
        <div className="navbar-links">
          {isAuthenticated ? (
            /* Authenticated Links */
            <>
              <Link to="/browse" className={`nav-link ${isActive('/browse') ? 'active' : ''}`}>
                Browse Requests
              </Link>
              <Link to="/my-requests" className={`nav-link ${isActive('/my-requests') ? 'active' : ''}`}>
                My Requests
              </Link>
              <button className="btn-nav-create" onClick={() => navigate('/create-request')}>
                + Post Request
              </button>
            </>
          ) : (
            /* Public/Landing Links as requested: Requirement Buddy, Buddy hire, How it Works, Support */
            <>
               <Link to="/browse" className="nav-link">Requirement Buddy</Link>
               <Link to="/create-request" className="nav-link">Buddy hire</Link>
               <Link to="/how-it-works" className="nav-link">How it Works</Link>
               <a href="#" className="nav-link">Support</a>
            </>
          )}
        </div>

        <div className="navbar-user">
          {isAuthenticated && user ? (
            <>
              <img
                src={user.profilePicture || '/default-avatar.png'}
                alt={user.displayName}
                className="user-avatar"
              />
              <span className="user-name">{user.displayName}</span>
              <button className="btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <div className="auth-buttons">
              <button className="btn-login-nav" onClick={() => navigate('/login')}>
                Log In
              </button>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
