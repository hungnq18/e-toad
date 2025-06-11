import { createContext, useEffect, useState } from 'react';
import { getBlogs } from '../api/blogApi';
import { createSlug } from '../ultils/slug'; // ✅ Hàm tạo slug riêng

export const BlogContext = createContext()

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchBlogs = async () => {
    try {
      const res = await getBlogs()

      // Gắn thêm slug nếu chưa có
      const dataWithSlug = res.data.map(blog => ({
        ...blog,
        slug: blog.slug || createSlug(blog.title),
      }))

      setBlogs(dataWithSlug)
      setLoading(false)
    } catch (err) {
      console.error('Lỗi khi fetch blogs:', err)
    }
  }

  // Hàm lấy blog theo slug
  const getBlogBySlug = (slug) => {
    return blogs.find(blog => blog.slug === slug)
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  return (
    <BlogContext.Provider value={{ blogs, loading, getBlogBySlug }}>
      {children}
    </BlogContext.Provider>
  )
}
