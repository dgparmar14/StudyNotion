import { useState } from "react";
import QuestionDetails from "./QuestionDetails";
import { createQuiz } from "../../../Services/Operations/quizApi"; // Import API call
import { useDispatch, useSelector } from "react-redux";
import { setEditCourse, setStep } from "../../../Reducer/Slices/courseSlice";
import { redirect, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { unsetCategoryId } from "../../../Reducer/Slices/categorySlice";
import { MdOutlineNavigateNext } from "react-icons/md";

export default function QuizDetails() {
  const [quizInfo, setQuizInfo] = useState({
    duration: "",
    passingScore: "",
    totalMarks: "",
    questions: [{ questionText: "", marks: "", options: [""], answer: "" }],
  });
  const [duration, setDuration] = useState("");
  const [passingScore, setPassingScore] = useState("");
  const {token} = useSelector((state)=>state.auth)
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const {categoryId} = useSelector((state)=>state.category);
  const categorySlug = window.location.pathname.split("/")[1];
  console.log("Category id : ", categoryId)
  const categoryName = categorySlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

    function goBack(){
      dispatch(setStep(2));
      dispatch(setEditCourse(true));
    }
    function goNext(){
      dispatch(setStep(4));
    }

  const addQuestion = () => {
    setQuizInfo((prevQuizInfo) => ({
      ...prevQuizInfo,
      questions: [
        ...prevQuizInfo.questions,
        { questionText: "", marks: "", options: ["", "", "", ""], answer: "" },
      ],
    }));
  };

  const handleInputChange = (e) => {
    setQuizInfo({ ...quizInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const quizData = {
      questions: quizInfo.questions,
      duration,
      passingPercentage: passingScore,
    };

    if (categoryId) {
      try {
        const response = await createQuiz(quizData, null, categoryId ,token);
        console.log("Category quiz created response : ", response)
        dispatch(unsetCategoryId())
        nevigate(`/dashboard/quiz/${response.data.quiz._id}`)
        alert("Quiz Created Successfully! for category");
      } catch (error) {
        alert("Error creating quiz!");
      }
    } else {
      try {
        const response = await createQuiz(quizData, course._id, null ,token);
        console.log('quiz response : ', response)
       
        alert("Quiz Created Successfully! for course");
        dispatch(setStep(4));
      } catch (error) {
        alert("Error creating quiz!");
      }
    }

  };

  return (
    <div className="px-7 py-5 bg-gray-900 border border-richblack-400 rounded-md">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <label className="text-white-900 text-[14px]">Duration :</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="bg-richblack-700 text-richblack-200 px-2 py-1 rounded-md w-16"
            />
            <span className="text-white-900 text-[14px]">min</span>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-white-900 text-[14px]">Passing Score :</label>
            <input
              type="number"
              value={passingScore}
              onChange={(e) => setPassingScore(e.target.value)}
              className="bg-richblack-700 text-richblack-200 px-2 py-1 rounded-md w-16"
            />
            <span className="text-richblack-900 text-[14px]">%</span>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-white-900 text-[14px]">Total Marks :</label>
            <input
              type="number"
              name="totalMarks"
              value={quizInfo.totalMarks}
              onChange={handleInputChange}
              className="bg-richblack-700 text-richblack-200 px-2 py-1 rounded-md w-16"
            />
          </div>
        </div>

        {/* Pass questions and setQuestions to QuestionDetails */}
        <QuestionDetails
          questions={quizInfo.questions}
          setQuestions={(updatedQuestions) =>
            setQuizInfo({ ...quizInfo, questions: updatedQuestions })
          }
        />

        <div className="flex justify-between">
          <div className="flex gap-3 self-end">
            <button
              type="button"
              onClick={addQuestion}
              className="text-richblack-900 bg-yellow-50 rounded-md px-4 py-2"
            >
              Add Question
            </button>
            <button
              type="submit"
              className="text-[15px] text-richblack-900 bg-yellow-50 rounded-md px-4 py-2"
            >
              Save
            </button>
          </div>
          {
            !categoryId && (
              <div>
                <button></button>
                <button></button><button onClick={goBack} className='text-richblack-900 bg-yellow-200 text-[15px] rounded-md px-2 py-1'>Back</button>
                          <button onClick={goNext} className='text-richblack-900 bg-yellow-200 text-[15px] rounded-md px-2 py-1 flex gap-1 justify-center items-center'>Next <MdOutlineNavigateNext></MdOutlineNavigateNext></button>
              </div>  
            )
          }
        </div>
      </form>
    </div>
  );
}