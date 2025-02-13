import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;

// ✅ Login (Email/Password)
export const emailPasswordLogin = async (email, password) => {
  try {
    const response = await axios.post(`${URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

// ✅ Google Login
export const googleLogin = async (credential) => {
  try {
    const response = await axios.post(`${URL}/google-login`, credential);
    const { token } = response.data;

    sessionStorage.setItem("jwtToken", token);  // Save token

    return response.data;
  } catch (error) {
    console.error("Google Login Error:", error);
    throw error;
  }
};

// ✅ Logout
export const logoutUser = async () => {
  try {
    await axios.post("/api/logout");

    sessionStorage.removeItem("jwtToken");  // Remove session storage
    sessionStorage.removeItem("user");

    return { message: "Logged out successfully" };
  } catch (error) {
    console.error("Logout Error:", error);
    throw error;
  }
};

export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${URL}/signup`, userData);
    const { token } = response.data;
    sessionStorage.setItem("jwtToken", token);  // Save token
    return response.data;
  } catch (error) {
    console.error('Signup Error:', error.response?.data || error.message);
    throw error;
  }
};

// ✅ Fetch user groups by email
export const fetchUserGroups = async (email) => {
  try {
    // console.log("FETCH GROUP EMAIL:", email)
    const response = await axios.get(`${URL}/user-groups/${email}`);
    // console.log("FETCH GROUP RESPONSE API:", response)
    return response.data.userGroups || [];
  } catch (error) {
    console.error("Error fetching groups:", error);
    return [];
  }
};

// ✅ **New Function: Add a Group**
export const createTripGroup = async (groupData) => {
  try {
    // console.log("API: ",groupData);
    const response = await axios.post(`${URL}/create-group`, groupData);

    return response.data.group;
  } catch (error) {
    console.error("Error creating group:", error);
    throw error;
  }
};

export const fetchUserByEmail = async (email) => {
  try {
    const response = await axios.get(`${URL}/user/${email}`);
    return response.data; // Returns user object: { _id, name, email }
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
};

export const fetchGroupById = async (groupId) => {
    try {
        const response = await fetch(`${URL}/group/${groupId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch group");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching group:", error);
        return null;
    }
};