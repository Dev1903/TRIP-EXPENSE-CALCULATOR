import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { googleLogin } from '../api/api';

const LoginPage = () => {

  const handleGoogleLogin = async (response) => {
    try {
      const { credential } = response;
      const decoded = jwtDecode(credential);

      console.log('Decoded Google User Info:', decoded);

      // Send decoded user data + token to backend
      const backendResponse = await googleLogin({ user: decoded, token: credential });

      console.log('Backend Response:', backendResponse);
    } catch (error) {
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

          <form onSubmit={handleGoogleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">Email</label>
              <div className="input-group">
                <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                <input type="email" id="email" className="form-control" placeholder="Enter your email" required />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold">Password</label>
              <div className="input-group">
                <span className="input-group-text"><i className="fas fa-lock"></i></span>
                <input type="password" id="password" className="form-control" placeholder="Enter your password" required />
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
            Don't have an account? <a href="#" className="text-decoration-none fw-bold text-primary">Sign up</a>
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
