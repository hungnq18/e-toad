import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import quizApi from "../../api/quizApi";
import rightAnswerAudio from "../../assets/audio/right-audio.wav";
import wrongAnswerAudio from "../../assets/audio/wrong-audio.wav";
import FailureModal from "../../component/quiz/FailureModal";
import FinishQuizModal from "../../component/quiz/FinishQuizModal";
import QuizQuestionLayout from "../../component/quiz/QuizQuestionLayout";
import StartRuleModal from "../../component/quiz/StartRuleModal";
import { useAuth } from "../../contexts/AuthContext";
import { message } from "antd";
import scholar from "../../assets/image/hocgia.png";
import master from "../../assets/image/bacthay.png";
import legend from "../../assets/image/huyenthoai.png";
import badgeApi from "../../api/badgeApi";
import BadgeCollect from "../../component/quiz/BadgeCollect";
import { add } from "date-fns";

const QuizList = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canProceed, setCanProceed] = useState(false);
  // modal
  const [showStartModal, setShowStartModal] = useState(true);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [showBadgeModal, setShowBadgeModal] = useState(false);

  const childRef = useRef(null);
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState([]);
  const [badge, setBadge] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const [badgeImage, setBadgeImage] = useState(null);
  const [badgeId, setBadgeId] = useState(null);
  const [currentBadge, setCurrentBadge] = useState([]);

  // Fetch quiz data from the API
  const fetchQuizData = async () => {
    try {
      const response = await quizApi.getAllQuizzes();
      const data = await response.data;
      const updatedData = data.map((quiz) => ({
        ...quiz,
        timeLimit: 30,
      }));
      setLoading(false);
      shuffleArray(updatedData);
      const filteredQuizzes = filterQuizzes(updatedData);
      console.log(filteredQuizzes);
      setQuizData(filteredQuizzes);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      setLoading(false);
    }
  };

  const fetchBadge = async () => {
    try {
      const response = await badgeApi.getAllBadges();
      console.log(response);

      const data = await response.data;
      setBadge(data);
    } catch (error) {
      console.error("Error fetching badge data:", error);
    }
  };

  const addBadgeForUser = async () => {
    try {
      const response = await badgeApi.createBadge(badgeId);
      console.log(response);
      const data = await response.data;
      setBadge(data);
    } catch (error) {
      console.error("Error fetching badge data:", error);
    }
  }

  const fetchBadgeOfUser = async () => {
    try {
      const response = await badgeApi.getBadgeOfUser();
      const data = await response.data;
      setCurrentBadge(data);
    } catch (error) {
      console.error("Error fetching badge data:", error);
    }
  };

  // Fetch quiz data from the API
  useEffect(() => {
    fetchQuizData();
    fetchBadge();
    fetchBadgeOfUser();
  }, []);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function filterQuizzes(quizzes) {
    const hardQuizzes = quizzes.filter((quiz) => quiz.difficulty === "Hard");
    const easyAndMediumQuizzes = quizzes.filter(
      (quiz) => quiz.difficulty === "Easy" || quiz.difficulty === "Medium"
    );

    const selectedHardQuizzes = hardQuizzes.slice(0, Math.ceil(0.2 * 15));

    const selectedEasyAndMediumQuizzes = easyAndMediumQuizzes.slice(
      0,
      Math.floor(0.8 * 15)
    );

    shuffleArray(selectedHardQuizzes);
    shuffleArray(selectedEasyAndMediumQuizzes);

    return [...selectedHardQuizzes, ...selectedEasyAndMediumQuizzes];
  }

  const preloadAudio = (audioSrc) => {
    const audio = new Audio(audioSrc);
    audio.preload = "auto";
    return audio;
  };

  const wrongSound = preloadAudio(wrongAnswerAudio);
  const rightSound = preloadAudio(rightAnswerAudio);

  const handleNext = () => {
    setCanProceed(false);
    if (currentIndex < quizData.length - 1) {
      childRef.current.clearDataChild();
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowEndModal(true);
    }
  };

  const clearData = async () => {
    setCurrentIndex(0);
    setShowFailureModal(false);
    setCanProceed(false);
    setShowEndModal(false);
    childRef.current.clearDataChild();
    await fetchQuizData();
  };

  const handleDone = (wasCorrect) => {
    if (!wasCorrect) {
      wrongSound.play();
      setShowFailureModal(true);
      return;
    }
    getBadge();
    rightSound.play();
    setCanProceed(true);
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading text while data is being fetched
  }

  if (showStartModal) {
    return (
      <div>
        <StartRuleModal
          onStart={() => {
            if (!isAuthenticated) {
              message.warning("Vui lòng đăng nhập để làm bài thi");
              setTimeout(() => {
                navigate("/login");
              }, 1500);
              return;
            }
            setShowStartModal(false);
          }}
        />
      </div>
    );
  }

  const getBadge = () => {
    // Check if the user already has the badge before displaying the modal
    let badgeFound = null;
    if (currentIndex === 4) {
      badgeFound = badge.find((badge) => badge.label === "Học giả");
      if (currentBadge.some((userBadge) => userBadge._id === badgeFound._id)) {
        return; // Skip if badge is already collected
      }
      setBadgeImage(scholar);
      setBadgeId(badgeFound._id);
    } else if (currentIndex === 9) {
      badgeFound = badge.find((badge) => badge.label === "Bậc thầy");
      if (currentBadge.some((userBadge) => userBadge._id === badgeFound._id)) {
        return; // Skip if badge is already collected
      }
      setBadgeImage(master);
      setBadgeId(badgeFound._id);
    } else if (currentIndex === 14) {
      badgeFound = badge.find((badge) => badge.label === "Huyền thoại");
      if (currentBadge.some((userBadge) => userBadge._id === badgeFound._id)) {
        return; // Skip if badge is already collected
      }
      setBadgeImage(legend);
      setBadgeId(badgeFound._id);
    }

    console.log(badgeFound);
    

    if (badgeFound) {
      setShowBadgeModal(true); // Show the badge modal if new badge is found
    }
  };

  return (
    <div className="relative p-6 mx-auto mt-10 space-y-8 max-w-3xl">
      {showFailureModal && (
        <FailureModal
          correctAnswers={currentIndex}
          totalQuestions={15}
          onRetry={() => {}}
          onHome={() => {}}
          onClose={() => clearData()}
          clearData={() => clearData()}
        />
      )}

      {showEndModal && (
        <FinishQuizModal
          onHome={() => {
            navigate("/");
          }}
          onClose={() => clearData()}
          clearData={() => clearData()}
        />
      )}

      {showBadgeModal && (
        <BadgeCollect
          onClose={() => setShowBadgeModal(false)}
          label="Badge Collected"
          image={badgeImage}
          getBadge={async () => {
            await addBadgeForUser();
            setShowBadgeModal(false);
          }}
        />
      )}

      <div className="p-6 bg-[#FFF1E0] shadow-md rounded-2xl border border-[#FF8A00]">
        <QuizQuestionLayout
          ref={childRef}
          {...quizData[currentIndex]}
          numberQuestion={currentIndex}
          onDone={handleDone}
        />
      </div>

      {canProceed && (
        <div className="text-right">
          <button
            onClick={handleNext}
            className="px-6 py-2 w-full text-slate-200 transition rounded-lg border border-[#FF8A00] cursor-pointer hover:bg-[#FF8A00] hover:text-white duration-150 ease-in-out"
          >
            {currentIndex < quizData.length - 1 ? "Next" : "Finish Quiz"}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizList;
