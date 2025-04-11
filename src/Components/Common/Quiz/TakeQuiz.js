import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { checkResult, getQuiz } from "../../../Services/Operations/quizApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { formatdate } from "../../../Services/DateFormat";

function TakeQuiz() {
  // Basic state setup
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(null); // Initialize to null, not 0
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add explicit loading state
  
  // Refs and other values
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { id } = useParams();
  const hasSubmitted = useRef(false);
  const timerInitialized = useRef(false);

  // Fetch quiz data
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        console.log("Fetching quiz data...");
        setIsLoading(true);
        
        const result = await getQuiz(id, token);
        if (!result.success) {
          throw new Error("Error occurred while fetching quiz");
        }
        
        console.log("Quiz data fetched successfully");
        setQuiz(result.data[0]);
        setQuestions(result.data[0].questions);
        
        // Initialize answers array
        const initialAnswers = result.data[0].questions.map((q) => ({
          id: q._id, 
          selectedAnswer: null
        }));
        setAnswers(initialAnswers);
        
        // Set timer AFTER everything else is set up
        setTimeout(() => {
          setTimeLeft(result.data[0].duration * 60);
          timerInitialized.current = true;
          setIsLoading(false);
          console.log("Quiz fully initialized");
        }, 100);
        
      } catch (error) {
        console.error("Error occurred while fetching the quiz: ", error);
        toast.error("Failed to load quiz");
        setIsLoading(false);
      }
    };

    

    // Reset states when component mounts
    hasSubmitted.current = false;
    timerInitialized.current = false;
    fetchQuizData();
    
  }, [id, token]);

  useEffect(() => {
    if (!isLoading && questions.length > 0) {
      const savedAnswer = answers.find(
        ans => ans.id === questions[currentIndex]._id
      );
      setSelectedOption(savedAnswer?.answer || null);
    }
  }, [currentIndex, isLoading, questions, answers]);
  // Timer effect - COMPLETELY SEPARATE from other initialization
  useEffect(() => {
    // Skip if still loading or timer not initialized
    if (isLoading || !timerInitialized.current || timeLeft === null) {
      console.log("Timer not started yet");
      return;
    }
    
    console.log(`Timer update: ${timeLeft} seconds remaining`);
    
    let timer;
    if (timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && !hasSubmitted.current) {
      console.log("Time's up! Submitting quiz...");
      toast.warning("Time's up!");
      submitQuiz();
    }
    
    return () => clearTimeout(timer);
  }, [timeLeft, isLoading]);

  // Submit final answers
  const submitQuiz = async () => {
    // Strict checks to prevent premature submission
    if (isLoading || !timerInitialized.current || hasSubmitted.current || !questions.length) {
      console.log("Submission prevented: Not ready or already submitted");
      return;
    }
    
    console.log("Submitting quiz...");
    hasSubmitted.current = true;
    
    try {
      // Save current answer if available
      let finalAnswers = [...answers];
      if (selectedOption !== null) {
        const currentQuestionIndex = finalAnswers.findIndex(
          ans => ans.id === questions[currentIndex]._id
        );
        if (currentQuestionIndex !== -1) {
          finalAnswers[currentQuestionIndex].selectedAnswer = selectedOption;
        }
      }
      
      // Filter out null answers
      finalAnswers = finalAnswers.filter(ans => ans.answer !== null);
      
      toast.info("Submitting your answers...");
      console.log("Final answers:", finalAnswers);
      
      const result = await checkResult(finalAnswers, id, token);
      if (!result.success) {
        throw new Error("Error occurred while submitting quiz");
      }
      
      
      toast.success("Quiz submitted successfully!");
      navigate("/dashboard/quizResult", {state : {isPassed : result.data.result.isPassed, percentage : result.data.result.percentage, passingPercentage : result.data.passingPercentage, quizId : result.data.result.quiz, createdOn : formatdate(result.data.result.createdAt)}});
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast.error("Failed to submit quiz"); 
      hasSubmitted.current = false;
    }
  };

  // Save current answer
  const saveCurrentAnswer = () => {
    if (isLoading || !questions.length || selectedOption === null) return;
    
    setAnswers(prevAnswers => {
      const updatedAnswers = [...prevAnswers];
      const existingIndex = updatedAnswers.findIndex(
        ans => ans.id === questions[currentIndex]._id
      );
      
      if (existingIndex !== -1) {
        updatedAnswers[existingIndex] = { 
          id: questions[currentIndex]._id, 
          selectedAnswer  : selectedOption 
        };
      }
      return updatedAnswers;
    });
  };

  // Navigate between questions
  const navigateQuestion = (direction) => {
    if (isLoading || !questions.length) return;
    
    // Save current answer first
    saveCurrentAnswer();
    
    // Move to next/previous question
    if (direction === "next" && currentIndex < questions.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    } else if (direction === "prev" && currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
  };

  // Reset current answer
  const resetCurrentAnswer = () => {
    if (isLoading || !questions.length) return;
    
    setSelectedOption(null);
    setAnswers(prevAnswers => {
      const updatedAnswers = [...prevAnswers];
      const existingIndex = updatedAnswers.findIndex(
        ans => ans.id === questions[currentIndex]._id
      );
      
      if (existingIndex !== -1) {
        updatedAnswers[existingIndex] = { 
          id: questions[currentIndex]._id, 
          selectedAnswer: null 
        };
      }
      return updatedAnswers;
    });
  };

  const formatTime = (seconds) => {
    if (seconds === null) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Loading state
  if (isLoading || !quiz || questions.length === 0) {
    return <p className="text-white text-center p-8">Loading quiz...</p>;
  }

  // Set the selected option based on any previously saved answer when the question changes
  

  return (
    <div className="bg-gray-900 p-6 rounded-lg text-richblack-100 max-w-xl mx-auto">
      {/* question header */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-[18px] font-semibold">
          Question {currentIndex + 1} / {questions.length}
        </span>
        <span className={`text-[16px] ${timeLeft <= 30 ? "text-red-500" : "text-pink-500"}`}>
          Remaining Time: {formatTime(timeLeft)}
        </span>
      </div>
      {/* question block */}
      <div className="flex justify-between">
        <p className="mb-4 text-lg font-medium">
          ({currentIndex + 1}) {questions[currentIndex].questionText}
        </p>
        <p className="mb-4 text-lg font-medium">{`Marks: ${questions[currentIndex].marks}`}</p>
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
        <div className="flex gap-2">
          <button
            type="button"
            onClick={resetCurrentAnswer}
            className="text-[14px] text-white bg-richblack-500 rounded-md px-4 py-1 w-fit cursor-pointer">
            Reset
          </button>
          <button
            type="button"
            onClick={submitQuiz}
            disabled={hasSubmitted.current}
            className={`text-[14px] text-white bg-richblack-500 rounded-md px-4 py-1 w-fit ${
              hasSubmitted.current ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            Submit
          </button>
        </div>
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
            className={`text-[14px] text-white bg-yellow-50 rounded-md px-4 py-1 w-fit cursor-pointer ${
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

export default TakeQuiz;