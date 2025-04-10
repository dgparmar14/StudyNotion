import { useEffect, useState } from "react";
import { getQuiz } from "../Services/Operations/Category";
import QuizQuestion from "../Components/Common/Quiz/QuizQuestion";
import AddQuestionModal from "../Components/Common/Quiz/AddQuestionModal";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import QuizDetails from "../Components/Common/Quiz/QuizDetails";

function QuizPage() {

  const { categoryQuizId } = useParams()
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionToEdit, setQuestionToEdit] = useState(null);
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)

  const fetchQuiz = async (quizId) => {
    try {
      //console.log("Quiz id in quiz page :  ", quizId)
      const response = await getQuiz(quizId, token);

      //console.log("Quiz question List : ", response);

      if (response.success !== true) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      setQuestions(response.data[0].questions);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };

  useEffect(() => {
    if (categoryQuizId) {
      fetchQuiz(categoryQuizId)
    } else {
      fetchQuiz(course.quizId)
    }
  }, [])

  const handleUpdatedQuestion = (question) => {
    console.log("Updated question in quiz page : ", question)
    const updatedQuestion = questions.map((que) => que._id === question._id ? { ...que, ...question } : que)
    setQuestions(updatedQuestion)
  }
  const handleAddQuestion = (newQuestion) => {
    setQuestions((prevQuestions) => [newQuestion, ...prevQuestions]);

  };

  const handleEditQuestion = (question) => {
    setQuestionToEdit(question);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center text-white p-6 min-h-screen bg-gray-900">
      <div className="w-full max-w-3xl flex items-center justify-between mb-6">
        <div className="flex mr-[7rem] self-end">
          <button
            className="px-4 py-1 rounded-md text-richblack-900 bg-yellow-100 cursor-pointer"
            onClick={() => {
              setQuestionToEdit(null)
              setIsModalOpen(true);
            }}
          >
            Add Questions
          </button>
        </div>
      </div>
      <div className="w-full max-w-3xl flex flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question, questionIndex) => (
            <QuizQuestion
              key={questionIndex}
              question={question}
              setQuestions={setQuestions}
              questionIndex={questionIndex}
              selectedOptions={selectedOptions}
              handleEditQuestion={handleEditQuestion}
              quizId={categoryQuizId ? categoryQuizId : course.quizId}
            />
          ))
        ) : (
          <p className="text-gray-400 text-center text-lg">Loading questions...</p>
        )}
      </div>

      {
        isModalOpen && (<AddQuestionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddQuestion={handleAddQuestion}
          OnQuestionUpdate={handleUpdatedQuestion}
          quizId={categoryQuizId ? categoryQuizId : course.quizId}
          token={token}
          questionToEdit={questionToEdit}
        />)
      }
    </div>

  );
}
export default QuizPage;
