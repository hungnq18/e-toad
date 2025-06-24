import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogById } from '../api/blogApi'; // đổi từ getBlogBySlug sang getBlogById

const BlogDetail = () => {
  const { slug } = useParams()

  const [blog, setBlog] = useState(null)

  // 👉 Extract ID từ cuối slug
  const id = slug.split('-').pop()

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlogById(id) // đổi lại gọi theo ID
        setBlog(res)
      } catch (error) {
        console.error('Lỗi khi lấy blog:', error)
      }
    }

    fetchBlog()
  }, [id])

  if (!blog) return <p className="text-center mt-10">Không tìm thấy bài viết.</p>

  return (
    <div className="max-w-3xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-xl mb-4">{blog.content}</p>
      <p className="text-gray-500 text-sm mb-2">
        Tác giả: {blog.author.fullName} - Ngày đăng: {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <img
        src={blog.image || '/default-image.jpg'}
        alt={blog.title}
        className="w-full h-64 object-cover mb-6 rounded"
      />

      {blog.sections?.map((section, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{section.heading}</h2>
          <p className="text-gray-800 leading-relaxed">{section.text}</p>
        </div>
      ))}
    </div>
  )
}

export default BlogDetail
