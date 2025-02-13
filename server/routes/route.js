import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { jwtDecode } from "jwt-decode";
import { OAuth2Client } from "google-auth-library";
import { User, TripGroup } from "../schema/schemas.js";
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const SESSION_EXPIRY = "1h";

// 🟢 Email/Password Login API
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log("LOGIN REQ>BODY:",req.body)
    // console.log("Email: ", req.body.email)
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });


    // ✅ Send token in response (Frontend stores in sessionStorage)
    res.status(200).json({ message: "Login successful"});
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 🟢 Google Login API
router.post("/google-login", async (req, res) => {
  try {
    const { credential } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, picture } = ticket.getPayload();
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, email, picture });
      await user.save();
    }

    // ✅ Generate JWT Token
    const jwtToken = jwt.sign(
      { _id: user._id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: SESSION_EXPIRY }
    );

    res.status(200).json({ message: "Google login successful", token: jwtToken });
  } catch (error) {
    console.error("Google Login Error:", error);
    res.status(500).json({ message: "Google Authentication Failed" });
  }
});

// 🟢 Logout API
router.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

router.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();
    const token = jwt.sign(
      { _id: newUser._id, name: newUser.name, email: newUser.email },
      JWT_SECRET,
      { expiresIn: SESSION_EXPIRY }
    );
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/create-group", async (req, res) => {
  try {
    const { groupName, members } = req.body;
    // console.log("Route req.body", req.body);

    // Validate input
    if (!groupName || !members.length) {
      return res.status(400).json({ message: "Group name and members are required" });
    }

    // Create and save the group
    const newGroup = new TripGroup({ groupName, members });
    await newGroup.save();

    res.status(201).json({ message: "Trip group created successfully", group: newGroup });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Fetch groups for a logged-in user
router.get("/user-groups/:email", async (req, res) => {
  try {
    const { email } = req.params;
    console.log("Backend Email: ", email)

    // Find groups where the user is a member
    const userGroups = await TripGroup.find({ "members.email": email });
    console.log("ROUTE USER GROUPS:", userGroups)

    if (!userGroups.length) {
      return res.status(404).json({ message: "No groups found for this user" });
    }

    res.status(200).json({ userGroups: userGroups });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Fetch user details by email
router.get("/user/:email", async (req, res) => {
  try {
    const userEmail = req.params.email;

    // Find user by email
    const user = await User.findOne({ email: userEmail }).select("_id name email");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Fetch group by ID
router.get("/group/:id", async (req, res) => {
    try {
        const group = await TripGroup.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }
        res.json(group);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

export default router;
