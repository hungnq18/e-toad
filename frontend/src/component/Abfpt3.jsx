import Abfpt2 from "../assets/image/abfpt2.png";
import Button from "../component/Button";
import { useCompleteAction } from '../hooks/useCompleteAction';
import { useCompletionState } from '../hooks/useCompletionState';
import CoinRain from './CoinRain';
import "./css/FPTIntroSection.css";
import Notification from './Notification';

function Abfpt3() {
  const { isCompleted, markAsCompleted } = useCompletionState('abfpt3');
  const { handleComplete, notification, hideNotification, showCoinRain, hideCoinRain } = useCompleteAction('abfpt3', 15);

  const onComplete = async () => {
    const success = await handleComplete();
    if (success) {
      markAsCompleted();
    }
  };

  return (
    <div className="w-full relative">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          duration={notification.duration}
          onClose={hideNotification}
        />
      )}
      {showCoinRain && <CoinRain onEnd={hideCoinRain} />}
      {/* Ảnh nền */}
      <img src={Abfpt2} alt="E-Toad" className="w-full h-auto object-cover" />

      {/* Overlay nội dung */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center px-4 py-10 bg-black/40">
        <h2 className="text-2xl xs:text-3xl md:text-4xl font-bold text-orange-500 text-center mb-3">
          Thành tựu nổi bật
        </h2>

        <p className="text-white text-center max-w-2xl mb-8 text-sm xs:text-base md:text-lg">
          Đạt chứng nhận quốc tế ABET, top 3 trường đại học công nghệ hàng đầu Việt Nam...
        </p>

        <div className="flex flex-col md:flex-row gap-6 mb-10">
          {/* Card 1 */}
          <div className="bg-white/90 rounded-xl shadow-lg p-8 w-full xs:w-96 md:w-[620px]">
            <h3 className="text-orange-500 text-xl font-semibold mb-2">
              ABET Accreditation
            </h3>
            <p className="text-gray-700">
              Chứng nhận chất lượng giáo dục quốc tế
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/90 rounded-xl shadow-lg p-8 w-full xs:w-96 md:w-[620px]">
            <h3 className="text-orange-500 text-xl font-semibold mb-2">
              Top 3 IT University
            </h3>
            <p className="text-gray-700">
              Xếp hạng hàng đầu về đào tạo IT
            </p>
          </div>
        </div>

        {/* Nút hoàn thành */}
        <Button 
          style={{ 
            backgroundColor: isCompleted ? '#6B7280' : '#F97316', 
            color: '#FFFFFF', 
            fontWeight:"300"
          }} 
          onHover={(e) => {
            if (!isCompleted) {
              e.currentTarget.style.color = '#FF8A00';
            }
          }} 
          onMouseOut={(e) => (e.currentTarget.style.color = '#FFFFFF')}
          onClick={onComplete}
          disabled={isCompleted}
        >
          {isCompleted ? 'Đã hoàn thành' : 'Hoàn Thành'}
        </Button>
      </div>
    </div>
  );
}

export default Abfpt3;
