// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'
import { BASE_URL } from 'src/configs/constanst'

// ** Config
import authConfig from 'src/configs/auth'
import axios from 'axios';

const api = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    'Authorization':  `Bearer ${storedToken}`,
    // Other headers
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle the "401 Unauthorized" error here
      // For example, you can log the user out or show an error message
      console.error('Authentication failed. Please log in again.');
      // Redirect to the login page
      window.location.href = '/login'; // Adjust the URL to your login page
    }
    return Promise.reject(error);
  }
);

export default api;
