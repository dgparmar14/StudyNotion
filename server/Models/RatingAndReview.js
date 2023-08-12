const mongoose = require("mongoose");

const ratingAndReviewSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    rating : {
        type : Number,
        required : true
    },
    review : {
        type : String,
        trim : true
    },
    course : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Cource",
        index : true,
    }

});

module.exports = mongoose.model("RatingsAndReviews", ratingAndReviewSchema);