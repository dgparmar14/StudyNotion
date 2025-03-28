const jwt = require("jsonwebtoken");
const User = require("../Models/User");

require("dotenv").config();


//auth
exports.auth = async (req, res, next) => {
    try{
        //extract token
        
        
        const token = req.cookies.token ||
                        req.body.token ||
                        req.header("Authorization").replace("Bearer", "");
        
        //console.log(token);
                        
        
        if(!token){
            return res.status(401).json({
                success : false,
                message : "Error in getting token"
            })
        }

        //token verifivation
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            // console.log("After decoding : ");
            //console.log(decode);
            req.user = decode
        }
        catch(err){
            return res.status(403).json({
                success : false,
                message : "Veification error in json web token",
                error: err.message
           })
        }
        next();
        
    }catch(err){
        console.error(err);
        return res.status(400).json({
            success : false,
            message : err.message
        })
    }
}

//isStudent
exports.isStudent =  async (req, res, next) => {
    try{
        if(req.user.accountType !== "Student"){
            return res.status(403).json({
                success : false,
                message : "This is protected route for students"
            })
        }
        next();

    }catch(err){
        console.error(err);
        return res.status(500).json({
            success : false,
            message : "Failed for valideting as student, please try again"
        })
    }
}


//isAdmin
exports.isAdmin = async (req, res, next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(403).json({
                success : false,
                message : "This is protected route for Admin"
            })
        }
        next();

    }catch(err){
        console.error(err);
        return res.status(500).json({
            success : false,
            message : "Failed for valideting as Admin, please try again"
        })
    }
}

//isinstructor
exports.isInstructor = async (req, res, next) => {
    try{
       
        if(req.user.accountType !== "Instructor"){
            return res.status(403).json({
                success : false,
                message : "This is protected route for Instructors"
            })
        }
        next();

    }catch(err){
        console.error(err);
        return res.status(500).json({
            success : false,
            message : "Failed for valideting as Instructor, please try again"
        })
    }
}

//isAdmin
exports.isAdmin = async (req, res, next) => {
    try{
       
        if(req.user.accountType !== "Admin"){
            return res.status(403).json({
                success : false,
                message : "This is protected route for Instructors"
            })
        }
        next();

    }catch(err){
        console.error(err);
        return res.status(500).json({
            success : false,
            message : "Failed for valideting as Admin, please try again"
        })
    }
}

exports.quizRoleCheck = async (req, res, next) => {
    try{
       
        if((req.body.categoryId && req.user.accountType !== "Admin") || (req.body.courseId && req.user.accountType !== "Instructor")){
            return res.status(403).json({
                success : false,
                message : "This is protected route for Admins and Instructors"
            })
        }
        next();

    }catch(err){
        console.error(err);
        return res.status(500).json({
            success : false,
            message : "Failed for valideting as Admin or Instructor, please try again"
        })
    }
}