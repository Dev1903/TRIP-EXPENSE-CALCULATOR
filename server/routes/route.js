import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode'
import { OAuth2Client } from 'google-auth-library';
import User from '../schema/schemas.js';

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; 
const SESSION_EXPIRY = "1h"; 

// Temporary session storage
const sessionTokens = new Map(); // { userId: token }

// 🟢 Email/Password Login API
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    if (sessionTokens.has(user._id.toString())) {
      return res.status(200).json({ message: "Already logged in", token: sessionTokens.get(user._id.toString()), user });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: SESSION_EXPIRY });
    sessionTokens.set(user._id.toString(), token);

    res.status(200).json({ message: "Login successful", token, user });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 🟢 Google Login API
router.post("/google-login", async (req, res) => {
    try {
      const { credential } = req.body; // ✅ Extract token correctly
      console.log(credential)
    //   if (!token) return res.status(400).json({ message: "No token provided" });
  
      // ✅ Decode the token first
      const userInfo = jwtDecode(credential);
      console.log("User Info:", userInfo);
  
      // ✅ Verify token with Google
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
  
      // ✅ Get user details from Google
      const { email, name, picture } = ticket.getPayload();
      console.log("Google User Data:", { email, name, picture });
      console.log(ticket.getPayload())
  
      let user = await User.findOne({ email });
  
      // ✅ If user doesn't exist, create one
      if (!user) {
        user = new User({ name, email, picture: picture }); // Google ID as password (not used)
        await user.save();
      }
  
      // ✅ Check session token
      if (sessionTokens.has(user._id.toString())) {
        return res.status(200).json({ message: "Already logged in", token: sessionTokens.get(user._id.toString()), user });
      }
  
      // ✅ Generate JWT Token
      const jwtToken = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: SESSION_EXPIRY });
      sessionTokens.set(user._id.toString(), jwtToken);
  
      res.status(200).json({ message: "Google login successful", token: jwtToken, user });
  
    } catch (error) {
      console.error("Google Login Error:", error);
      res.status(500).json({ message: "Google Authentication Failed" });
    }
  });

// 🟢 Logout API
router.post("/logout", (req, res) => {
  const { userId } = req.body;
  sessionTokens.delete(userId);
  res.status(200).json({ message: "Logged out successfully" });
});

router.post('/signup', async (req, res) => {
    try {
        const { email, phone, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create User
        const newUser = new User({
            email,
            phone,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
