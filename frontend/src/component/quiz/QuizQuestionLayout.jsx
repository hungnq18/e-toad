import { Progress } from "antd";
import { useEffect, useState } from "react";
import mascot from "../../assets/image/mascot.png";

const QuizQuestionLayout = ({
  id,
  question,
  options,
  explanation,
  timeLimit,
  onDone,
}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [status, setStatus] = useState(true);
  const [percent, setPercent] = useState(0);

  // Reset state when new question is loaded
  useEffect(() => {
    setSelectedId(null);
    setTimeLeft(timeLimit);
    setIsTimeUp(false);
    setStatus(true);
    setPercent(0);
  }, [id, timeLimit]);

  // Countdown effect
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsTimeUp(true);
      onDone?.();
      return;
    }
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    setPercent(((timeLeft / timeLimit) * 100).toFixed(0));

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleAnswer = (optionId) => {
    if (selectedId !== null || isTimeUp) return;
    const selectedOption = options.find((opt) => opt.id === optionId);
    setStatus(selectedOption.isCorrect);
    setSelectedId(optionId);
    setIsTimeUp(true);
    setTimeLeft(0);
    setPercent(0);
    onDone?.();
  };

  return (
    <div className="space-y-4">
      <p className="w-full p-4 border border-[#F97316] text-lg text-gray-800 bg-[#FFFFFF] rounded-md">
        {question}
      </p>

      {timeLeft !== 0 && (
        <div className="font-mono text-sm text-right text-red-600">
          <Progress
            percent={percent}
            status="normal"
            showInfo={false}
            strokeWidth={8}
            strokeColor={`${percent <= 30 ? "red" : "#F97316"}`}
          />
        </div>
      )}

      <div className="flex items-center space-y-4">
        <ul className="grid flex-1 space-y-3 md:grid-cols-2 md:gap-4">
          {options.map((option) => {
            const isSelected = selectedId === option.id;
            const isCorrect = option.isCorrect;
            const shouldHighlight =
              isTimeUp || selectedId !== null
                ? isCorrect
                  ? "bg-green-100 border-green-500"
                  : isSelected
                  ? "bg-red-100 border-red-500"
                  : "bg-[#FFFFFF]"
                : "bg-white";

            return (
              <li
                key={option.id}
                onClick={() => handleAnswer(option.id)}
                className={`p-8 rounded-lg bg-[#FFFFFF] border h-full justify-center flex items-center transition cursor-pointer duration-200 group ${shouldHighlight} ${
                  isTimeUp || selectedId !== null
                    ? "pointer-events-none"
                    : "hover:border-[#F97316] hover:shadow"
                }`}
              >
                <span className="font-medium group-hover:text-[#F97316]">
                  {option.text}
                </span>
              </li>
            );
          })}
        </ul>

        <img className="object-contain h-50 w-50" src={mascot} alt="mascot" />
      </div>

      {(timeLeft === 0 || !status) && (
        <div className="text-sm italic text-[#F97316]">
          Explanation: <span className="not-italic">{explanation}</span>
        </div>
      )}
    </div>
  );
};

export default QuizQuestionLayout;
