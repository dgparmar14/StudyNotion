const mongoose = require("mongoose");

const courceProgress = new mongoose.Schema({
    courseId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Cource"
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    completedVideos : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "SubSection"
        }
    ]
});

module.exports = mongoose.model("CourceProgress", courceProgress);