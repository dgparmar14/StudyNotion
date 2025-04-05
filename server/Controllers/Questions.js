const { mongo, default: mongoose } = require("mongoose");
const Cource = require("../Models/Cource");
const Questions = require("../Models/Questions");
const Quiz = require("../Models/Quiz");
const Catagories = require("../Models/Catagories");

exports.addQuestions = async(req, res) => {
   try{
      const {questions, quizId} = req.body;
      if(!quizId){
         return res.status(400).json({
            success : false,
            message : "Quiz Id is required"
         })
      }
      if(!questions || !Array.isArray(questions) || questions.length < 1){
         return res.status(400).json({
            success : false,
            message : "Questions must be array and atleas one question is required to add"
         })
      }

      const invalidQuestion = questions.some((question) => {
        
         const { questionText, options, answer, marks, difficultyLevel } = question;
         return (
                 !questionText || !options || !Array.isArray(options) || options.length < 2 ||
                 !answer || !options.includes(answer) || 
                 !difficultyLevel || !["easy", "medium", "hard"].includes(difficultyLevel) || 
                 marks == null
             );
         });
      if (invalidQuestion) {
         return res.status(400).json({
             success: false,
             message: "Each question must have valid questionText, at least two options, a correct answer from the options, a valid difficulty level, and marks.",
         });
      }

      let questionList = await Promise.all(questions.map(async (question) => {
         const newQuestion = await Questions.create(question);
         return newQuestion._id;
     }));


      const quiz = await Quiz.findByIdAndUpdate({_id : quizId}, {
        $push : {questions : { $each : questionList}}
      }, {new : true}).populate({
         path : "questions"
      }).exec()

      return res.status(200).json({
         success : true,
         message : "Questions added successfully into quiz",
         data : questionList
      })
   }
   catch(err){
      console.log("Error occured while adding questions into quiz")
      return res.status(500).json({
         success : false,
         message : "Error occured while adding question into quiz",
         error : err.message
      })
   }
}

exports.UpdateQuestions = async(req, res) => {
   try{
      const {questions, quizId} = req.body
      if(!quizId){
         return res.status(400).json({
            success : false,
            message : "Quiz Id is required"
         })
      }
      if(!questions || !Array.isArray(questions) || questions.length < 1){
         return res.status(400).json({
            success : false,
            message : "Questions must be array and atleas one question is required to update"
         })
      }
      for (let question of questions) {
         const { id, updates} = question;
         if(!id){
            return res.status(400).json({
               success: false,
               message: "All questions must contains question id"
            });
         }
         if(updates.options && (!Array.isArray(updates.options) || updates.options.length < 2)){
            return res.status(400).json({
               success : false,
               message : "Options must be an array and there must be atleast two options for each questions"
            })
         }
         if(updates.difficultyLevel && !["easy", "medium", "hard"].includes(updates.difficultyLevel)){
            return res.status(400).json({
               success : false,
               message : "Difficulty level must be either easy, medium or hard"
            })
         }
         
         
         
         const oldQuestion = await Questions.findById(new mongoose.Types.ObjectId(id));
         if (!oldQuestion) {
            return res.status(404).json({
              success: false,
              message: "Question not found",
            });
          }
          
         oldQuestion.set(updates);
         await oldQuestion .save()
         
      }

     const updatedQuiz = await Quiz.findById(quizId).populate("questions").exec();

     return res.status(200).json({
         success: true,
         message: "Questions updated successfully",
         data: updatedQuiz
     });

   }
   catch(err){
      console.log("Error occured while updating questions into quiz")
      return res.status(500).json({
         success : false,
         message : "Error occured while updating question into quiz",
         error : err.message
      })
   }
}

exports.deleteQuestions = async (req, res) => {
   try {
       const { questions, quizId } = req.body;
       if (!quizId) {
           return res.status(400).json({
               success: false,
               message: "Quiz ID is required"
           });
       }

       if (!questions || !Array.isArray(questions) || questions.length < 1) {
           return res.status(400).json({
               success: false,
               message: "Questions must be an array, and at least one question is required to delete"
           });
       }

       // Remove questions from the quiz
       const updatedQuiz = await Quiz.findByIdAndUpdate(
           { _id: quizId },
           { $pull: { questions: { $in: questions } } }, // Removes the questions array
           { new: true }
       ).populate("questions");

       // Delete the questions from the database
       await Promise.all(questions.map(questionId => Questions.findByIdAndDelete(questionId)));

       return res.status(200).json({
           success: true,
           message: "Questions deleted successfully",
           data: updatedQuiz
       });

   } catch (err) {
       console.error("Error occurred while deleting questions:", err);
       return res.status(500).json({
           success: false,
           message: "An error occurred while deleting questions",
           error: err.message
       });
   }
};

exports.getAllQuestions = async (req, res) => {
   try{
      const {courseId, categoryId} = req.body
      if (!courseId && !categoryId) {
         return res.status(400).json({
             success: false,
             message: "Either courseId or categoryId is required",
         });
     }

     if (courseId != null && categoryId != null) {
         return res.status(400).json({
             success: false,
             message: "CourseId and CategoryId both can't be present together",
         });
     }
     let quiz
     if (courseId) {
      const course = await Cource.findById(courseId).populate("quiz");
      if (!course || !course.quiz) {
          return res.status(404).json({
              success: false,
              message: "Quiz not found for the given courseId",
          });
      }
      quiz = course.quiz;
   } else if (categoryId) {
      const category = await Catagories.findById(categoryId).populate("quiz");
      if (!category || !category.quiz) {
          return res.status(404).json({
              success: false,
              message: "Quiz not found for the given categoryId",
          });
      }
      quiz = category.quiz;
   }

   const questions = await Quiz.findById(quiz._id).populate("questions").exec();

   if (!questions) {
      return res.status(404).json({
          success: false,
          message: "No questions found for the given quiz",
      });
   }

   return res.status(200).json({
      success: true,
      message: "Questions retrieved successfully",
      data: questions.questions,
   });
   }
   catch(err){
      console.log("Error occured while fetching questions")
      return res.status(500).json({
         success : false,
         message : "Error occured while fetching questions",
         error : err.message
      })
   }
}

