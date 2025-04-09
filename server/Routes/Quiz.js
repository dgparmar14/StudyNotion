const express = require("express");
const { createQuiz, UpdateQuiz, getQuiz, deleteQuiz } = require("../Controllers/Quiz");
const { isInstructor, quizRoleCheck, auth } = require("../Middlewares/auth");
const { checkResult, getResult } = require("../Controllers/Result");
const { addQuestions, UpdateQuestions, deleteQuestions, getAllQuestions } = require("../Controllers/Questions");
const router = express.Router();

router.post("/createQuiz", createQuiz)
// router.post("/createQuiz", auth, quizRoleCheck, createQuiz)
router.put("/updateQuiz", auth, quizRoleCheck, UpdateQuiz)
router.post("/getQuiz", auth, getQuiz)
router.delete("/deleteQuiz",auth, quizRoleCheck, deleteQuiz)

router.post("/checkResult",auth, checkResult)
router.post("/getResult", auth, getResult)

// router.post("/addQuestion", auth, quizRoleCheck, addQuestions)
router.post("/addQuestion", addQuestions)

// router.put("/updateQuestions", auth, quizRoleCheck, UpdateQuestions)
router.put("/updateQuestions", UpdateQuestions)
router.get("/getAllQuestions", auth, getAllQuestions)

// router.delete("/deleteQuestions",auth, deleteQuestions)
router.delete("/deleteQuestions", deleteQuestions)

module.exports = router;
