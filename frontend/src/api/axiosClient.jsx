// src/api/axiosClient.js
import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'http://localhost:3001', // Đổi nếu bạn dùng cổng khác
  headers: {
    'Content-Type': 'application/json',
  },
})

// Nếu muốn xử lý token tự động ở đây cũng được
// axiosClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token')
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })

export default axiosClient
