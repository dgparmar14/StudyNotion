const User = require("../Models/User");
const Course = require("../Models/Cource");
const RatingAndReivew = require("../Models/RatingAndReview");
const { findByIdAndUpdate } = require("../Models/Catagories");
const { default: mongoose, mongo } = require("mongoose");

exports.createRatingAndReview = async (req, res) => {
    try{
        const userId = req.user.id;

        const {rating, review, courseId} = req.body;

        const courseDetails = await Course.findById({_id : courseId,
                                                    studentEnrolled : {$eleMatch : {$eq : userId}}});
        if(!courseDetails){
            return res.status(400).json({
                success : false,
                message : "Student is not enrolled in course"
            });
        }


        const alreadyGivenReview = await RatingAndReivew.findOne({user : userId,
                                                                course : courseId});
        if(alreadyGivenReview){
            return res.status(400).json({
                success : false,
                message : "Already given review"
            })
        }

        const ratingAndReview = await RatingAndReivew.create({rating,
                                                            review,
                                                            user : userId,
                                                            course : courseId,});
        const updateCourse = await Course.findByIdAndUpdate({_id : courseId},
                                                            {
                                                                $push : {
                                                                    ratingAndReviews : ratingAndReview._id,
                                                                }
                                                            },
                                                            {new : true})
        return res.status(200).json({
            success : true,
            message : "Review and rating added successfully",
            ratingAndReview
        })

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success : false,
            message : "Could not add rating and review",
            error : error.message
        })

    }
}

exports.getAverageRating = async (req, res) => {
    try{
        const courseId = req.body.courseId;

        const result = await RatingAndReivew.aggregate([
            {
                $match : {
                    course : new mongoose.Types.ObjectId(mongoose.Types.ObjectId(courseId)),
                }
            },
            {
                $group : {
                    _id : null,
                    averagerating : {$avg : "$rating"},
                }
            }
        ])

        if(result.length>0){
            return res.status(200).json({
                success : true,
                averageRating : result[0].averageRating
            })
        }

        return res.status(200).json({
            success : true,
            message : "Average rating is 0, no rating is given till now",
            averageRating : 0,
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success : false,
            message : "could not find average rating and review",
            error : error.message
        })        
    }

}
exports.getAllReviews = async (req, res) => {
    try{
        const allReviews = await RatingAndReivew.find({})
                                                    .populate("course")
                                                    .populate("user").exec();
        return res.status(200).json({
            success : true,
            message : "All reviews and ratings are fetched successfully",
            data : allReviews
        })

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success : false,
            message : "Could not get all ratings and reviews",
            error : error.message
        })   
    }
}

