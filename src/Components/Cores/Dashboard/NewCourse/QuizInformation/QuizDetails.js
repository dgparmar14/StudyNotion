import { useState } from "react";
import QuestionDetails from "./QuestionDetails";

export default function QuizDetails() {
  const [quizInfo, setQuizInfo] = useState({
    duration: "",
    passingScore: "",
    totalMarks: "",
    questions: [{ text: "", marks: "", options: [""], correctAnswer: "" }],
  });

  const handleInputChange = (e) => {
    setQuizInfo({ ...quizInfo, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    console.log("Final Quiz Data:", quizInfo);
    // Send `quizInfo` to backend
  };

  return (
    <div className="px-7 py-5 bg-richblack-800 border border-richblack-400 rounded-md">
      <form className="flex flex-col gap-5">
          <label className="text-richblack-5 text-[20px]">Quiz Details</label>
        <div className="flex items-center gap-2">
          <label className="text-white text-[14px]">Duration :</label>
          <input
            type="number"
            name="duration"
            value={quizInfo.duration}
            onChange={handleInputChange}
            className="bg-richblack-700 text-richblack-200 px-2 py-1 rounded-md w-16"
          />
          <span className="text-white text-[14px]">minutes</span>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-white text-[14px]">Passing Score :</label>
          <input
            type="number"
            name="passingScore"
            value={quizInfo.passingScore}
            onChange={handleInputChange}
            className="bg-richblack-700 text-richblack-200 px-2 py-1 rounded-md w-16"
          />
          <span className="text-white text-[14px]">%</span>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-white text-[14px]">Total Marks :</label>
          <input
            type="number"
            name="totalMarks"
            value={quizInfo.totalMarks}
            onChange={handleInputChange}
            className="bg-richblack-700 text-richblack-200 px-2 py-1 rounded-md w-16"
          />
        </div>

        <QuestionDetails
          questions={quizInfo.questions}
          setQuestions={(q) => setQuizInfo({ ...quizInfo, questions: q })}
        />
        <div className="flex self-end">
          <button
            type="button"
            onClick={handleNext}
            className="text-white bg-yellow-100 rounded-md px-4 py-2"
          >
            Next (Submit Quiz)
          </button>
        </div>
      </form>
    </div>
  );
}
