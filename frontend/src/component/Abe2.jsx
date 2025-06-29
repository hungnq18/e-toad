import { useEffect } from 'react';
import abe2 from '../assets/image/abe2.png';
import Button from '../component/Button';
import "../component/css/aboutEtoad.css";
import { useCompleteAction } from '../hooks/useCompleteAction';
import { useCompletionState } from '../hooks/useCompletionState';
import CoinRain from './CoinRain';
import Notification from './Notification';

function Abe2() {
  const { isCompleted, markAsCompleted } = useCompletionState('abe2');
  const { handleComplete, notification, hideNotification, showCoinRain, hideCoinRain } = useCompleteAction('abe2', 10);

  // Load completion state from localStorage on component mount
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('user'))?._id) {
      const completed = localStorage.getItem(`abe2_completed_${JSON.parse(localStorage.getItem('user'))._id}`);
      if (completed === 'true') {
        markAsCompleted();
      }
    }
  }, [markAsCompleted]);

  const onComplete = async () => {
    const success = await handleComplete();
    if (success) {
      markAsCompleted();
      // Save completion state to localStorage
      if (JSON.parse(localStorage.getItem('user'))?._id) {
        localStorage.setItem(`abe2_completed_${JSON.parse(localStorage.getItem('user'))._id}`, 'true');
      }
    }
  };

  return (
    <div className="w-full">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          duration={notification.duration}
          onClose={hideNotification}
        />
      )}
      {showCoinRain && <CoinRain onEnd={hideCoinRain} />}
      <img src={abe2} alt="E-Toad" className="mx-auto w-3/4" /> 
      <div className="flex justify-center my-10 w-full h-13">
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
          {isCompleted ? 'Đã hoàn thành' : 'Hoàn thành'}
        </Button>
      </div>
    </div>
  );
}

export default Abe2;