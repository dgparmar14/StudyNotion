
const User = require("../Models/User");
const OTP = require("../Models/OTP");
const generateOtp = require("otp-generator");
const bcrybt = require("bcrypt");
const Profile = require("../Models/Profile");
const JWT = require("jsonwebtoken");
const mailSender = require("../Utils/MailSender")
const { passwordUpdated } = require("../templates/passwordUpdate");
require("dotenv").config();

//sendOtp
exports.sendOtp = async (req, res) => {
    try{
        const {email} = req.body;

        const alreadyExistUSer = await User.findOne({email});

        if(alreadyExistUSer){
            return res.status(401).json({
                success : false,
                message : "User already exist"
            })
        }

        const otp = generateOtp.generate(6, {
            upperCaseAlphabets : false,
            lowerCaseAlphabets : false,
            specialChars : false
            
        });

        let result = await OTP.findOne({otp : otp});

        while(result){
            const otp = generateOtp.generate(6, {
                upperCaseAlphabets : false,
                lowerCaseAlphabets : false,
                specialChars : false

            });
    
            let result = await OTP.findOne({otp : otp});
    
        }

        const payLoad = {email, otp};

        const otpBody = OTP.create(payLoad);
        

        
        return res.status(200).json({
            success : true,
            message : `Otp sent successfully on emailId : ${email}`,
            otp : otp
        })
        

    }
    catch(err){
        console.error(err);
        return res.status(400).json({
            success : false, 
            message : "Error occured in sending otp",
            error : err.message
        })

    }
    
}
//signUp

exports.signUp = async (req, res) => {
    try{
        const {
            firstName, 
            lastName,
            email,
            password,
            confirmpassword,
            accountType,  
            otp
        } = req.body;

       
        //validation
        if(!firstName || !lastName || !email || !password || !confirmpassword || !otp){
            return res.status(403).json({
                success : false,
                message : "All details are mendetory"
            })
        }
     
        //checking passord and confirm password
        if(password !== confirmpassword){
            return res.status(403).json({
                success : false,
                message : "Passwords do not matched"
            })
        }
    
        //checking for existing user
        const exsistingUser = await User.findOne({email});
        if(exsistingUser){
            return res.status(403).json({
                success : false,
                message : "User already exist"
            })
        }
    
        //otp checking
        const recentOtp = await OTP.find({email}).sort({createdAt : -1}).limit(1);
       
        if(recentOtp.length === 0){
            return res.status(403).json({
                success : false,
                message : "Invalid OTP"
            })
        }
    
        if(otp !== recentOtp[0].otp){
            return res.status(403).json({
                success : false,
                message : "OTP do not matched"
            })
        }
    
        //Hash password
        const hashedPassword = await bcrybt.hash(password, 10);

        let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

        //Create entry in database
    
        const ProfileDetais = await Profile.create({
            gender : null,
            dob : null,
            about : null,
            contactNumber : null,
            profession : null
        });
        
        const user = await User.create({
            firstName,
            lastName,
            email,       
            password : hashedPassword,
            accountType : accountType,
            approved : approved,
            additioalDetails : ProfileDetais._id,
            image : `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        });


        return res.status(200).json({
            success : true,
            Message : "User created successfully",
            user
        })

    }
    catch(err){
        console.error(err);
        return res.status(400).json({
            success : false, 
            message : "Error occured in signup",
            error : err.message
        })

    }
    

}

//Login

exports.login = async (req, res) => {
    try{
        //get data from request body
    const {email, password} = req.body;

    //Validate data
    if(!email || !password){
        return res.status(403).json({
            success : false,
            message : "All feilds are required"
        })
    }

    //check user exist or not
    const user = await User.findOne({email}).populate("additioalDetails");
    if(!user){
        return res.json(403).json({
            success : false,
            message : "User do not exist"
        })
    }

    //generate JWT token after comparing password
    if(await bcrybt.compare(password, user.password)){
        const payLoad = {
            email : user.email,
            id : user._id,
            accountType : user.accountType
        }
        const token = JWT.sign( {email : user.email, id : user._id, accountType : user.accountType}, process.env.JWT_SECRET, {
            expiresIn : "2h"
        });
       
        user.token = token;
        user.password = undefined;

        //console.log("Printing token inside login controller : ", token);

        const options = {
            expiresIn : new Date(Date.now() + 3*24*60*60*1000),
            httpOnly : true
        }
        //Create coockie and send responce
        return res.cookie("token", token, options).status(200).json({
            success : true,
            message : "User successfully logged in",
            token,
            user
        })
    }

    else{
        return res.status(403).json({
            success : false,
            message : "Password incorrect"
        })
    }
    }
    catch(err){
        console.error(err);
        return res.status(400).json({
            success : false, 
            message : "Do not loggedin, please try again",
            error : err.message
        })

    }    
}

//changepassword
exports.changepassword = async (req, res)=>{
    try{
        //get Data from request body
        const {oldPassword, newPassword, confirmpassword} = req.body;
        const email = req.user.email

        //validations
        if(!oldPassword || !newPassword || !confirmpassword || !email){
            return res.status(404).json({
                success : false,
                message : "All feilds are required"
            })
        }

        const user = await User.findOne({email : email});
        if(!user){
            return res.status(404).json({
                success : false,
                message : "User do not exist"
            })
        }
        //Check oldpassword, newpassword, confirmpassword
        if(newPassword !== confirmpassword){
            return res.status(404).json({
                success : false,
                message : "Password do not matched"
            })
        }

        if(!bcrybt.compare(user.password, oldPassword)){
            return res.status(400).json({
                success : false,
                message : "Incorrect password"
            })
        }

        //update password in database
        const hashNewPassword = await bcrybt.hash(password, 10);
        const updatePasswordDetail = await User.findOneAndUpdate(req.user.id, {password : hashNewPassword}, {new : true});

        //send mail of password update
        try {
            const mail = await mailSender(updatePasswordDetail.email,
                passwordUpdated(
                    updatePasswordDetail.email,
                    `Password updated successfully for ${updatePasswordDetail.firstName} ${updatePasswordDetail.lastName}`
                ));
    

        }catch(error){
            console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
            
        }
        
        //return responce
        return res.status(200).json({
            success : true,
            message : "Your password has updated successfully"
        })

    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success : false,
            message : 'Error occured in changing password',
            error : err.message
        })
    }
    

}
