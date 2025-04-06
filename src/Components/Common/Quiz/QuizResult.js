import Certificate from "../../../Pages/Certificate";

export default function QuizResult() {
  return (
    <div className="px-7 py-10 bg-richblack-800 border border-richblack-400 rounded-md text-center flex flex-col items-center gap-4">
      {/*------- Passed ----------*/}

      <h2 className="text-yellow-100 text-[20px] font-semibold">
        Congratulations !!!
      </h2>

      <p className="text-white text-[20px] font-medium">
        You nailed it with an
        <span className="text-caribbeangreen-100 font-semibold"> 75%</span> score!
      </p>
      {/*display this block - if student */}
      <p className="text-richblack-200  text-[16px]">
        You have successfully passed the quiz and now it's time to claim your <span className="text-blue-100">Certificate of Completion!</span>
      </p>
      
      <Certificate></Certificate>
      {/* block terminated */}
      {/*display this block - if instructor */}
      <p className="text-richblack-200 text-[16px]">
        You have successfully passed the quiz and are now eligible to create a
        course!
      </p>
      <p className="text-blue-100 text-[14px]">
        Start creating you course and share your knowledge with learners!
      </p>
      <button className="mt-3 text-black bg-yellow-100 border border-black font-semibold rounded-md px-6 py-2 hover:scale-95 transition-all">
        Create Course
      </button>
      {/* block terminated */}

      {/* ------- Failed ----- */}
      <h2 className="text-yellow-100 text-[20px] font-semibold">
       Your Score : <span className="text-pink-400">40%</span>
      </h2>
      <p className="text-white text-[14px] font-medium">
        You need atleast <strong className="text-caribbeangreen-100">75%</strong> to be eligible.
        <br />
      </p>
      <p className="text-richblack-200 te text-[14px]">
        You can reattempt the quiz and give it another shot!
      </p>
      <button className="mt-3 text-black bg-yellow-100 border border-black font-semibold rounded-md px-6 py-2 hover:scale-95 transition-all">
       Retake Quiz
      </button>
      
    </div>
  );
}
