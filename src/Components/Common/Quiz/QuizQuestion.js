import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { deleteQuestion } from "../../../Services/Operations/Question";

function QuizQuestion({ question, questionIndex, setQuestions, handleOptionSelect, selectedOptions }) {
  const quizId = window.location.pathname.split("/")[4];

  const deleteQuestionHandler = async () => {
    try {
      await deleteQuestion([question], quizId);
      setQuestions(prevQuestions => prevQuestions.filter((_, index) => index !== questionIndex));
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <div className="w-full max-w-3xl flex flex-col gap-6">
      <div className="flex flex-col gap-4 p-6 rounded-2xl bg-gray-800 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-xl font-semibold">
            {questionIndex + 1}. {question.questionText}
          </h2>
          <div className="flex space-x-2">
            <button className="text-blue-100 hover:underline mb-2">
              <FaEdit />
            </button>
            <button className="text-red-600 mb-2" onClick={deleteQuestionHandler}>
              <MdDeleteOutline />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {question.options.map((option, optionIndex) => (
            <button
              key={optionIndex}
              className={`p-4 rounded-lg text-white font-medium text-lg transition-all duration-200 border-2 ${
                selectedOptions[questionIndex] === option
                  ? "bg-blue-600 border-blue-400"
                  : "bg-gray-700 hover:bg-gray-600 border-gray-600"
              }`}
              onClick={() => handleOptionSelect(questionIndex, option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuizQuestion;
