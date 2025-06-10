import { useState } from "react";
import quizData from "../../component/quiz/mockData";
import QuizQuestionLayout from "../../component/quiz/QuizQuestionLayout";

const QuizList = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canProceed, setCanProceed] = useState(false);

  const handleNext = () => {
    setCanProceed(false);
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("🎉 You've completed the quiz!");
      setCurrentIndex(0);
    }
  };

  return (
    <div className="max-w-3xl p-6 mx-auto space-y-8 mt-30">
      <div className="p-6 bg-[#FFF1E0] shadow-md rounded-2xl border border-[#FF8A00]">
        <QuizQuestionLayout
          {...quizData[currentIndex]}
          onDone={() => setCanProceed(true)}
        />
      </div>
      {canProceed && (
        <div className="text-right">
          <button
            onClick={handleNext}
            className="px-6 py-2 w-full text-slate-200 transition rounded-lg border border-[#FF8A00] cursor-pointer hover:bg-[#FF8A00] hover:!text-white  duration-150 ease-in-out"
          >
            {currentIndex < quizData.length - 1
              ? "Next"
              : "Finish Quiz"}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizList;
