// src/pages/Blog.js
import { Button, Input, Pagination } from 'antd'
import { formatDistanceToNow } from 'date-fns'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BlogCard from '../component/card/BlogCard'
import useBlog from '../hooks/useBlog'

const Blog = () => {
  const { blogs, loading, error } = useBlog()
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 3
  const navigate = useNavigate()

  const filteredBlogs = (blogs || []).filter(blog =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  )

  const paginatedBlogs = filteredBlogs.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) return <div className="text-red-500 text-center p-4">{error}</div>

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Danh sách bài viết</h1>
        <Button 
          type="primary" 
          onClick={() => navigate('/blogs/create')}
          style={{ backgroundColor: '#F97316', border: 'none' }}
        >
          Tạo bài viết mới
        </Button>
      </div>

      <div className="mb-6 w-full md:w-1/2">
        <Input.Search
          style={{border:'none'}}
          placeholder="Tìm kiếm bài viết..."
          enterButton={
            <Button style={{ backgroundColor: '#F97316', color: '#FFFFFF', border:'none' }}>
              Tìm kiếm
            </Button>
          }
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
            key={blog._id}
            id={blog._id}
            title={blog.title}
            description={(blog.content || '').split('\n')[0]}
            imageUrl={blog.image}
            date={formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
            author={blog.author}
            likes={blog.likes?.length || 0}
            onClick={() => navigate(`/blogs/${blog.slug}`)}
          />
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          Không tìm thấy bài viết nào
        </div>
      )}

      {filteredBlogs.length > 0 && (
        <div className="mt-10">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredBlogs.length}
            onChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  )
}

export default Blog
