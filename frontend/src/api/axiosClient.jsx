// src/api/axiosClient.js
import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'https://e-toad.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle response errors
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default axiosClient
