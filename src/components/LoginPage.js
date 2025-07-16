import React from "react";
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../msalConfig';
import "./LoginPage.css";

const LoginPage = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginPopup(loginRequest)
      .then(response => {
        console.log('Login successful!', response);
        // MSAL will automatically handle the authentication state
        // No need to call onLogin callback anymore
      })
      .catch(error => {
        console.error('Login failed:', error);
        alert('Login failed: ' + (error.message || 'Unknown error'));
      });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="medical-header">
          <div className="medical-icon">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="#2c5aa0"/>
              <circle cx="12" cy="12" r="10" stroke="#2c5aa0" strokeWidth="1.5" fill="none"/>
              <path d="M12 6v12M6 12h12" stroke="#2c5aa0" strokeWidth="2"/>
            </svg>
          </div>
          <h1>HealthTracker Pro</h1>
          <p className="subtitle">Symptom Monitoring & Health Analytics</p>
        </div>
        
        <div className="login-form">
          <div className="welcome-message">
            <h2>Welcome to Your Health Dashboard</h2>
            <p>Securely track your symptoms and monitor your health journey with our professional healthcare platform.</p>
          </div>
          
          <div className="security-notice">
            <div className="security-icon">🔒</div>
            <p>Secure authentication through University of Maine System</p>
          </div>
          
          <button onClick={handleLogin} className="healthcare-login-btn">
            <div className="btn-content">
              <span className="btn-icon">🏥</span>
              <span className="btn-text">Sign In with Azure AD</span>
            </div>
          </button>
          
          <div className="features-preview">
            <h3>Platform Features</h3>
            <ul>
              <li>📊 Advanced symptom tracking</li>
              <li>📈 Health trend analytics</li>
              <li>📋 Comprehensive health reports</li>
              <li>🔐 HIPAA-compliant security</li>
            </ul>
          </div>
        </div>
        
        <div className="healthcare-footer">
          <p>© 2025 University of Maine System Health Services</p>
          <p>Confidential & Secure Healthcare Platform</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;