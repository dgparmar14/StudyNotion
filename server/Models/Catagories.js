const mongoose = require("mongoose");

const CatagorySchema = new mongoose.Schema({
    
    name : {
        type : String,
        required : true
    },
    courses : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Cource",
            required : false
        },

    ] ,
    description : {
        type : String,
        required : true,
        trim : true
    },
    quiz : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Quiz",
        required : false
    }
});

module.exports = mongoose.model("Catagory", CatagorySchema);