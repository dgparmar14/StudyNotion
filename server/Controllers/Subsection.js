const SubSection = require("../Models/SubSection");
const Section = require("../Models/Section");
const CourseProgress = require("../Models/CourceProgress");
const {imageUpload} = require("../Utils/ImageUploader");
const { default: mongoose } = require("mongoose");



exports.createSubSection = async (req, res) => {
    try{
        //Fetch data
        //console.log(req.body);
       
        //console.log(req.files);
        const {title, description, timeDureation,sectionId} = req.body;
        // const sectionId = JSON.stringify(req.body.sectionId);
      
        // console.log("Printing type f sectionId", typeof(sectionId));
        //sectoionId = sectoionId.toString();
        //abtract file from postman

        
       
        const vedioUrl = req.files.videoFile;
        
        //validate
        if(!title || !description || !vedioUrl){
            return res.status(200).json({
                success : false,
                message : "All the fields are required"
            })
        }

        //Upload video to vloudinary
        const uploadVideoCludinary = await imageUpload(vedioUrl, process.env.FOLDER_NAME, 1000, 1000)

        //Creare sub Section
        const newSubSection = await SubSection.create({title,
                                                    description : description,
                                                    videoDuration : uploadVideoCludinary.duration,
                                                    videoUrl : uploadVideoCludinary.secure_url});
        
        //HW : Use poppulate method
        //console.log("New subsection :", newSubSection);

        //Upload subSection Id in section

        const updateSection = await Section.findByIdAndUpdate({_id:sectionId}, 
                                                            {
                                                                $push : {
                                                                    subSections : newSubSection._id
                                                                }
                                                            }, {new : true}).populate("subSections");
        // console.log(updateSction);
        //Return responce 
        return res.status(200).json({
            success : true,
            message : "Subsection created successfully",
            data:updateSection
        })

    }catch(err){
        console.error(err);
        return res.status(500).json({
            success : false,
            message : "Failed to create subbsection, please try agian",
            error : err.message
        })

    }
}

exports.updateSubsection = async (req, res) => {
    try{
        
        const {description, timeDureation, title, subsectionId} = req.body;
        const subSection_Id = new mongoose.Types.ObjectId(subsectionId);
        const sectionId = new mongoose.Types.ObjectId(req.body.sectionId);

        const newVideo = req.files.videoFile;
    
        const updatedSubSection = await SubSection.findByIdAndUpdate({_id : subSection_Id},
                                                                    {title : title,
                                                                    description : description,
                                                                    timeDureation : timeDureation,
                                                                    videoUrl : newVideo.secure_url}, 
                                                                    {new : true})
                                    
        //console.log("Printing updated subsection : ------", updatedSubSection);
        const updatdSection = await Section.findById(sectionId).populate("subSections");

        //console.log("Printing Updated section ---------", updatdSection);
        return res.status(200).json({
            success : true,
            message : "Subsection updated successfully",
            data : updatdSection
        })

    }catch(err){
        console.error(err);
        return res.status(500).json({
            success : false,
            message : "Failed to update subsection, please try agian",
            error : err.message
        })
    }
}

exports.deleteSubsection = async (req, res) => {
    try{
        const {subSectionId, sectionId1} = req.body;
        const userId = req.user.id;
        const updatedSubSection = await SubSection.findByIdAndDelete({_id : subSectionId});

        const updateSection = await Section.findByIdAndUpdate({_id:sectionId1}, {
                                                                                    $pull : {
                                                                                        subSections : {_id : subSectionId}
                                                                                    }
                                                                                }, {new : true}).populate("subSections").exec();

        const completedLectures = await CourseProgress.findByIdAndUpdate({courseId : courseId, userId : userId}, {
            $pull : {
                completedVideos : {
                    _id : subSectionId
                }
            }
        })

        return res.status(200).json({
            success : true,
            message : "Subsection deleted successfully",
            data : updateSection
        })

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success : false,
            message : "Failed to delete subsection, please try agian",
            error : error.message
        })
    }
}