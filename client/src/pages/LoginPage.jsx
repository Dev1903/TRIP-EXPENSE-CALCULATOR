import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { googleLogin, emailPasswordLogin } from '../api/api';
import { Link, useNavigate } from 'react-router-dom';
import Notiflix from 'notiflix';
import quotes from '../components/quotes';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const getRandomQuote = () => {
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  const handleGoogleLogin = async (response) => {
    try {
      await googleLogin(response);
      // console.log('Backend Response:', backendResponse);

      Notiflix.Report.success(
        'Welcome!',
        getRandomQuote(),
        'Proceed',
        () => navigate('/dashboard')
      );
    } catch (error) {
      Notiflix.Notify.failure('Google login failed!');
      console.error('Login Error:', error);
    }
  };

  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();
    try {
      await emailPasswordLogin(email, password);
      // console.log('Backend Response:', backendResponse);

      Notiflix.Report.success(
        'Welcome!',
        getRandomQuote(),
        'Proceed',
        () => navigate('/dashboard')
      );
    } catch (error) {
      Notiflix.Notify.failure('Wrong email or password!');
      console.error('Login Error:', error);
    }
  };

  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}>
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card shadow-lg p-4 border-0 rounded-4" style={{ maxWidth: '400px', width: '100%' }}>
          <h3 className="text-center mb-4 text-primary fw-bold">
            <i className="fas fa-wallet me-2"></i>Trip Expense Login
          </h3>

          <form onSubmit={handleEmailPasswordLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">Email</label>
              <div className="input-group">
                <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold">Password</label>
              <div className="input-group">
                <span className="input-group-text"><i className="fas fa-lock"></i></span>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 fw-bold">
              <i className="fas fa-sign-in-alt me-2"></i>Log In
            </button>
          </form>

          <div className="text-center my-3 fw-bold">OR</div>

          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => console.log('Google Sign-In Failed')}
          />

          <p className="text-center mt-3">
            Don't have an account? <Link to="/signup" className="text-decoration-none fw-bold text-primary">Sign up</Link>
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;