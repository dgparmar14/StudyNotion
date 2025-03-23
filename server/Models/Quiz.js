const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    questions : [{
        type : mongoose.Schema.ObjectId,
        ref : "Questions"
    }],
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