import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useCompletionState = (sectionKey) => {
  const { user } = useAuth();
  const [isCompleted, setIsCompleted] = useState(false);

  // Load completion state from localStorage on component mount
  useEffect(() => {
    if (user?._id) {
      const completed = localStorage.getItem(`${sectionKey}_completed_${user._id}`);
      if (completed === 'true') {
        setIsCompleted(true);
      }
    }
  }, [user, sectionKey]);

  const markAsCompleted = () => {
    setIsCompleted(true);
    if (user?._id) {
      localStorage.setItem(`${sectionKey}_completed_${user._id}`, 'true');
    }
  };

  return { isCompleted, markAsCompleted };
}; 