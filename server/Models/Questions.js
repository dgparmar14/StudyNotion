const { default: mongoose } = require("mongoose");

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
   selectedAnswer : {
       type : String
   }

});

module.exports = mongoose.model("Questions", questionSchema)