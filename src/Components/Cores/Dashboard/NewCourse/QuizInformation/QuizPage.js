import { useState } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

function QuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const questions = [
    {
      text: "What is the output of print(2 ** 3) in Python?",
      marks: 1,
      options: ["5", "6", "8", "9"],
      correctAnswer: "8",
    },
    {
      text: "What is the output of print(2 ** 3) in Python?",
      marks: 1,
      options: ["5", "6", "8", "9"],
      correctAnswer: "8",
    },
    {
      text: "What is the output of print(2 ** 3) in Python?",
      marks: 1,
      options: ["5", "6", "8", "9"],
      correctAnswer: "8",
    },
    {
      text: "What is the output of print(2 ** 3) in Python?",
      marks: 1,
      options: ["5", "6", "8", "9"],
      correctAnswer: "8",
    },
  ];

  const navigateQuestion = (direction) => {
    if (direction === "next" && currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
    } else if (direction === "prev" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOption(null);
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg text-richblack-400 max-w-xl mx-auto">
      {/* question header */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-[18px] font-semibold">
          Question {currentIndex + 1} / {questions.length}
        </span>
        <span className="text-[16px] text-pink-800">Remaining Time: 00:10</span>
      </div>
      {/* question block */}
      <div className="flex justify-between">
        <p className="mb-4 text-lg font-medium">
          ({currentIndex + 1}) {questions[currentIndex].text}
        </p>
        <p className="mb-4 textlg font-medium">{`Marks : ${questions[currentIndex].marks}`}</p>
      </div>
      {/* question options */}
      <div className="mb-4">
        {questions[currentIndex].options.map((opt, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="radio"
              id={`option-${index}`}
              name="quiz-option"
              value={opt}
              checked={selectedOption === opt}
              onChange={() => setSelectedOption(opt)}
              className="mr-2"
            />
            <label htmlFor={`option-${index}`} className="cursor-pointer">
              {opt}
            </label>
          </div>
        ))}
      </div>
      {/* navigate buttons */}
      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={() => setSelectedOption(null)}
          className={`text-[14px] text-white bg-richblack-200 rounded-md px-4 py-1 w-fit cursor-pointer`}>
          Reset
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => navigateQuestion("prev")}
            className={`text-[14px] text-white bg-yellow-200 rounded-md px-4 py-1 w-fit cursor-pointer ${
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => navigateQuestion("next")}
            className={`text-[14px] text-white bg-yellow-100 rounded-md px-4 py-1 w-fit cursor-pointer ${
              currentIndex === questions.length - 1
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
