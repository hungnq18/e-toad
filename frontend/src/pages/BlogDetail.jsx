// src/pages/BlogDetail.js
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBlogBySlug } from '../api/blogApi'

const BlogDetail = () => {
  const { slug } = useParams()
  const [blog, setBlog] = useState(null)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlogBySlug(slug)
        if (res.data.length > 0) {
          setBlog(res.data[0])
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchBlog()
  }, [slug])

  if (!blog) return <p>Không tìm thấy bài viết.</p>

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-500 text-sm mb-2">Tác giả: {blog.author} - Ngày đăng: {blog.createdAt}</p>
      <img src="/default-image.jpg" alt={blog.title} className="w-full h-64 object-cover mb-6" />
      <p>{blog.description}</p>
    </div>
  )
}

export default BlogDetail
