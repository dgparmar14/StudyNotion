export default function QuizIntro() {
    return (
      <div className="px-7 py-10 bg-richblack-800 border border-richblack-400 rounded-md text-center flex flex-col items-center gap-4">
  
        <h2 className="text-yellow-100 text-[20px] font-semibold">
          You're just one step away from completing your course!
        </h2>
  
        <p className="text-white text-[15px] font-medium">
          It's time to put your knowledge to the test! <br />
          Attempt the final quiz and earn your Certificate of Completion by scoring <span className="text-caribbeangreen-50 font-semibold">75% or more!</span>
        </p>
  
        <div className="text-left w-full mt-2">
          <p className="text-white text-[16px] font-semibold mb-2">Quiz Details:</p>
          <ul className="text-richblack-200 text-[14px] leading-6 pl-4 list-disc">
            <li><span role="img" aria-label="timer">⏳</span><span  class="text-pink-400"><strong>Time Limit:</strong> 10 minutes</span> </li>
            <li><span role="img" aria-label="retry">🔁</span> <strong>Multiple Attempts Allowed:</strong> If you don’t pass, don’t worry—you can reattempt the quiz!</li>
            <li><span role="img" aria-label="tip">💡</span> <strong>Tip:</strong> Stay focused, trust your knowledge, and give it your best shot! Your certification awaits!</li>
          </ul>
        </div>
  
        <p className="mt-6 text-blue-100 text-[14px]">
          Click below to start your quiz, Good luck!
        </p>
        <button
          className="text-black bg-yellow-100 border border-black font-semibold rounded-md px-6 py-2 hover:scale-95 transition-all"
        >
          Start Quiz
        </button>
      </div>
    );
  }
  