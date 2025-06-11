import abfpt from "../assets/image/abfpt.png";
import Button from "../component/Button"; // Import Button component
import "./css/FPTIntroSection.css"; // Import CSS tách riêng
function Abfpt2() {
  return (
    <div className="mx-auto w-5/6" style={{ marginBottom: '100px' }}>
    <div className="fpt-intro-section" id="intro-fpt-section">
      <img src={abfpt} alt="FPT Intro" className="fpt-image" />
      <div className="fpt-intro-text">
        <p className="text-xl mb-6">
          FPT University được thành lập năm 2006, là trường đại học <br/> tư thục đầu
          tiên của Tập đoàn FPT
        </p>

        <div>
          <h3 className="text-2xl font-bold mb-2">Các mốc quan trọng</h3>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            <li>2006: Thành lập FPT University tại Hà Nội</li>
            <li>2009: Mở rộng cơ sở tại TP.HCM</li>
            <li>2012: Khai trương campus Đà Nẵng</li>
            <li>2018: Ra mắt campus Cần Thơ và Quy Nhơn</li>
            <li>2024: Đạt 50,000+ sinh viên trên toàn quốc</li>
          </ul>
        </div>
        <div className="fpt-intro-btn pt-6">
          <Button
            className="fpt-intro-button"
            onClick={() => (window.location.href = "/about-fpt")}
          >
            Tìm Hiểu Thêm
          </Button>{" "}
          <br />
        </div>
      </div>
    </div>
    </div>
  );
}

export default Abfpt2;
