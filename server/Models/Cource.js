const mongoose = require("mongoose");

const courceSchema = new mongoose.Schema({
    courceName : {
        type : String,
        
    },
    description : {
        type : String,
        
    },
    price : {
        type : Number,
        required : true
    },
    instructor : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    totalDuration : {
        type : String,
        default : "0"
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },
    studentsEnrolled : [
        {
            type : mongoose.Schema.Types.ObjectId,
            required : true
        }
    ],
    courceContent : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Section", 
            required : true
        }
    ],
    whatYouWillLearn : {
        type : String,
        trim : true,
        required : true,
    },
    ratingAndReviews : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "RatingsAndReviews"
        }
    ],
    thumbNail : {
        type : String
    },
    tag : [{
                type : String,
                required : true,
        } ] 
,
    catagory : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Catagory"
        }
    ],
    instructions : [{
        type :String
    }],
    status : {
        type : String,
        enum : ["Drafted", "Published"],
        default : "Drafted"
    },
    language : {
        type : String,
        require : true
    },
    progressPercentage : {
        type : Number,
    },
    quiz : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Quiz",
        required : false
    }
});

module.exports = mongoose.model("Cource", courceSchema);