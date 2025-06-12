// src/api/blogApi.js
import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export const getBlogs = () => axios.get(`${BASE_URL}/blogs`)
export const getBlogBySlug = (slug) => axios.get(`${BASE_URL}/blogs?slug=${slug}`)

// ✅ Thêm hàm này:
export const getBlogById = (id) => axios.get(`${BASE_URL}/blogs/${id}`)
