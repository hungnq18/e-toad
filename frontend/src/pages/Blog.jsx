// src/pages/Blog.js
import { Input, Pagination } from 'antd'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import imageUrl from '../assets/image/blog.png'
import BlogCard from '../component/card/BlogCard'
import { BlogContext } from '../contexts/BlogContext.jsx'
const Blog = () => {
  const { blogs, loading } = useContext(BlogContext)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 6
  const navigate = useNavigate()

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  )

  const paginatedBlogs = filteredBlogs.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  if (loading) return <p>Đang tải...</p>

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Danh sách bài viết</h1>

      <div className="mb-6 w-full md:w-1/2">
        <Input.Search
          placeholder="Tìm kiếm bài viết..."
          enterButton
          size="large"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setCurrentPage(1)
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedBlogs.map(blog => (
          <BlogCard
            key={blog.id}
            title={blog.title}
            description={blog.description}
            imageUrl={imageUrl}
            date={blog.createdAt}
            author={blog.author}
            likes={blog.likes}
            onClick={() => navigate(`/blog/${generateSlug(blog.title)}`)}
          />
        ))}
      </div>

      <div className="mt-10">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredBlogs.length}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  )
}

export default Blog
