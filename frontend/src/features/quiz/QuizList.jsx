import { useState } from "react";
import quizData from "../../component/quiz/mockData";
import QuizQuestionLayout from "../../component/quiz/QuizQuestionLayout";
import StartRuleModal from "../../component/quiz/StartRuleModal";
import { message } from "antd";
import { div } from "framer-motion/client";
import FailureModal from "../../component/quiz/FailureModal";

const QuizList = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canProceed, setCanProceed] = useState(false);
  const [showStartModal, setShowStartModal] = useState(true);
  const [showFailureModal, setShowFailureModal] = useState(false);

  const handleNext = () => {
    setCanProceed(false);
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("🎉 Quiz completed!");
      setCurrentIndex(0);
    }
  };

  const clearData = () => {
    setCurrentIndex(0);
    setShowStartModal(true);
    setShowFailureModal(false);
    setCanProceed(false);
  };

  const handleDone = (wasCorrect) => {
    console.log(wasCorrect);
    
    if (!wasCorrect) {
      message.info("Ban da tra loi sai, hay lam lai quiz");
      setShowFailureModal(true);
      return;
    }

    setCanProceed(true);
  };

  if (showStartModal) {
    return (
      <div>
        <StartRuleModal onStart={() => setShowStartModal(false)} />
      </div>
    );
  }

  if (showFailureModal) {
    return (
      <FailureModal
        correctAnswers={currentIndex}
        totalQuestions={15}
        onRetry={() => console.log("Retry")}
        onHome={() => console.log("Go Home")}
        onClose={() => setShowFailureModal(false)}
        clearData={() => clearData()}
      />
    );
  }

  return (
    <div className="relative p-6 mx-auto mt-10 space-y-8 max-w-3xl">
      <div className="p-6 bg-[#FFF1E0] shadow-md rounded-2xl border border-[#FF8A00]">
        <QuizQuestionLayout
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
