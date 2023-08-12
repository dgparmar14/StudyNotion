const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        trim : true
    },
    lastName : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        
    },
    password : {
        type : String,
        required : true,
    },
    token : {
        type : String
    },
    expirationTime : {
        type : Date
    },
    active : {
        type : Boolean,
        default : true,
    },
    approved : {
        type : Boolean,
        default : true,
    },
    accountType : {
        type : String,
        required : true,
        enum : ["Student", "Admin", "Instructor"]
    },
    additioalDetails : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Profile"
    },
    token : {
        type : String,
    },
    resetPasswordExpires : {
        type : Date,
    },
    courceProgress : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "CourceProgress"
        }
    ],
    cources : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Cource"
        }
    ],
    image : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model("User", userSchema);