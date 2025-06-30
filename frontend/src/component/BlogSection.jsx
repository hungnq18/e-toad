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

  // Lấy 5 bài viết mới nhất đã sort
  const latestBlogs = [...blogs]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

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
        <div className="grid grid-cols-3 grid-rows-2 gap-6 mt-6">
          {/* Card dài (blog đầu tiên) nằm trên, chiếm 2 cột */}
          {latestBlogs[0] && (
            <div className="col-span-2 row-span-1">
              <BlogCard
                style={{ borderRadius: "50px", backgroundColor: "#FFF1E0", height: "100%" }}
                imageUrl={latestBlogs[0].image || blogImg}
                title={latestBlogs[0].title}
                description={latestBlogs[0].intro || (latestBlogs[0].content || '').split('\n')[0]}
                date={new Date(latestBlogs[0].createdAt).toLocaleDateString()}
                author={latestBlogs[0].author}
                likes={latestBlogs[0].likes?.length || 0}
              />
            </div>
          )}
          {/* Card nhỏ thứ 1 nằm bên phải card dài, hàng 1 cột 3 */}
          {latestBlogs[1] && (
            <div className="col-start-3 row-start-1">
              <BlogCard
                style={{ borderRadius: "50px", backgroundColor: "#FFF1E0", height: "100%" }}
                imageUrl={latestBlogs[1].image || blogImg}
                title={latestBlogs[1].title}
                description={latestBlogs[1].intro || (latestBlogs[1].content || '').split('\n')[0]}
                date={new Date(latestBlogs[1].createdAt).toLocaleDateString()}
                author={latestBlogs[1].author}
                likes={latestBlogs[1].likes?.length || 0}
              />
            </div>
          )}
          {/* 3 card nhỏ dưới, đều nhau, thẳng hàng */}
          {latestBlogs.slice(2, 5).map((blog, idx) => (
            <div className="row-start-2 col-span-1" key={blog._id}>
              <BlogCard
                style={{ borderRadius: "50px", backgroundColor: "#FFF1E0", height: "100%" }}
                imageUrl={blog.image || blogImg}
                title={blog.title}
                description={blog.intro || (blog.content || '').split('\n')[0]}
                date={new Date(blog.createdAt).toLocaleDateString()}
                author={blog.author}
                likes={blog.likes?.length || 0}
              />
            </div>
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