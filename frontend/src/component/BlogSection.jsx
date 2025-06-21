import React from 'react';
import blogImg from "../assets/image/blog.png";
import Button from "./Button.jsx";
import BlogCard from "./card/BlogCard";
function BLogSection() {
    return (
      <div className="mx-auto w-full my-10 pt-15 pd-15 relative">
        <div className="w-5/6 mx-auto">
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
            <div className="grid col-span-2 sm:col-span-2 lg:grid-col-span-2 xl:grid-col-span-2 gap-6 ">
            <BlogCard
              style ={{
                borderRadius:"50px",
                backgroundColor: "#FFF1E0",
              }}
              imageUrl={blogImg}
              title="Trường Đại học FPT ra mắt chuyên ngành Chuyển..."
              description="Trước tốc độ phát triển mạnh mẽ của công nghệ và nhu cầu cấp thiết về nhân lực số, từ năm 2025, Trường Đại học FPT (FPTU) chính thức ra mắt và tuyển sinh chuyên ngành Chuyển đổi số (BIT_DX). Đây là bước đi chiến lược..."
              date="20/05/2024"
            />
            </div>
            <BlogCard
            style ={{
                borderRadius:"50px",
                backgroundColor: "#FFF1E0",
              }}
              imageUrl={blogImg}
              title="Trường Đại học FPT ra mắt chuyên ngành Chuyển..."
              description="Trước tốc độ phát triển mạnh mẽ của công nghệ và nhu cầu cấp thiết về nhân lực số, từ năm 2025, Trường Đại học FPT (FPTU) chính thức ra mắt và tuyển sinh chuyên ngành Chuyển đổi số (BIT_DX). Đây là bước đi chiến lược..."
              date="20/05/2024"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 mt-6">
            <BlogCard
            style ={{
                borderRadius:"50px",
                backgroundColor: "#FFF1E0",
              }}
              imageUrl={blogImg}
              title="Trường Đại học FPT ra mắt chuyên ngành Chuyển..."
              description="Trước tốc độ phát triển mạnh mẽ của công nghệ và nhu cầu cấp thiết về nhân lực số, từ năm 2025, Trường Đại học FPT (FPTU) chính thức ra mắt và tuyển sinh chuyên ngành Chuyển đổi số (BIT_DX). Đây là bước đi chiến lược..."
              date="20/05/2024"
            />
            <BlogCard
            style ={{
                borderRadius:"50px",
                backgroundColor: "#FFF1E0",
              }}
              imageUrl={blogImg}
              title="Trường Đại học FPT ra mắt chuyên ngành Chuyển..."
              description="Trước tốc độ phát triển mạnh mẽ của công nghệ và nhu cầu cấp thiết về nhân lực số, từ năm 2025, Trường Đại học FPT (FPTU) chính thức ra mắt và tuyển sinh chuyên ngành Chuyển đổi số (BIT_DX). Đây là bước đi chiến lược..."
              date="20/05/2024"
            />
            <BlogCard
            style ={{
                borderRadius:"50px",
                backgroundColor: "#FFF1E0",
              }}
              imageUrl={blogImg}
              title="Trường Đại học FPT ra mắt chuyên ngành Chuyển..."
              description="Trước tốc độ phát triển mạnh mẽ của công nghệ và nhu cầu cấp thiết về nhân lực số, từ năm 2025, Trường Đại học FPT (FPTU) chính thức ra mắt và tuyển sinh chuyên ngành Chuyển đổi số (BIT_DX). Đây là bước đi chiến lược..."
              date="20/05/2024"
            />
          </div>
          <div className="flex justify-center mt-20 h-13 w-full">
          <Button style={{ backgroundColor: '#F97316', color: '#FFFFFF', fontWeight:"300"}} 
          onHover={(e) => e.currentTarget.style.color = '#FF8A00'} 
          onMouseOut={(e) => e.currentTarget.style.color = '#FFFFFF'}>
          Xem thêm
          </Button>
        </div>
        </div>
      </div>
    )
  }
  
  export default BLogSection