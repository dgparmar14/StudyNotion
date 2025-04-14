import { useEffect, useState } from "react";
import { getQuiz } from "../Services/Operations/Category";
import QuizQuestion from "../Components/Common/Quiz/QuizQuestion";
import AddQuestionModal from "../Components/Common/Quiz/AddQuestionModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import QuizDetails from "../Components/Common/Quiz/QuizDetails";
import { setLoading } from "../Reducer/Slices/authSlice";
import { setEditCourse, setStep } from "../Reducer/Slices/courseSlice";
import { MdOutlineNavigateNext } from "react-icons/md";

function QuizPage() {

  const { categoryQuizId } = useParams()
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionToEdit, setQuestionToEdit] = useState(null);
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const goBack = () => {
    dispatch(setEditCourse(true));
    dispatch(setStep(2));
  }
  const goNext = () => {
    dispatch(setStep(4));
  }

  const fetchQuiz = async (quizId) => {
    setIsLoading(true)
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
    finally{
      setIsLoading(false)
    }
  };

  

  useEffect(() => {
    if (categoryQuizId) {
      fetchQuiz(categoryQuizId)
    } else {
      fetchQuiz(course.quiz._id)
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

  if((!categoryQuizId || categoryQuizId==0) && (!course || !course.quiz)){
    return(
      <div>
        <QuizDetails></QuizDetails>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  } 
  return (
    <>
      (
        <div className="w-full flex flex-col items-center rounded-xl gap-5 text-white p-6 min-h-screen bg-gray-900">
          <div className="w-full max-w-3xl flex items-center justify-between mb-6 mt-2">
            <div className="flex mr-[7rem] self-end">
              <button
                className="px-4 py-1 rounded-md text-richblack-900 bg-yellow-100 cursor-pointer"
                onClick={() => {
                  setQuestionToEdit(null);
                  setIsModalOpen(true);
                }}
              >
                Add Questions
              </button>
            </div>
          </div>
  
          <div className="w-full max-w-3xl flex flex-col gap-6">
            {questions.length > 0 &&
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
              ))}
          </div>
  
          {isModalOpen && (
            <AddQuestionModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onAddQuestion={handleAddQuestion}
              OnQuestionUpdate={handleUpdatedQuestion}
              quizId={categoryQuizId ? categoryQuizId : course.quizId}
              token={token}
              questionToEdit={questionToEdit}
            />
          )}
          {
            !categoryQuizId && (
              <div className="flex gap-2 justify-end mt-4 w-[80%]">

                  <button></button><button onClick={goBack} className='text-richblack-900 bg-yellow-200 text-[15px] rounded-md px-2 py-1'>Back</button>
                  <button onClick={goNext} className='text-richblack-900 bg-yellow-200 text-[15px] rounded-md px-2 py-1 flex gap-1 justify-center items-center'>Next <MdOutlineNavigateNext></MdOutlineNavigateNext></button>
              </div>
            )
          }
        </div>
      )
    </>
  );
  
  
}
export default QuizPage;
