import { useState } from "react";
import {
  IoIosArrowDown,
  IoIosArrowDropleft,
  IoIosArrowDropright,
} from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";

export default function QuestionDetails({ questions, setQuestions }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleInputChange = (field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentIndex][field] = value;
    setQuestions(updatedQuestions);
  };

  const addOption = () => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentIndex].options.push("");
    setQuestions(updatedQuestions);
  };

  const removeOption = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentIndex].options = updatedQuestions[
      currentIndex
    ].options.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentIndex].options[index] = value;
    setQuestions(updatedQuestions);
  };

  const addNewQuestion = () => {
    setQuestions([
      ...questions,
      { text: "", marks: "", options: [""], correctAnswer: "" },
    ]);
    setCurrentIndex(questions.length); // Move to newly added question
  };

  const navigateQuestion = (direction) => {
    if (direction === "prev" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === "next" && currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="bg-richblack-700 p-4 rounded-md flex flex-col gap-2 leading-7">
      <label className="text-richblack-5 text-[14px]">Add Question :</label>
      <textarea
        value={questions[currentIndex]?.text || ""}
        onChange={(e) => handleInputChange("text", e.target.value)}
        className="bg-richblack-600 text-richblack-200 px-2 py-1 rounded-md min-h-[100px]"
      ></textarea>

      <div className="flex items-center gap-2">
        <label className="text-richblack-5 text-[14px]">Marks :</label>
        <input
          type="number"
          value={questions[currentIndex]?.marks || ""}
          onChange={(e) => handleInputChange("marks", e.target.value)}
          className="bg-richblack-600 text-richblack-200 px-2 py-1 rounded-md w-16"
        />
      </div>

      {questions[currentIndex]?.options.map((opt, index) => (
        <div key={index} className="flex gap-2 items-center">
          <label className="text-richblack-5 text-[14px]">
            Option {index + 1}:
          </label>
          <input
            type="text"
            value={opt}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            className="bg-richblack-600 text-richblack-200 px-2 py-1 rounded-md"
          />
          {questions[currentIndex].options.length > 1 && (
            <RiDeleteBinLine
              className="text-[20px] text-pink-200 cursor-pointer"
              onClick={() => removeOption(index)}
            />
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addOption}
        className="text-[14px] text-white bg-yellow-50 rounded-md px-4 py-1 w-fit"
      >
        Add Option
      </button>

      <label className="text-richblack-5 text-[14px]">
        Select Correct Answer:
      </label>
      <select
        value={questions[currentIndex]?.correctAnswer || ""}
        onChange={(e) => handleInputChange("correctAnswer", e.target.value)}
        className="bg-richblack-600 text-richblack-200 px-4 py-2 rounded-md"
      >
        <option value="">Select Answer</option>
        {questions[currentIndex]?.options.map((opt, index) => (
          <option key={index} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      {/* navigate */}
      <IoIosArrowDown className="absolute right-4 top-[50%] text-richblack-200 text-lg" />

      <div className="flex gap-3 justify-between">
        <div className="flex items-center gap-2">
          <IoIosArrowDropleft
            onClick={() => currentIndex > 0 && navigateQuestion("prev")}
            className={`text-[45px] text-white cursor-pointer px-2 py-1 rounded-md 
    ${currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          />

          {/* Question Count Display */}
          <span className="text-richblack-200 text-sm">
            {questions.length > 0

              ? `${currentIndex + 1} / ${questions.length}`
              : "0 / 0"}
          </span>

          <IoIosArrowDropright
            onClick={() =>
              currentIndex < questions.length - 1 && navigateQuestion("next")
            }
            className={`text-[45px] text-white cursor-pointer px-2 py-1 rounded-md 
    ${
      currentIndex === questions.length - 1
        ? "opacity-50 cursor-not-allowed"
        : "cursor-pointer"
    }`}
          />
        </div>

        <button
          type="button"
          onClick={addNewQuestion}
          className={`{text-[14px] text-white bg-yellow-50 rounded-md px-4 py-1 w-fit`}
        >
          Save Question
        </button>
      </div>
    </div>
  );
}
