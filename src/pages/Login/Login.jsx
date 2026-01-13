import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './../../api/axios';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/login/", { email, password });
      setMessage(response.data.message);

      // Save tokens for future requests
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      console.log("Logged in user:", response.data.user);

      // Redirect to homepage after login
      navigate("/");

    } catch (error) {
      console.error(error.response?.data);
      setMessage(error.response?.data?.error || "Login failed");
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-background"></div>

      <div className="auth-content">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to continue your fragrance journey</p>
          </div>

          <div className="auth-form">
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-options">
                <div className="form-checkbox">
                  <input type="checkbox" id="remember" className="checkbox-input" />
                  <label htmlFor="remember" className="checkbox-label">
                    Remember me
                  </label>
                </div>
                <span className="forgot-link">Forgot Password?</span>
              </div>

              <button type="submit" className="auth-btn">
                Sign In
              </button>

              {message && (
                <p style={{ marginTop: "12px", color: message.includes("successful") ? "green" : "red" }}>
                  {message}
                </p>
              )}
            </form>
          </div>

          <div className="auth-divider">
            <span>or continue with</span>
          </div>

          <div className="social-buttons">
            <button className="social-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button className="social-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
          </div>

          <div className="auth-footer">
            <p className="auth-footer-text">
              Don't have an account? <span className="auth-link">Sign Up</span>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .auth-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .auth-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          z-index: 0;
        }

        .auth-background::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
          animation: float 20s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .auth-content {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 480px;
          padding: 20px;
        }

        .auth-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 48px 40px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }

        .auth-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .auth-title {
          font-size: 32px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 8px;
          letter-spacing: -0.5px;
        }

        .auth-subtitle {
          font-size: 15px;
          color: #666;
          font-weight: 400;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          font-size: 14px;
          font-weight: 600;
          color: #333;
          letter-spacing: 0.2px;
        }

        .form-input {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          font-size: 15px;
          transition: all 0.3s ease;
          background: #fff;
          color: #333;
        }

        .form-input:focus {
          outline: none;
          border-color: #9c88ff;
          box-shadow: 0 0 0 3px rgba(156, 136, 255, 0.1);
        }

        .form-input::placeholder {
          color: #999;
        }

        .form-checkbox {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .checkbox-input {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #9c88ff;
        }

        .checkbox-label {
          font-size: 14px;
          color: #555;
          cursor: pointer;
          user-select: none;
        }

        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .forgot-link {
          font-size: 14px;
          color: #9c88ff;
          text-decoration: none;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .forgot-link:hover {
          color: #7c68df;
        }

        .auth-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #9c88ff, #ff9ff3);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(156, 136, 255, 0.3);
          margin-top: 8px;
        }

        .auth-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(156, 136, 255, 0.4);
        }

        .auth-btn:active {
          transform: translateY(0);
        }

        .auth-divider {
          position: relative;
          text-align: center;
          margin: 28px 0;
        }

        .auth-divider::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          width: 100%;
          height: 1px;
          background: #e0e0e0;
        }

        .auth-divider span {
          position: relative;
          background: rgba(255, 255, 255, 0.95);
          padding: 0 16px;
          font-size: 13px;
          color: #999;
          font-weight: 500;
        }

        .social-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          background: white;
          color: #555;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .social-btn:hover {
          border-color: #9c88ff;
          background: #f8f7ff;
        }

        .auth-footer {
          text-align: center;
          margin-top: 28px;
        }

        .auth-footer-text {
          font-size: 14px;
          color: #666;
        }

        .auth-link {
          color: #9c88ff;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .auth-link:hover {
          color: #7c68df;
          text-decoration: underline;
        }

        @media (max-width: 640px) {
          .auth-card {
            padding: 32px 24px;
          }

          .auth-title {
            font-size: 28px;
          }

          .social-buttons {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
