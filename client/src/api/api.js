import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;

export const googleLogin = async (userData) => {
  try {
    const response = await axios.post(`${URL}/login`, userData);
    console.log(response)
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Network Error' };
  }
};
