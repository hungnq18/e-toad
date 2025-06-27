import React, { useEffect, useState } from 'react';
import { getAllBlogs } from '../api/blogApi';
import blogImg from "../assets/image/blog.png";
import Button from "./Button.jsx";
import BlogCard from "./card/BlogCard";

function BlogSection() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await getAllBlogs();
        setBlogs(res.blogs || []);
      } catch (err) {
        setBlogs([]);
      }
    };
    fetchBlogs();
  }, []);

  // Lấy 5 bài viết mới nhất
  const latestBlogs = blogs.slice(0, 5);

  return (
    <div className="mx-auto w-full my-10 pt-15 pd-15 relative">
      <div className="w-3/4 mx-auto">
        <h1 className="class-title text-left"
          style={{
            color: '#F97316',
            display: 'flex',
            justifyContent: 'flex-start',
            fontSize: '50px',
            fontWeight: '750'
          }}>
          Tin tức
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 mt-6">
          {/* Card lớn nhất (bài mới nhất) */}
          <div className="grid col-span-2 sm:col-span-2 lg:grid-col-span-2 xl:grid-col-span-2 gap-6 ">
            {latestBlogs[0] && (
              <BlogCard
                style={{ borderRadius: "50px", backgroundColor: "#FFF1E0" }}
                imageUrl={latestBlogs[0].image || blogImg}
                title={latestBlogs[0].title}
                description={latestBlogs[0].intro || (latestBlogs[0].content || '').split('\n')[0]}
                date={new Date(latestBlogs[0].createdAt).toLocaleDateString()}
                author={latestBlogs[0].author}
                likes={latestBlogs[0].likes?.length || 0}
              />
            )}
          </div>
          {/* 2 card nhỏ bên phải */}
          {latestBlogs.slice(1, 3).map((blog, idx) => (
            <BlogCard
              key={blog._id}
              style={{ borderRadius: "50px", backgroundColor: "#FFF1E0" }}
              imageUrl={blog.image || blogImg}
              title={blog.title}
              description={blog.intro || (blog.content || '').split('\n')[0]}
              date={new Date(blog.createdAt).toLocaleDateString()}
              author={blog.author}
              likes={blog.likes?.length || 0}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 mt-6">
          {latestBlogs.slice(3, 5).map((blog, idx) => (
            <BlogCard
              key={blog._id}
              style={{ borderRadius: "50px", backgroundColor: "#FFF1E0" }}
              imageUrl={blog.image || blogImg}
              title={blog.title}
              description={blog.intro || (blog.content || '').split('\n')[0]}
              date={new Date(blog.createdAt).toLocaleDateString()}
              author={blog.author}
              likes={blog.likes?.length || 0}
            />
          ))}
        </div>
        <div className="flex justify-center mt-20 h-13 w-full">
          <Button style={{ backgroundColor: '#F97316', color: '#FFFFFF', fontWeight: "300" }}
            onHover={(e) => e.currentTarget.style.color = '#FF8A00'}
            onMouseOut={(e) => e.currentTarget.style.color = '#FFFFFF'}>
            Xem thêm
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BlogSection