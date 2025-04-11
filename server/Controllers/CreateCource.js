
const Cource = require("../Models/Cource");
const Catagories = require("../Models/Catagories");
const {imageUpload} = require("../Utils/ImageUploader");
const { trusted, default: mongoose } = require("mongoose");
const Section = require("../Models/Section");
const SubSection = require("../Models/SubSection");
const User = require("../Models/User");
const CourceProgress = require("../Models/CourceProgress");
const { convertSecondsToDuration } = require("../Utils/ConvertSecontsToDuration");


require("dotenv").config();

exports.createCource = async (req, res) => {
    try{
        //console.log("Printing request body : ", req.body);
       
        const {courseName, tags, status, instructions, courseDescription, price, whatYouWillLearn, category} = req.body;
       
        const thumbNail = req.files.thumbNail;
        //console.log(courseName, courseDescription, price, whatYouWillLearn, category, thumbNail, tags);
        
        if(!courseName || !courseDescription || !price || !whatYouWillLearn || !category || !thumbNail || !tags){
            return res.status(403).json({
                success : false,
                message : "All the details are mendetory"
            })
        }
       ;
        
        //TODO : check userId and insttuctor._Id is same or not
        const userId = req.user.id;
        const instructor = await User.findById({_id : userId}, {accountType : "Instructor"});
        //console.log("Instructor details get");
        //console.log("Instructor : ", instructor);

        if(!instructor){
            return res.status(403).json({
                success : false,
                message : "Instructor not found"
            })
        }

        const findCatagory = await Catagories.findById(category);
        //console.log("Printing catagory ---------", findCatagory);

        if(!findCatagory){
            return res.status(403).json({
                success : false,
                message : "Catagory is not found"
            });
        }
        const thumbNailImage = await imageUpload(thumbNail, process.env.FOLDER_NAME, 1000, 1000);
        //console.log(courseName);
        const newcource = await Cource.create({
            courceName : courseName,
            description : courseDescription,
            instructor : instructor._id,
            price,
            tag : tags,
            instructor : instructor._id,
            catagory : findCatagory._id,
            whatYouWillLearn,
            status : status,
            thumbNail : thumbNailImage.secure_url,
            insstructions : instructions
        });
        //console.log("new Course :", newcource);

        await User.findByIdAndUpdate({_id : instructor._id},
                                    {
                                        $push : {
                                            cources : newcource._id
                                        }
                                    }, {new : true} );
        const updatedCatagory = await Catagories.findByIdAndUpdate({_id : findCatagory._id},
                                    {
                                        $push : {
                                            courses : newcource._id
                                        }
                                    }, {new : true});
        

        return res.status(200).json({
            success : true,
            message : "Cource successfully created",
            data : newcource
        })
        

    }catch(err){
        console.error(err);
        return res.status(500).json({
            success : false,
            message : "Failed to creating cource",
            error : err.message
        })



    }
}

exports.editCourse = async(req, res)=>{
    try{
        console.log("Printing Body---------", req.body);
        const {courseId} = req.body; 
        // const course_Id = JSON.stringify(req.body.);
        // console.log("Printing tyoe of object id -----", course_Id)
        const updates = req.body;
        const course = await Cource.findOne({_id : courseId});

        if(!course){
            return res.status(402).json({
                success : false,
                error : "Course not found"
            })
        }

        if(req.files){
            //Thusmbnail is updated
            const file = req.files.thumbnailImage;
            const updateImage = await imageUpload(file, process.env.FOLDER_NAME);
            course.thumbNail = updateImage.secure_url;
        }

        //Update only that fields that are present in the body
        for(let key in updates){
            if(updates.hasOwnProperty(key)){
                if(key==="tags" || key==="instructions"){
                    course[key] = JSON.parse(updates[key]);
                }
                else{
                    course[key] = updates[key];
                }
            }
        }

        await course.save();

        const updatedCourse = await Cource.findOne({_id:courseId}).populate({
                                                                                path : "courceContent",
                                                                                populate : {path : "subSections"}
                                                                            })
                                                                    .populate({
                                                                        path:"instructor",
                                                                        populate : ({path:"additioalDetails"})
                                                                    })
                                                                    .populate("catagory")
                                                                    .populate("ratingAndReviews").exec()
        if(!updatedCourse){
            return res.status(404).json({
                success : false,
                messege : "Course not found"
            })
        }
        //console.log(updatedCourse);
        return res.status(200).json({
            success : true,
            message : "Course edited successfully",
            data : updatedCourse
        })
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success : false,
            message : "Error occured in editinf course",
            error : error.message
        })
      

    }
}

exports.getAllCources = async (req, res) => {
    try{
        const courceData = await Cource.find({}, {courceName : true,
                                            price : true,
                                            thumbNail : true,
                                            instructor : true,
                                            ratingAndReviews : true,
                                            studentsEnrolled : true,})
                                            .populate("instructor")
                                            .populate(
                                                {
                                                    path : "courceContent",
                                                    populate : {
                                                        path : "subSections",
                                                    }
                                                }
                                            )
                                            .populate("studentsEnrolled")
                                            .populate("ratingAndReviews")
                                            .exec();
        return res.status(200).json({
            success : true,
            message : "All the cources got successfully",
            courceData
        })


    }catch(err){
        console.error(err);
        return res.status(500).json({
            success : true,
            message : "Failed to fetch all cources",
            error : err.message
        })
    }
}

