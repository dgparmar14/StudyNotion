const mongoose = require("mongoose");
const Questions = require("./Questions");
const questionSchema = new mongoose.Schema({
    questionText : {
        type : String,
        required : true
    },
    options : [
        {
            type:String,
            required : true
        }
    ],
    answer:{
        type : String,
        required : true 
    },
    difficultyLevel : {
        type : String,
        required : true,
        enum: ["easy", "medium", "hard"], 
    },
    marks : {
        type : Number,
        required : true
    },
    
}, {_id : false});

const quizSchema = new mongoose.Schema({
    questions : [questionSchema],
    duration: {
        type : Number,
        required:true
    },
    passingPercentage : {
        type : Number,
        required : true
    },
  
})

module.exports = mongoose.model("Quiz", quizSchema);