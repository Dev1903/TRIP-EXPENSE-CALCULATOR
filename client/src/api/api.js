import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;

export const googleLogin = async (userData) => {
  try {
    const response = await axios.post(`${URL}/google-login`, userData);
    console.log(response)
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
