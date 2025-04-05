const express = require("express");
const router = express.Router();

const {createCategory, showAllCategories, catagoryPageDetails, getCategoryCourseList} = require("../Controllers/Catagory");
// const {sendOtp, signUp, login, changepassword} = require("../Controllers/Auth");
const {createCource, getAllCources, getAllCourcesDetails, getAllInstructorCourses,getAllCourseCategories, getFullDetailsOfCourse, editCourse, deleteCourse} = require("../Controllers/CreateCource");
const {createSection, updateSection, deleteSection} = require("../Controllers/CreateSection");
// const {capturepayment, varifySecretKey} = require("../Controllers/Payments");
const {createRatingAndReview, getAverageRating, getAllReviews} = require("../Controllers/RatingAndReview");
// const {resrtPasswordToken, resetPassword} = require("../Controllers/ResetPassword");
const {createSubSection, updateSubsection, deleteSubsection} = require("../Controllers/Subsection");
// const {updateProfileDetails, deleteUserAccount, getAllUserDetails} = require("../Controllers/UpdateProfile");
const {auth, isStudent, isAdmin, isInstructor} = require("../Middlewares/auth");

const {updateCourseProgress} = require("../Controllers/CourseProgress");


router.post("/createCourse", auth, isInstructor, createCource);
router.post("/addSection", auth, isInstructor, createSection);
router.post("/addSubsection", auth, isInstructor, createSubSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.delete("/deleteSection", auth, isInstructor, deleteSection);
router.delete("/deleteSubSection", auth, isInstructor, deleteSubsection);
router.post("/updateSubSection", auth, isInstructor, updateSubsection);
router.get("/getAllCourese", getAllCources);
router.post("/getAllCoursesDetrails", auth, getAllCourcesDetails);
router.get("/getAllInstructorCourses", auth, isInstructor, getAllInstructorCourses);
router.get("/showAllCourseCatagories", getAllCourseCategories );
router.post("/editCourse", auth, isInstructor, editCourse);
router.post("/deleteCourse", auth, isInstructor, deleteCourse);
router.post("/getAllDetailsofCourse",auth, getFullDetailsOfCourse);
//Catagory Routes
// router.post("/createCatagory", auth, isAdmin, createCategory);
router.post("/createCatagory", createCategory);
router.get("/showAllCatagory", showAllCategories);
router.post("/getCatagoryPageDetails", catagoryPageDetails);
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);
router.get("/getCategoryCourseDetails", auth, isAdmin, getCategoryCourseList);

//Rating and Review Routers
router.post("/createRatingAndReview", auth, isStudent, createRatingAndReview);
router.get("/getAverageRating", getAverageRating);
router.get("/getAllReviews", getAllReviews);

module.exports = router;
