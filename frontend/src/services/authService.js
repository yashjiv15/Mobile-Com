// src/services/authService.js
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://localhost:8000/api';

export const loginUser  = async (usernameOrEmail, password) => {
  const formData = new URLSearchParams();
  formData.append('grant_type', 'password');
  formData.append('username', usernameOrEmail);
  formData.append('password', password);

  try {
    const response = await axios.post(`${API_URL}/login`, formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const token = response.data.access_token;
    const decoded = jwtDecode(token);

    // Store token and extracted values
    localStorage.setItem('token', token);
    localStorage.setItem('email', decoded.email);
    localStorage.setItem('role', decoded.role);
    localStorage.setItem('user_id', decoded.user_id);

    return decoded;
  } catch (error) {
    throw new Error('Login failed. Please check your credentials.');
  }
};

export const signUpUser  = async (email, password, role) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { email, password, role });
    localStorage.setItem('token', response.data.token);  // Save token to localStorage
  } catch (error) {
    throw new Error('Sign up failed. Please try again.');
  }
};
