import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for sending cookies with requests
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage or cookie
    const token = localStorage.getItem('token') || getCookie('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Handle successful responses
    if (response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const { status, data } = error.response;
      
      if (status === 401) {
        // Handle unauthorized access
        console.error('Unauthorized access - please log in');
        // Optionally redirect to login page
        // window.location.href = '/login';
      } else if (status === 403) {
        console.error('Forbidden - insufficient permissions');
      } else if (status === 404) {
        console.error('Resource not found');
      } else if (status >= 500) {
        console.error('Server error occurred');
      }
      
      // Return error response data if available
      return Promise.reject(data || 'An error occurred');
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response from server. Please check your connection.');
      return Promise.reject('No response from server');
    } else {
      // Something happened in setting up the request
      console.error('Request error:', error.message);
      return Promise.reject(error.message);
    }
  }
);

// Helper function to get cookie value
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

export default api;
