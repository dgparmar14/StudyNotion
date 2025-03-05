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
            required : true
        },

    ] ,
    description : {
        type : String,
        required : true,
        trim : true
    }
});

module.exports = mongoose.model("Catagory", CatagorySchema);