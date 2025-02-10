import React, { useState } from 'react';
import { Input, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { signupUser } from '../api/api';

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [emailError, setEmailError] = useState(null);
    const [phoneError, setPhoneError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState(null);

    const [emailColorError, setEmailColorError] = useState(null);
    const [phoneColorError, setPhoneColorError] = useState(null);
    const [passwordColorError, setPasswordColorError] = useState(null);
    const [confirmPasswordColorError, setConfirmPasswordColorError] = useState(null);

    const validateEmail = (value) => {
        if (!value.includes('@')) {
            setEmailError('Invalid email');
            setEmailColorError(true);
        } else {
            setEmailError('A good valid email !');
            setEmailColorError(false);
        }
        setEmail(value);
    };

    const validatePhone = (value) => {
        if (value.length !== 10 || isNaN(value)) {
            setPhoneError('Phone number must be 10 digits');
            setPhoneColorError(true)
        } else {
            setPhoneError('Proper Mobile Number !');
            setPhoneColorError(false);
        }
        setPhone(value);
    };

    const validatePassword = (value) => {
        if (!value) {
            setPasswordError(null);
        } else if (value.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            setPasswordColorError(true);
        } else {
            setPasswordError('Correct Password !');
            setPasswordColorError(false);
        }
        setPassword(value);
    };

    const validateConfirmPassword = (value) => {
        if (!value) {
            setConfirmPasswordError(null);
        } else if (value !== password) {
            setConfirmPasswordError('Passwords do not match');
            setConfirmPasswordColorError(true);
        } else {
            setConfirmPasswordError('Passwords matched !');
            setConfirmPasswordColorError(false);
        }
        setConfirmPassword(value);
    };

    const handleSignup = async () => {
        const userData = { email, phone, password };
        try {
            const response = await signupUser(userData);
            alert(response.message);
        } catch (error) {
            alert(error.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-lg p-4 border-0 rounded-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h3 className="text-center mb-4 text-primary fw-bold">Sign Up</h3>

                {/* Email Input */}
                <FormControl isInvalid={!!emailError} className="">
                    <label className="form-label fw-semibold">Email</label>
                    <Input
                        type="email"
                        className={`form-control ${emailColorError ? "border-danger" : email ? "border-success" : ""}`}
                        value={email}
                        onChange={(e) => validateEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                    <div className='d-flex justify-content-center pe-2 mt-2' style={{ minHeight: '25px' }}><FormErrorMessage className={`${emailColorError ? "text-danger" : email ? "text-success" : ""}`}>{emailError}</FormErrorMessage></div>
                </FormControl>

                {/* Phone Number Input */}
                <FormControl isInvalid={!!phoneError} className="">
                    <label className="form-label fw-semibold">Phone Number</label>
                    <Input
                        type="tel"
                        className={`form-control ${phoneColorError ? "border-danger" : phone ? "border-success" : ""}`}
                        value={phone}
                        onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '')}
                        onChange={(e) => validatePhone(e.target.value)}
                        placeholder="Enter your phone number"
                        required
                    />
                    <div className='d-flex justify-content-center pe-2 mt-2' style={{ minHeight: '25px' }}><FormErrorMessage className={`${phoneColorError ? "text-danger" : "text-success"}`}>{phoneError}</FormErrorMessage></div>
                </FormControl>

                {/* Password Input */}
                <FormControl isInvalid={!!passwordError} className="">
                    <label className="form-label fw-semibold">Password</label>
                    <Input
                        type="password"
                        className={`form-control ${passwordColorError === null ? "" : passwordColorError ? "border-danger" : "border-success"}`}
                        value={password}
                        onChange={(e) => validatePassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                    <div className='d-flex justify-content-center pe-2 mt-2' style={{ minHeight: '25px' }}><FormErrorMessage className={`${passwordColorError === null ? "" : passwordColorError ? "text-danger" : "text-success"}`}>{passwordError}</FormErrorMessage></div>
                </FormControl>

                {/* Confirm Password Input */}
                <FormControl isInvalid={!!confirmPasswordError} className="">
                    <label className="form-label fw-semibold">Confirm Password</label>
                    <Input
                        type="password"
                        className={`form-control ${confirmPasswordColorError === null ? "" : confirmPasswordColorError ? "border-danger" : "border-success"}`}
                        value={confirmPassword}
                        onChange={(e) => validateConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        required
                    />
                    <div className='d-flex justify-content-center pe-2 mt-2' style={{ minHeight: '25px' }}><FormErrorMessage className={`${confirmPasswordColorError === null ? "" : confirmPasswordColorError ? "text-danger" : "text-success"}`}>{confirmPasswordError}</FormErrorMessage></div>
                </FormControl>

                {/* Submit Button */}
                <div className="btn btn-primary w-100 fw-bold mt-3"
                    disabled={passwordColorError || confirmPasswordColorError}
                    onClick={handleSignup}>
                    Sign Up
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
