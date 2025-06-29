import React from 'react';
import mascotStory from '../assets/image/mascot1.png';
import Button from '../component/Button';
import { useCompleteAction } from '../hooks/useCompleteAction';
import { useCompletionState } from '../hooks/useCompletionState';
import CoinRain from './CoinRain';
import './css/aboutEtoad.css';
import Notification from './Notification';

function StorySection() {
  const { isCompleted, markAsCompleted } = useCompletionState('story_section');
  const { handleComplete, notification, hideNotification, showCoinRain, hideCoinRain } = useCompleteAction('story_section', 5);

  const onComplete = async () => {
    const success = await handleComplete();
    if (success) {
      markAsCompleted();
    }
  };

  return (
    <section className="story-section">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          duration={notification.duration}
          onClose={hideNotification}
        />
      )}
      {showCoinRain && <CoinRain onEnd={hideCoinRain} />}
      <div className="story-container">
        {/* Ảnh mascot */}
        <div className="story-image-container">
          <img
            src={mascotStory}
            alt="E-Toad mascot"
            className="story-mascot"
          />
        </div>

        {/* Nội dung */}
        <div className="story-content">
          <h2 className="story-title">Câu chuyện</h2>
          <p className="story-description">
            E-Toad sinh ra từ ý tưởng tạo ra một người bạn thân thiện, thông minh để đồng hành cùng sinh viên FPT trong hành trình học tập. 
            Với hình dáng chú ếch xanh đáng yêu, E-Toad mang trong mình tinh thần năng động và sự thông minh.
            <br /><br />
            Tên "E-Toad" kết hợp giữa "E" (Electronic/Education) và "Toad" (cóc), thể hiện sự kết hợp hoàn hảo giữa công nghệ và giáo dục.
          </p>
          <ul className="story-features">
            <li>Màu xanh tượng trưng cho sự tươi mới và phát triển</li>
            <li>Đôi mắt to tròn thể hiện sự tò mò và ham học hỏi</li>
            <li>Nụ cười thân thiện tạo cảm giác gần gũi</li>
            <li>Khả năng giao tiếp thông minh với sinh viên</li>
          </ul>
          <Button 
            className="story-button"
            onClick={onComplete}
            disabled={isCompleted}
            style={{
              backgroundColor: isCompleted ? '#6B7280' : '#F97316',
              color: '#FFFFFF',
              fontWeight: '300',
            }}
          >
            {isCompleted ? 'Đã hoàn thành' : 'Hoàn thành'}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default StorySection;