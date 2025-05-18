// src/services/productService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';  // Replace with your backend API URL

export const fetchProducts = async () => {
  const response = await axios.get(`${API_URL}/products/`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token for fetching products
    },
  });
  return response.data;
};

export const createProduct = async (productData) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(`${API_URL}/products/`, productData, {
      headers: {
        'Authorization': `Bearer ${token}`, // Include token for creating product
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error.response ? error.response.data : error.message);
    throw error; // Rethrow the error for further handling if needed
  }
};

