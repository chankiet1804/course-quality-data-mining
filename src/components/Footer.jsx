// src/components/Footer.jsx
import React from 'react';
import './Footer.css'; // tạo file css riêng nếu muốn custom

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span>© 2025 DataMining. All rights reserved.</span>
        <div className="footer-links">
          <a href="#" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
          <a href="#" target="_blank" rel="noopener noreferrer">Terms of Service</a>
          <a href="#" target="_blank" rel="noopener noreferrer">Contact Us</a>
        </div>
      </div>
    </footer>
  );
}
