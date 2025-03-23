const Questions = require("../Models/Questions");
const Quiz = require("../Models/Quiz");
const Result = require("../Models/Result");
const User = require("../Models/User");

exports.checkResult = async (req, res) => {
   try {
      const { answers, quizId } = req.body;
      const userId = req.user.id;

      if (!answers || !quizId) {
         return res.status(400).json({
            success: false,
            message: "Answers and quizId are required to check the result",
         });
      }

      // Fetch quiz details
      const quiz = await Quiz.findById(quizId).populate("questions").exec();
      if (!quiz) {
         return res.status(404).json({
            success: false,
            message: "Quiz not found",
         });
      }

      // Check if user exists
      const user = await User.findById(userId);
      if (!user) {
         return res.status(400).json({
            success: false,
            message: "User not found",
         });
      }

      let obtainedMarks = 0;
      const updatedQuestions = [];

      // Loop through answers asynchronously
      for (const answer of answers) {
         const question = await Questions.findById(answer.id);
         if (!question) continue;

         if (answer.selectedAnswer != null && answer.selectedAnswer === question.answer) {
            obtainedMarks += question.marks;
         }

         question.selectedAnswer = answer.selectedAnswer;
         await question.save();
         updatedQuestions.push(question);
      }

      // Calculate total marks and percentage
      const totalMarks = updatedQuestions.reduce((sum, q) => sum + q.marks, 0);
      const percentage = totalMarks > 0 ? (obtainedMarks / totalMarks) * 100 : 0;

      // Check if result exists
      let result = await Result.findOne({ userId, quiz: quizId });

      if (result) {
         result.percentage = percentage;
         result.isPassed = percentage >= quiz.passingPercentage;
         await result.save();
      } else {
         result = await Result.create({
            userId,
            quiz: quizId,
            percentage: percentage,
            isPassed: percentage >= quiz.passingPercentage,
         });
      }

      return res.status(200).json({
         success: true,
         message: "Result stored successfully",
         data: result,
      });

   } catch (err) {
      console.error("Error occurred while checking result:", err.message);
      return res.status(500).json({
         success: false,
         message: "Error occurred while checking result",
         error: err.message,
      });
   }
};


exports.getResult = async (req, res) => {
   try{
      const {quizId, userId} = req.body
      
      if(!quizId){
         return res.status(400).json({
            success : false,
            message : "Quizid is required to fetch result"
         })
      }
      var quiz = await Quiz.findById({_id : quizId}).populate({path : "questions"}).exec();
      if(!quiz){
         return res.status(404).json({
            success : false,
            message : "Quiz not found"
         })
      }
      var result = await Result.findOne({userId : userId, quizId : quizId})

      if(!result){
         return res.status(404).json({
            success : false,
            message : "Result not found"
         })
      }

      return res.status(200).json({
         success : true,
         message : "Result data fetched successfully",
         data : {
            quiz : quiz,
            result : result
         }
      })
   }
   catch(err){
      console.log("Error occured while fetching result " + err.message);
      return res.status(500).json({
         success :false,
         message : "Error occured while fetching result",
         error : err.message
      })
   }
}