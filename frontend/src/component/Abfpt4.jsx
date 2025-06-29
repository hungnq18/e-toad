import React from "react";
import BuildingImg from "../assets/image/abfpt3.png";
import Button from "../component/Button";
import { useCompleteAction } from '../hooks/useCompleteAction';
import { useCompletionState } from '../hooks/useCompletionState';
import CoinRain from './CoinRain';
import Notification from './Notification';

function Abfpt4() {
  const { isCompleted, markAsCompleted } = useCompletionState('abfpt4');
  const { handleComplete, notification, hideNotification, showCoinRain, hideCoinRain } = useCompleteAction('abfpt4', 20);

  const onComplete = async () => {
    const success = await handleComplete();
    if (success) {
      markAsCompleted();
    }
  };

  return (
    <div className="mx-auto w-5/6">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          duration={notification.duration}
          onClose={hideNotification}
        />
      )}
      {showCoinRain && <CoinRain onEnd={hideCoinRain} />}
      <div className="flex flex-col md:flex-row justify-center items-center px-6 py-10 bg-[#FFF6F1] gap-10">
        {/* Cột ảnh */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={BuildingImg}
            alt="Building"
            className="rounded-[40px] max-w-full md:max-w-[700px] h-auto object-cover"
          />
        </div>

        {/* Cột nội dung */}
        <div className="w-full md:w-1/2">
          <h2 className="text-orange-500 text-2xl md:text-3xl font-bold mb-4">
            Chương trình đào tạo
          </h2>
          <p className="text-gray-700 mb-4 text-base md:text-lg">
            Hơn 20 chuyên ngành từ Công nghệ thông tin đến Kinh doanh, thiết kế theo chuẩn quốc tế.
          </p>
          <p className="text-gray-900 font-semibold mb-4">Các ngành đào tạo chính</p>

          <div className="flex flex-col gap-3 mb-6">
            {[
              "Công nghệ thông tin",
              "Kinh doanh quốc tế",
              "Thiết kế đồ họa",
              "Marketing số",
              "An toàn thông tin",
              "Trí tuệ nhân tạo"
            ].map((major, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-orange-100 text-orange-500 font-semibold py-2 px-4 text-center hover:bg-orange-50 cursor-pointer transition"
              >
                {major}
              </div>
            ))}
          </div>

          {/* Nút hoàn thành */}
          <div className="flex justify-center">
            <Button
              style={{
                backgroundColor: isCompleted ? '#6B7280' : '#F97316',
                color: '#FFFFFF',
                fontWeight: '300',
              }}
              onMouseOver={(e) => {
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
      </div>
    </div>
  );
}

export default Abfpt4;
