import { useNavigate } from 'react-router-dom';
import fptIntro from '../assets/image/introFPT.png';
import Button from '../component/Button';
import './css/FPTIntroSection.css';

function FPTIntroSection() {
  const navigate = useNavigate();

  return (
    <div className="fpt-intro-section" id="intro-fpt-section">
      <img src={fptIntro} alt="FPT Intro" className="fpt-image" />
      <div className="fpt-intro-text">
        Khám phá hành trình 18 năm phát triển của <br />
        FPT University - nơi đào tạo những nhân tài <br />
        công nghệ hàng đầu Việt Nam <br />
        <div className="fpt-intro-btn pt-6">
          <Button
            className="fpt-intro-button"
            onClick={() => navigate('/about-fpt')}
          >
            Tìm Hiểu Thêm
          </Button>
          <br />
        </div>
      </div>
    </div>
  );
}

export default FPTIntroSection;

