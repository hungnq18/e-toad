import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import quizApi from "../../api/quizApi";
import rightAnswerAudio from "../../assets/audio/right-audio.wav";
import wrongAnswerAudio from "../../assets/audio/wrong-audio.wav";
import FailureModal from "../../component/quiz/FailureModal";
import FinishQuizModal from "../../component/quiz/FinishQuizModal";
import QuizQuestionLayout from "../../component/quiz/QuizQuestionLayout";
import StartRuleModal from "../../component/quiz/StartRuleModal";

const QuizList = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canProceed, setCanProceed] = useState(false);
  const [showStartModal, setShowStartModal] = useState(true);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const childRef = useRef(null);
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuizData = async () => {
    try {
      const response = await quizApi.getAllQuizzes();
      const data = await response.data;
      setLoading(false);
      const filteredQuizzes = filterQuizzes(data);
      shuffleArray(filteredQuizzes);
      setQuizData(filteredQuizzes)
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      setLoading(false);
    }
  };

  // Fetch quiz data from the API
  useEffect(() => {
    fetchQuizData();
  }, [showFailureModal]);

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
      setCanProceed(true);
      childRef.current.clearDataChild();
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowEndModal(true);
    }
  };

  const clearData = () => {
    setCurrentIndex(0);
    setShowFailureModal(false);
    setCanProceed(false);
    setShowEndModal(false);
    childRef.current.clearDataChild();
  };

  const handleDone = (wasCorrect) => {
    if (!wasCorrect) {
      wrongSound.play();
      setShowFailureModal(true);
      return;
    }
    rightSound.play();
    setCanProceed(true);
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading text while data is being fetched
  }

  if (showStartModal) {
    return (
      <div>
        <StartRuleModal onStart={() => setShowStartModal(false)} />
      </div>
    );
  }

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
