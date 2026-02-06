import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import './OTPLogin.css';

const OTPLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    
    // Validate phone number (10 digits starting with 6-9)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    try {
      await authService.sendOTP(phoneNumber);
      toast.success('OTP sent successfully!');
      setStep('otp');
      setOtpSent(true);
    } catch (error) {
      // Error handled by axios interceptor
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const data = await authService.verifyOTP(phoneNumber, otp);
      if (data.isNewUser) {
        // New user - redirect to complete profile
        toast.success(data.message);
        login(data.tempToken, null);
        navigate('/complete-profile');
      } else {
        // Existing user - login and redirect to home
        toast.success('Login successful!');
        login(data.token, data.user);
        navigate('/');
      }
    } catch (error) {
      // Error handled by axios interceptor
      setOtp('');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      await authService.sendOTP(phoneNumber);
      toast.success('OTP resent successfully!');
      setOtp('');
    } catch (error) {
      // Error handled by axios interceptor
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-login-container">
      <div className="otp-login-card">
        <div className="otp-login-header">
          <h1>HireBuddy</h1>
          <p>Connect. Help. Earn.</p>
        </div>

        {step === 'phone' ? (
          <form onSubmit={handleSendOTP} className="otp-form">
            <h2>Enter Your Mobile Number</h2>
            <p className="otp-subtitle">We'll send you an OTP to verify</p>
            
            <div className="input-group">
              <span className="country-code">+91</span>
              <input
                type="tel"
                placeholder="Enter 10-digit mobile number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                maxLength="10"
                disabled={loading}
                required
                autoFocus
              />
            </div>

            <button 
              type="submit" 
              className="btn-primary"
              disabled={loading || phoneNumber.length !== 10}
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="otp-form">
            <h2>Enter OTP</h2>
            <p className="otp-subtitle">
              OTP sent to +91 {phoneNumber}
              <button 
                type="button" 
                className="btn-link"
                onClick={() => {
                  setStep('phone');
                  setOtp('');
                  setOtpSent(false);
                }}
              >
                Change
              </button>
            </p>
            
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              maxLength="6"
              disabled={loading}
              required
              autoFocus
              className="otp-input"
            />

            <button 
              type="submit" 
              className="btn-primary"
              disabled={loading || otp.length !== 6}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>

            <button 
              type="button"
              className="btn-secondary"
              onClick={handleResendOTP}
              disabled={loading}
            >
              Resend OTP
            </button>
          </form>
        )}

        <div className="otp-footer">
          <p>By continuing, you agree to our Terms & Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default OTPLogin;
