import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function QuizDetails() {
  const [questions, setQuestions] = useState([{ text: "", marks: "", options: [""] }]);

  const addQuestion = () => {
    setQuestions([...questions, { text: "", marks: "", options: [""] }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  return (
    <div className="px-7 py-5 bg-gray-5 border border-richblack-400 rounded-md">
      <form className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <label className="text-richblack-5 text-[14px]">Duration :</label>
          <input type="number" className="bg-richblack-700 text-richblack-200 px-2 py-1 rounded-md w-16" /> <span className="text-richblack-5 text-[14px]">
            min</span>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-richblack-5 text-[14px]">Passing Score :</label>
          <input type="number" className="bg-richblack-700 text-richblack-200 px-2 py-1 rounded-md w-16" /> <span className="text-richblack-5 text-[14px]">
            %</span> 
        </div>
        <p className="text-richblack-300 text-[12px]">Note : The passing score ensures a student's eligibility for earning a certificate.</p>
        <div className="flex items-center gap-2">
          <label className="text-richblack-5 text-[14px]">Total Marks :</label>
          <input type="number" className="bg-richblack-700 text-richblack-200 px-2 py-1 rounded-md w-16" />
        </div>
        
        <h3 className="text-richblack-5 text-lg font-bold">Add Questions :</h3>
        {questions.map((q, index) => (
          <div key={index} className="bg-richblack-700 p-4 rounded-md flex flex-col gap-2">
            <label className="text-richblack-5 text-[14px]">Question</label>
            <textarea className="bg-richblack-600 text-richblack-200 px-2 py-1 rounded-md min-h-[100px]"></textarea>
            <div className="flex items-center gap-2">
              <label className="text-richblack-5 text-[14px]">Marks :</label>
              <input type="number" className="bg-richblack-600 text-richblack-200 px-2 py-1 rounded-md w-16" />

            </div>
            <label className="text-richblack-5 text-[14px]">Option 1:</label>
            <input type="text" className="bg-richblack-600 text-richblack-200 px-2 py-1 rounded-md" />
          </div>
        ))}
        <button onClick={addQuestion} type="button" className="text-richblack-900 bg-yellow-100 rounded-md px-4 py-2 w-fit">Add</button>

        <select className="bg-richblack-700 text-richblack-200 px-4 py-2 rounded-md">
          <option>Select Answer</option>
        </select>
        <IoIosArrowDown className="absolute right-4 top-[50%] text-richblack-200 text-lg" />

        <div className="flex gap-3 self-end">
          <button className="text-[15px] text-richblack-900 bg-richblack-400 rounded-md px-4 py-2">Reset</button>
          <button className="text-[15px] text-richblack-900 bg-yellow-100 rounded-md px-4 py-2">Save</button>
          <button className="text-[15px] text-richblack-900 bg-yellow-100 rounded-md px-4 py-2">Next</button>
        </div>
      </form>
    </div>
  );
}