exports.getAllCourcesDetails = async (req, res) => {
    try{
        const userId = req.body;
        const courceDetails = await Cource.findById(
                                            {_id : userId})
                                            .populate(
                                                {
                                                    path : "courceContent", 
                                                    populate : {path : "subSections"} 
                                                } )
                                            .populate("ratingAndReviews")
                                            .populate(
                                                {
                                                    path : "instructor",
                                                    populate : {
                                                        paht : "additionalDetails",
                                                    }
                                                }
                                            )
                                            .populate("catagory")
                                            .exec();
        if(!courceDetails){
            return res.status(404).json({
                success : false,
                message : `Course details not found for courseId ${courseId}`
            })
        }

        return res.status(200).json({
            success : false,
            message : "Course details fetched successfully",
            data : courceDetails,
        })

    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : "Could not find dtails for course"
        })

    }

}

exports.getAllInstructorCourses = async(req, res) => {
    try{
       
        const id = req.user.id;

        const instructorCourses = await Cource.find({
            instructor: id,
          }).sort({ createdAt: -1 })
        
        if(!instructorCourses){
            return res.status(402).json({
                success : false,
                messege : "User not found"
            })
        }
        return res.status(200).json({
            success : true,
            message : "Instructor courses fetched successfully",
            data: instructorCourses
        })

    }catch(error){
        return res.status(500).json({
            success : false,
            message : "Could not find dtails for course",
            error : error.message
        })
    }

}

exports.getAllCourseCategories = async(req, res)=>{
    try{
        const id = req.body;
        const courses = await Cource.findById(id).populate("catagory")
                                                            
        if(!instructor){
            return res.status(402).json({
                success : false,
                messege : "Course not found"
            })
        };
       
        if(courses==null){
            return res.status(200).json({
                success : true,
                messege : "Course do not have any catagory"
            })
        }                                          
        return res.status(200).json({
            success : trusted,
            messege : "Categories fetched successfully",
            courses
        })
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success : false,
            message : "Could not find catagories for course",
            error : error.message
        })

    }
}

exports.getFullDetailsOfCourse = async(req, res) => {
    try{
        //console.log("Coursr id : ", req.body);
        const userId = req.user.id;
        const {courseId } = req.body;
        //console.log(courseId);
        
        const courseDetails = await Cource.findById({_id : courseId})
        .populate("instructor")
        .populate("catagory")
        .populate(
            {
                path : "courceContent",
                populate : {
                    path : "subSections",
                }
            }
        )
        .populate("studentsEnrolled")
        .populate("ratingAndReviews")
        .populate("quiz")
        .exec();

        // let totalDuration = 0;
        // courseDetails.courceContent.forEach((subSections)=>{
        //     const lectureTimeDuration = parseInt(subSections.videoDuration);
        //     totalDuration += lectureTimeDuration;
        // });
        let totalDurationInSeconds = 0
        courseDetails.courceContent.forEach((content) => {
          content.subSections.forEach((subSection) => {
            const timeDurationInSeconds = parseInt(subSection.videoDuration)
            totalDurationInSeconds += timeDurationInSeconds
          })
        })
    
        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

        //console.log('Pritnting result : ', courseDetails);
        if(!courseDetails){
            return res.status(402).json({
                success : false,
                messege : "Course not found"
            })
        };
        const courseProgressDetails = await CourceProgress.findOne({
            courseId : courseId,
            userId : userId
        });

        //console.log("Printing course progressCount : ", courseProgressDetails);


        // const totalTimeDuration = convertSecondsToDuration(totalDuration);

        return res.status(200).json({
            success:true,
            message:"All the details are fetched successfully",
            data : {
                courseDetails : courseDetails,
                timeDuration : totalDuration,
                completedVideos : courseProgressDetails?.completedVideos ? courseProgressDetails?.completedVideos : []
            }
        })
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success : false,
            message : "Could not find  course details",
            error : error.message
        })


    }
}

exports.deleteCourse = async(req, res)=>{
    try{
        const { courseId } = req.body
        const userId = req.user.id;
       
        //console.log("Printng body ---------", req.body);

        // Find the course
        const course = await Cource.findById({_id : courseId})
        if (!course) {
          return res.status(404).json({ message: "Course not found" })
        }

        const catagoryUpdate = await Catagories.findByIdAndUpdate({_id : course.catagory}, {
            $pull : {
                courses : courseId
            }
        });

        //console.log("Printing course catagories after pulling deleted couerseId : ", catagoryUpdate);
    
        // Unenroll students from the course
        const studentsEnrolled = course.studentsEnrolled
        for (const studentId of studentsEnrolled) {
          await User.findByIdAndUpdate(studentId, {
            $pull: { courses: courseId },
          })
        }
    
        // Delete sections and sub-sections
        const courseSections = course.courceContent
        for (const sectionId of courseSections) {
          // Delete sub-sections of the section
          const section = await Section.findById(sectionId)
          if (section) {
            const subSections = section.subSections
            for (const subSectionId of subSections) {
              await SubSection.findByIdAndDelete(subSectionId)
            }
          }
    
          // Delete the section
          await Section.findByIdAndDelete(sectionId)
        }

        const completedLectures = await CourceProgress.findOneAndDelete({courseId : courseId, userId: userId})
    
        // Delete the course
        await Cource.findByIdAndDelete(courseId)
    
        return res.status(200).json({   
          success: true,
          message: "Course deleted successfully",
        })
      } catch (error) {
        console.error(error)
        return res.status(500).json({
          success: false,
          message: "Server error",
          error: error.message,
        })
      }
}


