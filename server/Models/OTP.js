const mongoose = require("mongoose");
const MailSender = require("../Utils/MailSender");

const otpSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    otp : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now(),
        expires : 5*60
    }
});

async function sendVerificationMail(email, OTP){
    try{
        console.log(OTP);
        const sendMail = await MailSender(email, "Verification email from StudyNotion",OTP);
        console.log("Mail has been sent successfully : ", sendMail);

    }
    catch(err){
        console.log("Error occured during sending mail : ", err.message);
    }
}
 otpSchema.pre("save", async function(next){
    console.log("New document saved to database");

    //Only send an email when a new document is created
    if(this.isNew){
        await sendVerificationMail(this.email, this.otp);
    }
   
    next();
 });
 


module.exports = mongoose.model("OTP", otpSchema);