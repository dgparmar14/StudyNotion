const User = require('../Models/User');
const mailSender = require("../Utils/MailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

exports.resetPasswordToken = async (req, res) => {
    try{
        //Get email from request body
        const {email} = req.body;
        
        //Verify email and existing user
        
        const user = await User.findOne({email});
        //console.log(user);
        if(!user){
            return res.json({
                success : false,
                message : "User not exist"
            });
        } 

        
        //generate token
        const token = crypto.randomBytes(20).toString("hex");
        //update user with token and expiration time
        const updateDetail = await User.findOneAndUpdate({email:email},
                                                            {
                                                                token : token,
                                                                expirationTime : Date.now() + 5*60*1000
                                                            },
                                                            {new : true})
        
        //generate password changing link
        const URL = `http://localhost:3000/changePassword/${token}`;

        //Send email
        await mailSender(
			email,
			"Password Reset",
			`Your Link for email verification is ${URL}. Please click this url to reset your password.`
		);

        //Send responce
        return res.status(200).json({
            success : true,
            message : "Token successfuuly created and mail has been sent",
            token
        })

    }catch(err){
        console.error(err);
        return res.status(500).json({
            success : false,
            message : "Error is generated in sending mail",
            error : err.message
        })

    }
}

exports.resetPassword = async (req, res) => {
    try{
        //fetch data from request body
        const {password, confirmPassword, token} = req.body;
        //console.log("Printing token inside backend : ", token);

        //check for valid entry
        if(!confirmPassword || !password){
            return res.status(403).json({
                success : false,
                message : "All feilds are require"
            })
        }

        if(confirmPassword != password){
            return res.status(403).json({
                success : false,
                message : "Password do not match"
            })
        }
        //get user data usig token
        const userDetails = await User.findOne({token : token});
        //console.log("User details : ", userDetails)

        //check if user exist or not
        if(!userDetails){
            return res.status(404).json({
                success : false,
                message : "User not exist"
            })
        }

        
        
        //token time check
        if(userDetails.expirationTime < Date.now()){
            return res.status(404).json({
                success : false,
                message : "Token time expired"
            })
        }
        //if exist get password and hash it
        const hashedPassword = await bcrypt.hash(password, 10);

        //change the password
        const updateDetail = await User.findOneAndUpdate({token : token}, {password : hashedPassword}, {new : true});

        //send responce
        return res.status(200).json({
            success : true,
            message : "Password changed successfully",
            updateDetail
        })
    }
    catch(err){
        console.error(err)
        return res.status(500).json({
            success : false,
            message : "Error occured in changing password",
            error : err.message
        })
    }
}