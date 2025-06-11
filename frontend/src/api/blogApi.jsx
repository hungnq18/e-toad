// src/api/blogApi.js
import axios from 'axios'

const BASE_URL = 'http://localhost:3001'

export const getBlogs = () => axios.get(`${BASE_URL}/blogs`)
export const getBlogBySlug = (slug) => axios.get(`${BASE_URL}/blogs?slug=${slug}`)
