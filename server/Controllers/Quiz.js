const { Mongoose, default: mongoose } = require("mongoose");
const Catagories = require("../Models/Catagories");
const Cource = require("../Models/Cource");
const Questions = require("../Models/Questions");
const Quiz = require("../Models/Quiz");

exports.createQuiz = async (req, res) => {
    try {
        const { questions, passingPercentage, duration } = req.body.quizData;
        let { courseId, categoryId } = req.body
        if (!Array.isArray(questions) || questions.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Questions must be a non-empty array.",
            });
        }

        if (passingPercentage == null || duration == null) {
            return res.status(400).json({
                success: false,
                message: "Passing percentage and duration are required",
            });
        }

        if (passingPercentage < 0 || passingPercentage > 100) {
            return res.status(400).json({
                success: false,
                message: "Passing percentage must be between 0-100"
            })
        }

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

        let relatedRecord;
        categoryId = categoryId ? new mongoose.Types.ObjectId(categoryId) : null;
        courseId = courseId ? new mongoose.Types.ObjectId(courseId) : null;

        if (categoryId)
            relatedRecord = await Catagories.findById(categoryId);
        else
            relatedRecord = await Cource.findById(courseId)

        if (relatedRecord == null) {
            return res.status(404).json({
                success: false,
                message: "Related Course or category not found"
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
            let newQuestion = await Questions.create(question);
            return newQuestion._id;
        }));


        const newQuiz = await Quiz.create({
            questions: questionList,
            duration,
            passingPercentage,
        });

        let updatedRecord;

        if (categoryId) {
            updatedRecord = await Catagories.findByIdAndUpdate(
                categoryId,
                { quiz: newQuiz._id },
                { new: true }
            ).populate({ path: "quiz", populate: { path: "questions" } }).exec();
        } else {
            updatedRecord = await Cource.findByIdAndUpdate(
                courseId,
                { quiz: newQuiz._id },
                { new: true }
            ).populate({ path: "quiz", populate: { path: "questions" } }).exec();
        }

        return res.status(200).json({
            success: true,
            message: "Quiz created successfully",
            data: updatedRecord,
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Failed to create quiz, please try again",
            error: err.message,
        });
    }
};

exports.UpdateQuiz = async (req, res) => {
    try {
        const { quizId, categoryId, courseId, updates } = req.body

        if (!quizId) {
            return res.status(404).json({
                success: false,
                message: "Quiz id is not provided to update"
            })
        }
        if (!courseId && !categoryId) {
            return res.status(400).json({
                success: false,
                message: "CourseId or categoryId is required"
            })
        }
        if (courseId && categoryId) {
            return res.status(400).json({
                success: false,
                message: "A quiz can't be associated with course and category at the same time"
            })
        }
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found for this id " + quizId
            })
        }
        quiz.set(updates);
        await quiz.save();

        let updatedRecord
        if (courseId) {
            updatedRecord = await Cource.findOne({ _id: courseId }).populate({ path: "quiz", populate: { path: "questions" } }).exec();
        } else {
            updatedRecord = await Catagories.findOne({ _id: categoryId }).populate({ path: "quiz", populate: { path: "questions" } }).exec();
        }
        return res.status(200).json({
            success: true,
            message: "Quiz updated successfully",
            data: updatedRecord
        })
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Failed to update quiz, please try again",
            error: err.message,
        });
    }
}

exports.getQuiz = async (req, res) => {
    try {
        const { quizId } = req.body;
        
        if (!quizId) {
            return res.status(400).json({
                success: false,
                message: "Quiz id is required"
            })
        }
        const quiz = await Quiz.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(quizId) } },
            {
                $lookup: {
                    from: "questions",
                    localField: "questions",
                    foreignField: "_id",
                    as: "questions"
                }
            },
            {
                $addFields: {
                    totalMarks: { $sum: "$questions.marks" }
                }
            }
        ])
    
        if (!quiz || quiz.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Quiz found successfully",
            data: quiz
        })
    }
    catch (err) {
        console.log("Error occured while fetching quiz data : " + err)
        return res.status(500).json({
            success: false,
            message: "Error occured while fetching quiz data",
            error: err.message
        })
    }
}

exports.deleteQuiz = async (req, res) => {
    try {
        var { quizId, categoryId, courseId } = req.body;
        quizId = new mongoose.Types.ObjectId(quizId);
        if (!quizId) {
            return res.status(400).json({
                success: false,
                message: "Quiz id is required to delete a quiz"
            })
        }
        if (!courseId && !categoryId) {
            return res.status(400).json({
                success: false,
                message: "CourseId or categoryId is required"
            })
        }
        if (courseId && categoryId) {
            return res.status(400).json({
                success: false,
                message: "A quiz can't be associated with course and category at the same time"
            })
        }
        let updatedRecord
        if (courseId) {
            courseId = new mongoose.Types.ObjectId(courseId)
            updatedRecord = await Cource.findByIdAndUpdate({ _id: courseId },
                { $unset: { quiz: "" } },
                { new: true }
            ).populate("quiz").exec()
        } else {
            categoryId = new mongoose.Types.categoryId(courseId)
            updatedRecord = await Catagories.findByIdAndUpdate({ _id: categoryId },
                { $unset: { quiz: "" } },
                { new: true }
            ).populate("quiz").exec()
        }
        await Quiz.findOneAndDelete({ _id: quizId });
        return res.status(200).json({
            success: true,
            message: "Quiz deleted successfully",
            data: updatedRecord
        })
    }
    catch (err) {
        console.log("Error occured while deleting quiz" + err);
        return res.status(500).json({
            success: false,
            message: "Failed to delete quiz",
            error: err.message
        })
    }
}
