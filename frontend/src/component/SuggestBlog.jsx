import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { getAllBlogs } from '../api/blogApi';
import BlogCard from './card/BlogCard';

const SuggestBlog = ({ currentBlogId }) => {
  const [suggestedBlogs, setSuggestedBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const all = await getAllBlogs();
        const others = (all.blogs || []).filter(b => b._id !== currentBlogId).slice(0, 3);
        setSuggestedBlogs(others);
      } catch (error) {
        setSuggestedBlogs([]);
      }
    };
    fetchBlogs();
  }, [currentBlogId]);

  return (
    <div className="w-full md:w-[420px] flex-shrink-0">
      <div className="bg-white rounded-xl shadow p-4 sticky top-8">
        <h3 className="text-lg font-bold mb-4 text-orange-600">Bài viết đề xuất</h3>
        {suggestedBlogs.length === 0 ? (
          <p className="text-gray-400 italic">Không có bài viết đề xuất.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {suggestedBlogs.map(blog => (
              <BlogCard
                key={blog._id}
                id={blog._id}
                title={blog.title}
                description={blog.intro || (blog.content || '').split('\n')[0]}
                imageUrl={blog.image}
                date={format(new Date(blog.createdAt), 'dd/MM/yyyy')}
                author={blog.author}
                likes={blog.likes?.length || 0}
                onClick={() => window.location.href = `/blogs/${blog.slug}`}
                className="h-40"
                imageClassName="h-40"
                style={{ cursor: 'pointer' }}
                horizontal={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SuggestBlog; 