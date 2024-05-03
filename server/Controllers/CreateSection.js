const Section = require("../Models/Section");
const Cource = require("../Models/Cource");
const { TokenExpiredError } = require("jsonwebtoken");
const CourseProgress = require("../Models/CourceProgress");
const { default: mongoose } = require("mongoose");
const SubSection = require("../Models/SubSection");
var ObjectId = require('mongodb').ObjectId;

exports.createSection = async (req, res) => {
    try{
        //fetch data
        const {sectionName, courceId} = req.body;
        //console.log("Printing body : ", req.body);

        //Validate Data
        if(!sectionName || !courceId){
            return res.status(403).json({
                success : false,
                message : "All the feilds are required"
            });
        }

        //Create Section
        const newSection = await Section.create({title : sectionName});

        //Update Section id in Cource 
       
        const updatedCource = await Cource.findByIdAndUpdate(courceId,
                                                            {
                                                                $push : {
                                                                    courceContent : newSection
                                                                }
                                                            }, {new : true}).populate("courceContent").exec();
        //HW : Use populate to replace sections/sub-section both in the updatedCource

        //Return Responce
        return res.status(200).json({
            success : true,
            message : "Section created successfully",
            newSection,
            updatedCource
        })

    }catch(err){
        console.error(err);
        return res.status(500).json({
            success : false,
            message : "Failed to create section, please try again",
            error : err.message
        })

    }
}

exports.updateSection = async (req, res) => {
    try{
        //Fetch data
        //console.log(req.body);

        const {sectionName, sectionId, coid} = req.body;

        //Validate Data
        if(!sectionName || !sectionId){
            return res.status(403).json({
                success : false,
                message : "All the feilds are required"
            });
        }
        //Update section
        const updateSection = await Section.findByIdAndUpdate({_id:sectionId}, {title : sectionName}, {new : true});
        const updateCourse = await Cource.findById({_id:coid}).populate({path:"courceContent", populate:{path:"subSections"}}).exec();

        //Returning data
        return res.status(200).json({
            success : true,
            message : "Section Updated Successfully",
            data:updateCourse,
        })

    }catch(err){
        console.error(err);
        return res.status(500).json({
            success : false,
            message : "Failed to update section, Pkease try again",
            error : err.message
        })
    }
}

exports.deleteSection = async (req, res) => {
    try{
        //fetch data from params
        const {sectionId, courseId} = req.body;
        const userId = req.user.id;
        //delete data
        const section = await Section.findById({_id : sectionId});

        for(let subSection of section.subSections){
            await CourseProgress.findByIdAndUpdate({courseId : courseId, userId : userId}, {
                $pull : {
                    completedVideos : {_id : subSection._id}
                }
            }, {new : true});
            await SubSection.findByIdAndDelete({_id : subSection._id});    
        }
        const updatedSection = await Section.findByIdAndDelete({_id : sectionId});
        //TODO : Do we need to delete the section id from the cource

        const updatedCourse = await Cource.findByIdAndUpdate({_id:courseId}, {
                                                                        $pull : {
                                                                            courceContent : {_id : sectionId}
                                                                        }
                                                                    }, {new : true}).populate("courceContent").exec();

        
        //responce return
        return res.status(200).json({
            success : true,
            message : "Section is deleted successfullty",
            updatedSection,
            updatedCourse
        })
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success : false,
            message : "Failed to delete section, please try again",
            error : err.message
        })

    }
}