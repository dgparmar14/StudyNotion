
const Profile = require("../Models/Profile");
const User = require("../Models/User");
const CourseProgress = require("../Models/CourceProgress");
const Cource = require("../Models/Cource");
const { convertSecondsToDuration } = require("../Utils/ConvertSecontsToDuration");
const {imageUpload} = require("../Utils/ImageUploader");

const bcrypt = require("bcrypt");
const CourceProgress = require("../Models/CourceProgress");
const RatingAndReview = require("../Models/RatingAndReview");
//const User = require("../models/User");
require("dotenv").config();

//Here we have already created an profile object with null values in User. So now we are only supposed to update profile
exports.updateProfileDetails = async (req, res) => {
    try{
        //fetch data
        const {birthDate , description , phoneNumber, gender, profession, firstName } = req.body;

        //fetching user id from responce which we have sens during authentication
        const userId = req.user.id;
        

        //Verification
        // if(!dob || !contactNumber || !gender || !userId){
        //     return res.status(403).json({
        //         success : false,
        //         message : "All the fields are required"
        //     });
        // }

        //Geting profile id
        const userDetails = await User.findById(userId);

        

        if(userDetails.firstName != firstName){
            const updateFirstname = await User.findByIdAndUpdate({_id : userId}, {firstName : firstName}, {new: true});
        }
        const profileId = userDetails.additioalDetails;
        const additionalDetails = await Profile.findById(profileId);

        //Update the data
        additionalDetails.dob = birthDate;
        additionalDetails.about = description;
        additionalDetails.gender = gender;
        additionalDetails.contactNumber = phoneNumber;
        additionalDetails.profession = profession;
        additionalDetails.save();

        const updatedUser = await User.findById({_id : userId}).populate("additioalDetails").populate("cources").populate("courceProgress");

        //returning responce
        return res.status(200).json({
            success : true,
            message : "Profile details added successfully",
            updatedUser
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success : false,
            message : "Faild to update profile details, please try again",
            error : error
        })
    }

}

//TODE : learn about how we can delete account after the request has been generated
exports.deleteUserAccount = async (req, res) => {
    try{
        const id = req.user.id;

        const user = await User.findById({_id : id});

        if(!user){
            return res.status(404).json({
                success : false,
                message : "User do not exist"
            })
        }

        for(let i = 0; i<user.cources.length; i++){
            const courseUpdate = await Cource.findByIdAndUpdate({_id : user.cources[i]}, {
                $pull : {
                    studentsEnrolled : id,
                }
            }, {new : true})
        }

        const courceProgressUpdate = await CourceProgress.deleteMany({userId : id});

        const deletedReviews = await RatingAndReview.deleteMany({user : id});

        const profileId = user.additioalDetails;

        await Profile.findByIdAndDelete(profileId);

        await User.findByIdAndDelete(user);

        //TODO : delete user from all the corresponding cources

        return res.status(200).json({
            success : true,
            message : "User deleted successfully"
        })

    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success : false,
            message : "User can not be deleted successfully",
            error : err.message
        })

    }
}


