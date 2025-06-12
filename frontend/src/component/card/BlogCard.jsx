import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createSlug } from '../../ultils/slug'
const BlogCard = ({
  id,
  imageUrl,
  title,
  description,
  date,
  author,
  likes: initialLikes,
  slug,
  className,
  style,
  imageClassName,
}) => {
  const [likes, setLikes] = useState(initialLikes)
  const [liked, setLiked] = useState(false)
  const navigate = useNavigate()

  const toggleLike = (e) => {
    e.stopPropagation()
    setLiked(!liked)
    setLikes(prev => liked ? prev - 1 : prev + 1)
  }

  const handleClick = () => {
   navigate(`/blog/${createSlug(title)}-${id}`)
  }

  return (
    <div
      onClick={handleClick}
      className={`bg-white rounded-lg overflow-hidden relative ${className || ''} h-[450px] flex flex-col cursor-pointer`}
      style={style}
    >
      <div className="relative">
        <img
          src={imageUrl}
          alt={title}
          className={`w-full h-48 object-cover ${imageClassName || ''}`}
        />
        <div
          className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-1 cursor-pointer hover:scale-110 transition-transform"
          onClick={toggleLike}
        >
          {liked ? (
            <HeartFilled className="text-red-500 text-lg" />
          ) : (
            <HeartOutlined className="text-gray-600 text-lg" />
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">{description}</p>
        </div>
        <div className="text-xs text-gray-500 mt-2">
          <p>📅 Ngày đăng: {date}</p>
          <p>👤 Người đăng: {author}</p>
          <p className="flex items-center gap-1 mt-1">
            <HeartFilled className="text-red-500" /> {likes} lượt yêu thích
          </p>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
