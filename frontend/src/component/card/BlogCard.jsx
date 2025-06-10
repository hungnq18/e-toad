const BlogCard = ({ imageUrl, title, description, date, className, style, imageClassName }) => {
  return (
    <div className={`bg-white rounded-lg overflow-hidden  ${className || ''} h-[450px] flex flex-col`} style={style}>
      <img src={imageUrl} alt={title} className={`w-full h-48 object-cover ${imageClassName || ''}`} />
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">{description}</p>
        </div>
        <p className="text-gray-500 text-xs">{date}</p>
      </div>
    </div>
  );
};
export default BlogCard