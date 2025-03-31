import { useState } from "react";
import QuestionDetails from "./QuestionDetails";
import { createQuiz } from "../../../Services/Operations/quizApi"; // Import API call
import { IoIosArrowDown } from "react-icons/io";

export default function QuizDetails() {
  const [quizInfo, setQuizInfo] = useState({
    duration: "",
    passingScore: "",
    totalMarks: "",
    questions: [{ text: "", marks: "", options: [""], correctAnswer: "" }],
  });
  const [questions, setQuestions] = useState([{ text: "", marks: "", options: [""] }]);
  const [duration, setDuration] = useState("");
  const [passingScore, setPassingScore] = useState("");
  const [courseId, setCourseId] = useState("");  // Add course ID field
  const token = localStorage.getItem("token"); // Get token from local storage

  const addQuestion = () => {
    console.log("Add Button CLikced")
    setQuestions([...questions, { text: "", marks: "", options: [""] }]);
    console.log(questions)
  };

  const handleInputChange = (e) => {
    setQuizInfo({ ...quizInfo, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    console.log("Final Quiz Data:", quizInfo);
    // Send `quizInfo` to backend

  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const quizData = {
      questions,
      duration,
      passingPercentage: passingScore,
      courseId,
    };

    try {
      const response = await createQuiz(quizData, token);
      alert("Quiz Created Successfully!");
      console.log(response);
    } catch (error) {
      alert("Error creating quiz!");
    }
  };

  return (
    
      
    <div className="px-7 py-5 bg-gray-5 border border-richblack-400 rounded-md">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex items-center gap-2">
          <label className="text-richblack-900 text-[14px]">Duration :</label>
          <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} className="bg-richblack-700 text-richblack-200 px-2 py-1 rounded-md w-16" />
          <span className="text-richblack-900 text-[14px]">min</span>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-richblack-900text-[14px]">Passing Score :</label>
          <input type="number" value={passingScore} onChange={(e) => setPassingScore(e.target.value)} className="bg-richblack-700 text-richblack-200 px-2 py-1 rounded-md w-16" />
          <span className="text-richblack-900text-[14px]">%</span>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-richblack-900e text-[14px]">Total Marks :</label>
          <input
            type="number"
            name="totalMarks"
            value={quizInfo.totalMarks}
            onChange={handleInputChange}
            className="bg-richblack-700 text-richblack-200 px-2 py-1 rounded-md w-16"
          />
          <label className="text-richblack-900text-[14px]">Course ID :</label>
          <input type="text" value={courseId} onChange={(e) => setCourseId(e.target.value)} className="bg-richblack-700 text-richblack-200 px-2 py-1 rounded-md" />
        </div>

        <QuestionDetails
          questions={quizInfo.questions}
          setQuestions={(q) => setQuizInfo({ ...quizInfo, questions: q })}
        />
        <div className="flex self-end">
          <button
            type="button"
            onClick={handleNext}
            className="text-richblack-900e bg-yellow-50 rounded-md px-4 py-2"
          >
            Next (Submit Quiz)
          </button>
        </div>

        {/* <h3 className="text-richblack-900text-lg font-bold">Add Questions :</h3>
        {questions.map((q, index) => (
          <div key={index} className="bg-richblack-700 p-4 rounded-md flex flex-col gap-2">
            <label className="text-richblack-900text-[14px]">Question</label>
            <textarea className="bg-richblack-600 text-richblack-200 px-2 py-1 rounded-md min-h-[100px]" value={q.text} onChange={(e) => {
                const updatedQuestions = [...questions];
                updatedQuestions[index].text = e.target.value;
                setQuestions(updatedQuestions);
              }}
            />
            <div className="flex items-center gap-2">
              <label className="text-richblack-900text-[14px]">Marks :</label>
              <input type="number" className="bg-richblack-600 text-richblack-200 px-2 py-1 rounded-md w-16" value={q.marks} onChange={(e) => {
                const updatedQuestions = [...questions];
                updatedQuestions[index].marks = e.target.value;
                setQuestions(updatedQuestions);
              }} />
            </div>
            <label className="text-richblack-900text-[14px]">Option 1:</label>
            <input type="text" className="bg-richblack-600 text-richblack-200 px-2 py-1 rounded-md" value={q.options[0]} onChange={(e) => {
                const updatedQuestions = [...questions];
                updatedQuestions[index].options[0] = e.target.value;
                setQuestions(updatedQuestions);
              }}
            />
          </div>
        ))} */}
        <button onClick={addQuestion} type="button" className="text-richblack-900 bg-yellow-50 rounded-md px-4 py-2 w-fit">Add</button>

        <div className="flex gap-3 self-end">
          <button type="reset" className="text-[15px] text-richblack-900 bg-richblack-400 rounded-md px-4 py-2">Reset</button>
          <button type="submit" className="text-[15px] text-richblack-900 bg-yellow-50 rounded-md px-4 py-2">Save</button>
        </div>
      </form>
    </div>
  );
}
