import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="bumble-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>HireBuddy</h3>
          <p>&copy; 2026 HireBuddy Inc.</p>
        </div>
        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Safety</a>
          <a href="#">Careers</a>
          <a href="#">Contact</a>
        </div>
        <div className="footer-social">
          <span>Instagram</span>
          <span>Twitter</span>
          <span>Facebook</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
