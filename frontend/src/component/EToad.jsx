import etoad from '../assets/image/SectionEtoad.png';
import Button from '../component/Button';

function EToad() {
  return (
    <div className="e-toad-section mx-auto w-full text-center my-10 relative">
      <img src={etoad} alt="E-Toad" className="mx-auto w-3/4" />
      <span className="absolute e-toad-text text-[20px] text-white text-center top-[70%] left-[60%] -translate-x-1/2 -translate-y-1/2 leading-[22px] font-[350] w-[90%] 
        max-[320px]:text-[6px] max-[320px]:top-[65%] max-[320px]:left-[50%] max-[320px]:leading-[18px] max-[320px]:w-[95%]
        min-[321px]:max-[480px]:text-[6px] min-[321px]:max-[480px]:top-[73%] min-[321px]:max-[480px]:left-[67%] min-[321px]:max-[480px]:leading-[9px] min-[321px]:max-[480px]:w-[80%]
        min-[481px]:max-[768px]:text-[14px] min-[481px]:max-[768px]:top-[68%] min-[481px]:max-[768px]:left-[60%] min-[481px]:max-[768px]:leading-[24px]
        min-[769px]:max-[1024px]:text-[21px] min-[769px]:max-[1024px]:top-[69%] min-[769px]:max-[1024px]:left-[65%] min-[769px]:max-[1024px]:leading-[30px]
        min-[1024px]:max-[1200px]:text-[17px] min-[1024px]:max-[1200px]:top-[69.5%] min-[1024px]:max-[1200px]:left-[67%] min-[1024px]:max-[1200px]:leading-[22px]
        min-[1025px]:max-[1440px]:text-[22px] min-[1025px]:max-[1440px]:top-[70%] min-[1025px]:max-[1440px]:left-[68%] min-[1025px]:max-[1440px]:leading-[32px]
        min-[1441px]:text-[18px] min-[1441px]:top-[70%] min-[1441px]:left-[65%] min-[1441px]:leading-[34px]"
      >
        Chào mừng bạn đến với Linh vật ếch 3D của<br/> 
        E-Toad – món quà thông minh làm bùng nổ <br/>
        mọi giác quan! Không chỉ là một món quà <br/>
        lưu niệm, E-Toad kết hợp công nghệ NFC<br/> 
        hiện đại để biến từng chiếc linh vật thành <br/>
        cánh cửa dẫn bạn vào thế giới số đầy màu <br />
        sắc. Chỉ cần một cú chạm, bạn sẽ khám phá <br/>
        được lịch sử, ký ức, và câu chuyện đầy cảm <br/> 
        hứng của FPT University. Từ những giá trị <br/>
        truyền thống đến trải nghiệm công nghệ đỉnh cao, <br/> 
        E-Toad mang đến món quà không<br/> 
        chỉ đẹp mắt mà còn chạm đến trái tim – bạn<br/>
        đã sẵn sàng để trải nghiệm chưa?
        <div className="fpt-intro-btn pt-2 pb-2">
          <Button className ="fpt-intro-button" onClick={() => window.location.href = '/about-etoad'}>Tìm Hiểu Thêm</Button> <br/>
        </div></span>
    </div>
  );
}

export default EToad;
