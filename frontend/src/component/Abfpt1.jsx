import abfpt1 from '../assets/image/abfpt1.png'
function Abfpt1() {
  return (
    <div>
    <div className="w-full">
      <img src={abfpt1} alt="E-Toad" className="w-full relative" /> 
    </div>
    <div className="flex flex-col lg:flex-row bg-[#FFF5F0] p-8 rounded-3xl items-stretch">
      {/* Left Side - Text */}
      <div className="bg-[#EF7C3B] text-white p-8 rounded-3xl flex-1">
        <h2 className="text-3xl font-bold mb-4">
          <span className="border-b-4 border-white inline-block pb-1">
            Lịch sử hình thành
          </span>
        </h2>
        <p className="text-lg mb-6">
          FPT University được thành lập năm 2006, là trường đại học tư thục đầu tiên của Tập đoàn FPT
        </p>

        <div>
          <h3 className="text-xl font-bold mb-2">Các mốc quan trọng</h3>
          <ul className="list-disc pl-6 space-y-2 text-base">
            <li>2006: Thành lập FPT University tại Hà Nội</li>
            <li>2009: Mở rộng cơ sở tại TP.HCM</li>
            <li>2012: Khai trương campus Đà Nẵng</li>
            <li>2018: Ra mắt campus Cần Thơ và Quy Nhơn</li>
            <li>2024: Đạt 50,000+ sinh viên trên toàn quốc</li>
          </ul>
        </div>

        <button className="story-btn">
          Hoàn thành
        </button>
      </div>

      {/* Right Side - Image */}
      <div className="flex-1 mt-8 lg:mt-0 lg:ml-6">
        <img
          src="/path/to/your/image.png" // Thay bằng đường dẫn đúng nếu dùng trong app
          alt="FPT University Campus"
          className="w-full h-full object-cover rounded-3xl"
        />
      </div>
    </div>
    </div>
  );
}

export default Abfpt1;