import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;

export const googleLogin = async (userData) => {
  try {
    const response = await axios.post(`${URL}/google-login`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Network Error' };
  }
};

export const emailPasswordLogin = async (credentials) => {
  try {
    const response = await axios.post(`${URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Network Error' };
  }
};

export const signupUser = async (userData) => {
  try {
      const response = await axios.post(`${URL}/signup`, userData);
      return response.data;
  } catch (error) {
      console.error('Signup Error:', error.response?.data || error.message);
      throw error;
  }
};

// ✅ Fetch user groups by email
export const fetchUserGroups = async (email) => {
  try {
      const response = await axios.get(`${URL}/user-groups/${email}`);
      return response.data.groups || [];
  } catch (error) {
      console.error("Error fetching groups:", error);
      return [];
  }
};

// ✅ **New Function: Add a Group**
export const createTripGroup = async (groupData) => {
  try {
      console.log("API: ",groupData);
      const response = await axios.post(`${URL}/create-group`, groupData);
      
      return response.data.group;
  } catch (error) {
      console.error("Error creating group:", error);
      throw error;
  }
};