import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import api from './../../api/axios';

export default function Signup() {
    const navigate = useNavigate();  // ← Add this hook
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false); 

    // Form Submission 
    const handleSignup = async (e) => {
        e.preventDefault();

        if (!agreeTerms) {
            setMessage("You must agree to the Terms & Conditions");
            return;
        }

        try {
            const response = await api.post("/users/signup/", {
                email,
                password,
                phone,
                full_name: fullname
            });

            setMessage(response.data.message);
            console.log("User created:", response.data.user);

            // Reset form
            setFullname("");
            setEmail("");
            setPassword("");
            setPhone("");
            setAgreeTerms(false);

            // ✅ Redirect to login after 1.5 seconds
            setTimeout(() => {
                navigate('/login'); 
            }, 1500);

        } catch (error) {
            console.error(error.response?.data);
            setMessage(
                error.response?.data?.email?.[0] ||
                error.response?.data?.password?.[0] ||
                error.response?.data?.phone?.[0] ||
                "Signup failed"
            );
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-background"></div>

            <div className="auth-content">
                <div className="auth-card">
                    <div className="auth-header">
                        <h1 className="auth-title">Create Account</h1>
                        <p className="auth-subtitle">Join our exclusive fragrance community</p>
                    </div>

                    <div className="auth-form">
                        <form onSubmit={handleSignup}>
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Enter your full name"
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                    required
                                />
                            </div>

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
                                <label className="form-label">Phone Number</label>
                                <input
                                    type="tel"
                                    className="form-input"
                                    placeholder="Enter your phone number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-input"
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-checkbox">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    className="checkbox-input"
                                    checked={agreeTerms}
                                    onChange={() => setAgreeTerms(!agreeTerms)}
                                />
                                <label htmlFor="terms" className="checkbox-label">
                                    I agree to the Terms & Conditions
                                </label>
                            </div>

                            <button type="submit" className="auth-btn">
                                Create Account
                            </button>

                            {/* Display message */}
                            <p
                                style={{
                                    marginTop: "12px",
                                    color: message.includes("successfully") ? "green" : "red"
                                }}
                            >
                                {message}
                            </p>

                        </form>
                    </div>

                    <div className="auth-footer">
                        <p className="auth-footer-text">
                            Already have an account?{' '}
                            <span 
                                className="auth-link"
                                onClick={() => navigate('/login')}  // ← Add click handler
                            >
                                Sign In
                            </span>
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
        }
      `}</style>
        </div>
    );
}