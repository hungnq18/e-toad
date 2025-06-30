import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addCommentToBlog, getAllBlogs, getBlogById, likeBlog } from '../api/blogApi'; // đổi từ getBlogBySlug sang getBlogById
import SuggestBlog from '../component/SuggestBlog';

const BlogDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null)
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [liking, setLiking] = useState(false);
  const [suggestedBlogs, setSuggestedBlogs] = useState([]);

  // 👉 Extract ID từ cuối slug
  const id = slug.split('-').pop()

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlogById(id) // đổi lại gọi theo ID
        setBlog(res)
        // Lấy các blog khác để đề xuất
        const all = await getAllBlogs();
        const others = (all.blogs || []).filter(b => b._id !== res._id).slice(0, 3);
        setSuggestedBlogs(others);
      } catch (error) {
        console.error('Lỗi khi lấy blog:', error)
      }
    }

    fetchBlog()
  }, [id])

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    setSubmitting(true);
    try {
      console.log('Gửi comment cho blog id:', blog._id, 'Nội dung:', newComment); // Log gửi comment
      await addCommentToBlog(blog._id, newComment);
      setNewComment('');
      // Reload lại blog để lấy comment mới
      const res = await getBlogById(blog._id);
      setBlog(res);
      console.log('Gửi comment thành công, blog sau khi reload:', res); // Log sau khi gửi thành công
    } catch (err) {
      console.error('Lỗi khi gửi comment:', err); // Log lỗi khi gửi comment
      alert('Lỗi khi gửi bình luận');
    }
    setSubmitting(false);
  };

  const handleLike = async () => {
    setLiking(true);
    try {
      await likeBlog(blog._id);
      const res = await getBlogById(blog._id);
      setBlog(res);
    } catch (err) {
      alert('Lỗi khi like bài viết');
    }
    setLiking(false);
  };

  if (!blog) return <p className="text-center mt-10">Không tìm thấy bài viết.</p>

  return (
    <div className="relative w-full min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-10 max-w-full px-2 md:px-8">
        {/* Phần blog chính ở giữa */}
        <div className="flex-1 flex justify-center order-1 md:order-none">
          <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow p-4 md:p-10 mt-8 mb-8 md:mb-16">
            <button
              className="mb-6 px-4 py-2 bg-orange-100 text-orange-700 rounded-full font-semibold hover:bg-orange-200 transition w-fit"
              onClick={() => navigate(-1)}
            >
              ← Quay lại
            </button>
            <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
            {blog.intro && <p className="text-lg mb-2 text-orange-700 font-semibold">{blog.intro}</p>}
            {blog.content && <p className="text-xl mb-4">{blog.content}</p>}
            <p className="text-gray-500 text-sm mb-2">
              Tác giả: {blog.author.fullName} - Ngày đăng: {new Date(blog.createdAt).toLocaleDateString()}
            </p>
            <img
              src={blog.image || '/default-image.jpg'}
              alt={blog.title}
              className="w-full h-64 object-cover mb-6 rounded"
            />

            {blog.sections?.map((section, index) => {
              return (
                <div key={index} className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">{section.heading}</h2>
                  {section.text
                    ? (
                        Array.isArray(section.text) ? (
                          <ul className="list-disc list-inside text-gray-800 leading-relaxed">
                            {section.text.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-800 leading-relaxed">{section.text}</p>
                        )
                      )
                    : (
                        <p className="text-gray-400 italic">Chưa có nội dung cho mục này.</p>
                      )
                  }
                </div>
              );
            })}

            {/* CTA cuối trang */}
            {blog.cta && blog.cta.text && (
              <div className="mt-10 p-6 bg-orange-50 rounded-xl text-center border border-orange-200 flex flex-col items-center justify-center relative">
                <p className="text-lg font-semibold text-orange-700 mb-2">{blog.cta.text}</p>
                {blog.cta.link && (
                  <>
                    {/* Mũi tên động */}
                    <div style={{
                      position: 'absolute',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      top: '-30px',
                      animation: 'arrow-bounce 1s infinite',
                      zIndex: 2
                    }}>
                      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 4V28M18 28L8 18M18 28L28 18" stroke="#F97316" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    {/* Nút CTA nhấp nháy */}
                    <a
                      href={blog.cta.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 px-6 py-2 bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600 transition shadow-lg"
                      style={{
                        animation: 'cta-blink 1s infinite',
                        boxShadow: '0 0 16px 2px #FDBA74'
                      }}
                    >
                      Tìm hiểu thêm
                    </a>
                    {/* CSS animation */}
                    <style>{`
                      @keyframes cta-blink {
                        0%, 100% { filter: brightness(1); box-shadow: 0 0 16px 2px #FDBA74; }
                        50% { filter: brightness(1.3); box-shadow: 0 0 32px 8px #FDBA74; }
                      }
                      @keyframes arrow-bounce {
                        0%, 100% { transform: translateX(-50%) translateY(0); }
                        50% { transform: translateX(-50%) translateY(-10px); }
                      }
                    `}</style>
                  </>
                )}
              </div>
            )}

            {/* Nút like và số lượng like */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-600 font-bold hover:bg-pink-200 transition border border-pink-200"
                onClick={handleLike}
                disabled={liking}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
                {liking ? 'Đang thích...' : 'Thích'}
              </button>
              <span className="text-pink-600 font-semibold">{blog.likes?.length || 0} lượt thích</span>
            </div>

            {/* Hiển thị danh sách comment */}
            <div className="mt-10">
              <h3 className="text-xl font-bold mb-4">Bình luận</h3>
              {blog.comments && blog.comments.length > 0 ? (
                <ul className="space-y-4">
                  {blog.comments.map((cmt, idx) => (
                    <li key={cmt._id || idx} className="bg-gray-50 p-3 rounded-lg border">
                      <div className="flex items-center gap-2 mb-1">
                        <img src={cmt.user?.avatar || '/default-avatar.png'} alt="avatar" className="w-8 h-8 rounded-full"/>
                        <span className="font-semibold">{cmt.user?.fullName || 'Ẩn danh'}</span>
                        <span className="text-xs text-gray-400 ml-2">{new Date(cmt.createdAt).toLocaleString()}</span>
                      </div>
                      <div className="text-gray-800">{cmt.content}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">Chưa có bình luận nào.</p>
              )}
            </div>
            {/* Form thêm comment mới */}
            <div className="mt-6">
              <textarea
                className="w-full border rounded-lg p-2 mb-2"
                rows={3}
                placeholder="Nhập bình luận của bạn..."
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                disabled={submitting}
              />
              <button
                className="bg-orange-500 text-white px-4 py-2 rounded-full font-bold hover:bg-orange-600 transition"
                onClick={handleAddComment}
                disabled={submitting}
              >
                {submitting ? 'Đang gửi...' : 'Gửi bình luận'}
              </button>
            </div>
          </div>
        </div>
        {/* Phần đề xuất nằm ngang bên phải, sticky trên md, dưới cùng ở mobile */}
        <div className="w-full md:w-[420px] flex-shrink-0 order-2 md:order-none mt-5 pr-4 md:mt-16 mb-8">
          <div className="bg-white rounded-xl shadow pr-4 md:sticky md:top-10">
            <SuggestBlog currentBlogId={blog._id} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogDetail
