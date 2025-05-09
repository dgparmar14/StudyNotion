import React, { useState, useEffect } from "react";
import { addQuestion, updateQuestion } from "../../../Services/Operations/Question";

const AddQuestionModal = ({ isOpen, onClose, onAddQuestion, OnQuestionUpdate, quizId, token, questionToEdit }) => {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("easy");
  const [marks, setMarks] = useState(1);
  const [questionId, setQuestionId] = useState("");

  // Pre-fill the form fields if editing a question
  useEffect(() => {
    if (questionToEdit) {
      console.log("Question to edit",questionToEdit)
      setQuestionId(questionToEdit._id);
      setQuestionText(questionToEdit.questionText);
      setOptions(questionToEdit.options);
      setCorrectAnswer(questionToEdit.answer);
      setDifficultyLevel(questionToEdit.difficultyLevel);
      setMarks(questionToEdit.marks);
    } else {
      // Reset fields if no question is being edited
      setQuestionId("")
      setQuestionText("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer("");
      setDifficultyLevel("easy");
      setMarks(1);
    }
  }, [questionToEdit]);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!questionText || options.some(option => !option) || !correctAnswer || !marks) {
      alert("Please fill out all fields.");
      return;
    }
  
    if (!options.includes(correctAnswer)) {
      alert("Correct answer must be one of the options.");
      return;
    }
  
    if (marks < 1) {
      alert("Marks must be at least 1.");
      return;
    }
  
    let newQuestion = {
      questionText,
      options,
      answer: correctAnswer,
      difficultyLevel,
      marks: parseInt(marks, 10),
    };
  
    if (questionToEdit) {
      console.log("Question to edit:", questionToEdit);
      
      await updateQuestion([{ id: questionToEdit._id, updates: newQuestion }], quizId, token);
      newQuestion = {...newQuestion, _id : questionToEdit._id}
      OnQuestionUpdate(newQuestion)
    } else {
      const res = await addQuestion([newQuestion], quizId, token); 
      console.log("Add question response in the add question modal : ", res)
      newQuestion = {...newQuestion, _id : res.data?.[0]}
      onAddQuestion(newQuestion)
    }
  
    onClose();
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-white p-8 rounded-2xl w-[600px] max-w-full shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          {questionToEdit ? "Edit Question" : "Add New Question"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Question</label>
            <input
              type="text"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Options</label>
            {options.map((option, index) => (
              <input
                key={index}
                type="text"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white mb-2"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            ))}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Correct Answer</label>
            <input
              type="text"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
            />
          </div>
          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-2">Marks</label>
              <input
                type="number"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                min="1"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-2">Difficulty Level</label>
              <select
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white"
                value={difficultyLevel}
                onChange={(e) => setDifficultyLevel(e.target.value)}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition"
            >
              {questionToEdit ? "Update Question" : "Add Question"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQuestionModal;
