const Catagories = require("../Models/Catagories");
const Cource = require("../Models/Cource");
const Quiz = require("../Models/Quiz");

exports.createQuiz = async (req, res) => {
        try {
            const { questions, passingPercentage, duration, courseId, categoryId } = req.body;
    
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
            if(categoryId)
                relatedRecord = await Catagories.findById(categoryId);
            else
                relatedRecord = await Cource.findById(courseId)

            if(relatedRecord == null){
                return res.status(404).json({
                        success : false,
                        message : "Related Course or category not found"
                })
            }    

            const invalidQuestion = questions.some((question) => {
                const { questionText, options, answer, marks } = question;
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
    
            const newQuiz = await Quiz.create({
                questions,
                duration,
                passingPercentage,
            });
    
            let updatedRecord;
    
            if (categoryId) {
                updatedRecord = await Catagories.findByIdAndUpdate(
                        categoryId,
                        { quiz: newQuiz._id },
                        { new: true }
                    );
            } else {
                updatedRecord = await Cource.findByIdAndUpdate(
                    courseId,
                    { quiz: newQuiz._id },
                    { new: true }
                );
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

    exports.UpdateQuiz = (req, res) => {
        try{
                
        }
        catch(err){
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "Failed to create quiz, please try again",
                error: err.message,
            });
        }
    }
    