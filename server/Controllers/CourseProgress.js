
const { mongo, default: mongoose } = require("mongoose");
const SubSection = require("../Models/SubSection");
const CourseProgress = require("../Models/CourceProgress");
const User = require("../Models/User");

exports.updateCourseProgress = async(req, res) => {
    try{

        const {courseId, subSectionId} = req.body;
        const userId = req.user.id;

        const subSection_id = new mongoose.Types.ObjectId(subSectionId);

        const subSection = await SubSection.findById({_id : subSection_id});

        if(!subSection){
            return res.status(400).json({
                success : false,
                message : "SubSection not found"
            })
        }

        const completedCourses = await CourseProgress.findOne({
            courseId : courseId,
            userId : userId
        });

        if(!completedCourses){
            return res.status(400).json({
                success : false,
                message : "Course progress do not exist"
            })
        }

        if(completedCourses.completedVideos.includes(subSection_id)){
            return res.status(404).json({
                success : false,
                message : "Lecture is already completed"
            })
        }

        await completedCourses.completedVideos.push(subSection_id);
        completedCourses.save();

        const userProgress = await User.findByIdAndUpdate({_id : userId}, {
            $push : {
                courceProgress : completedCourses._id
            }
        }, {new : true});

        return res.status(200).json({
            success : true,
            message : "Lecture added successfully in completed lectures"
        })


    }catch(error){
        console.error("Error occured in updating completed lectures");
        return res.status(500).json({
            success : false,
            message : "Error occured in updating completed lectured",
            error : error.message
        })

    }
}