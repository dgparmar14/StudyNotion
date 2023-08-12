const mongoose = require("mongoose");

const peofileSchema = new mongoose.Schema({
    gender : {
        type : String
    },
    dob : {
        type : String
    },
    about : {
        type : String,
        trim : true
    },
    contactNumber : {
        type : Number,
        trim : true
    },
    profession : {
        type : String,

    }
});

module.exports = mongoose.model("Profile", peofileSchema);