exports.getAllUserDetails  = async (req, res) => {
    try{
        const id = req.user.id;

        const userDetails = await User.findById(id).populate("additioalDetails").exec();

        if(!userDetails){
            return res.status(400).json({
                success : false,
                message : "Error in getting user data"
            })
        }

        return res.status(200).json({
            success : true,
            message : "User data fetched successfully",
            userDetails
        })

    }catch(error){
        console.error(error);
        return res.status(500).json({
            success : false,
            message : "User data can not be fetched",
            error : error.message
        })

    }

}
exports.updateDisplayPicture = async (req, res) => {
    try{
        const userId = req.user.id;
        console.log("Printing request : ", req.files);

        const displayPicture = req.files.displayImage;
        const image = await imageUpload(displayPicture, process.env.FOLDER_NAME, 100, 100);

        console.log(image);

        const updateProfile = await User.findByIdAndUpdate({_id : userId},
                                                            {image : image.secure_url},
                                                            {new : true});
        res.send({
            success : true,
            message : "Image uploaded successfully",
            data : updateProfile,
        })

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success : false,
            message : "Error ccured in update profile",
            error : error.message
        })

    }
}
exports.getEnrolledCourses = async (req, res) => {
    try{
        const userId = req.user.id;
        let userDetails = await User.findOne({_id : userId}).populate({
                                                                            path : "cources",
                                                                            populate : {
                                                                                            path : "courceContent",
                                                                                            populate : {path : "subSections"} }

                                                                        }).exec();
        console.log('Printing user enrolled courses : ', userDetails);

        if(!userDetails){
            return res.status(400).json({
                success : false,
                message : `Could not find details with id : ${userId}`,
            })
        }
        
        userDetails = userDetails.toObject()
	  var SubsectionLength = 0
	  for (var i = 0; i < userDetails.cources.length; i++) {
		let totalDurationInSeconds = 0
		SubsectionLength = 0
		for (var j = 0; j < userDetails.cources[i].courceContent.length; j++) {
		  totalDurationInSeconds += userDetails.cources[i].courceContent[
			j
		  ].subSections.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
		  userDetails.cources[i].totalDuration = convertSecondsToDuration(
			totalDurationInSeconds
		  )
		  SubsectionLength +=
			userDetails.cources[i].courceContent[j].subSections.length
		}
		let courseProgressCount = await CourseProgress.findOne({
		  courseId: userDetails.cources[i]._id,
		  userId: userId,
		})
		courseProgressCount = courseProgressCount?.completedVideos.length
		if (SubsectionLength === 0) {
		  userDetails.cources[i].progressPercentage = 100
		} else {
		  // To make it up to 2 decimal point
		  const multiplier = Math.pow(10, 2)
		  userDetails.cources[i].progressPercentage =
			Math.round(
			  (courseProgressCount / SubsectionLength) * 100 * multiplier
			) / multiplier
		}
	  }

        return res.status(200).json({
            success : true,
            message : "All details fetched successfully",
            data:userDetails
        })

    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : "Could not find details",
            error : error.message
        })
    }
}


exports.instructorDashboard = async(req, res) => {
    try{
        const userId = req.user.id;
        const courseDetails = await Cource.find({instructor : userId});

        const courseData = courseDetails.map((course)=>{
            const totalStudentsEnrolled = course.studentsEnrolled.length;
            const totalAmountGenerated = course.price * totalStudentsEnrolled;

            const courseDataWithStats = {
                _id : course._id,
                courseName : course.courceName,
                courseDescription : course.description,
                totalStudentsEnrolled,
                totalAmountGenerated
            }

            return courseDataWithStats
        })

        return res.status(200).json({
            success : true,
            data : courseData
        })

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success : false,
            message : "Error occured in instructor dashboard"
        })
    }

}

exports.updatePassword = async(req, res) => {
    try{
        const {currentPassword, changePassword} = req.body;
        const userId = req.user.id;

        

        if(!currentPassword || !changePassword){
            return res.status(401).json({
                success : false,
                message : "All the fields are necessory"
            });
        }

        const user = await User.findOne({_id : userId});
        console.log("Printing password : ", user.password);

        if(!bcrypt.compare( user.password, currentPassword)){
            return res.status(401).json({
                success : false,
                message : "Please enter correct password"
            })

        }

        const hashNewPassword = await bcrypt.hash(currentPassword, 10);
        const updateUser = await User.findByIdAndUpdate({_id : userId}, {password : hashNewPassword}, {new : true});

        return res.status(200).json({
            success : true,
            message : "Password Updated Successfully",
            data : updateUser
        })
    }catch(error){
        return res.status(500).json({
            success : false,
            message : "Error occured while updating password",
            error : error.message
        })
    }
}
