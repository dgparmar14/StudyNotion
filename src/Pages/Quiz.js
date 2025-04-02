import { useEffect, useState } from "react";
import { getQuiz } from "../Services/Operations/Category";
import QuizQuestion from "../Components/Common/Quiz/QuizQuestion";
import AddQuestionModal from "../Components/Common/Quiz/AddQuestionModal";

function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categorySlug = window.location.pathname.split("/")[2];
  const categoryName = categorySlug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const quizId = window.location.pathname.split("/")[4];
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await getQuiz(quizId, token);

        if (response.success !== true) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        setQuestions(response.data[0].questions);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };
    fetchQuiz();
  }, []);

  const handleOptionSelect = (questionIndex, option) => {
    setSelectedOptions(prev => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  const addQuestionHandler = async() => {
    setIsModalOpen(true);
  };

  const handleAddQuestion = (newQuestion) => {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center text-white p-6 min-h-screen bg-gray-900">
      <div className="w-full max-w-3xl flex items-center justify-between mb-6">
        <h1 className="text-white text-3xl font-bold">{categoryName} Quiz</h1>
        <button 
          className="bg-yellow-200 text-black font-semibold py-2 px-4 rounded-lg flex items-center gap-2"
          onClick={addQuestionHandler}
        >
          Add Question
        </button>
      </div>
      <div className="w-full max-w-3xl flex flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question, questionIndex) => (
            <QuizQuestion
              key={questionIndex}
              handleOptionSelect={handleOptionSelect}
              question={question}
              setQuestions={setQuestions}
              questionIndex={questionIndex}
              selectedOptions={selectedOptions}
            />
          ))
        ) : (
          <p className="text-gray-400 text-center text-lg">Loading questions...</p>
        )}
      </div>
      <AddQuestionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddQuestion={handleAddQuestion}
        quizId={quizId}
        token={token}
      />
    </div>
  );
}

export default QuizPage;
