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
        num: ["easy", "medium", "hard"], 
    },
    marks : {
        type : int,
        required : true
    },
    passingPercentage : {
        type : int,
        required : true
    }
}, {_id : false});

const categorySchema = new mongoose.Schema({
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Catagory"
    },
    questions : [questionSchema]
});

module.exports = mongoose.model("Quiz", categorySchema);