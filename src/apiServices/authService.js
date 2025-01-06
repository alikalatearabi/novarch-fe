
import axios from 'axios';

const API_BASE_URL = '/api/auth'; 

/**
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} - Resolves with user data or rejects with an error
 */
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    return response.data; // Success response
  } catch (error) {
    throw error.response?.data?.message || 'Login failed'; // Handle error
  }
};
