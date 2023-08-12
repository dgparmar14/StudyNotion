const express = require("express");
const router = express.Router();

const {auth, isInstructor} = require("../Middlewares/auth");
const {updateProfileDetails, deleteUserAccount, getAllUserDetails, updateDisplayPicture, getEnrolledCourses, instructorDashboard, updatePassword} = require("../Controllers/UpdateProfile");
const { changepassword } = require("../Controllers/Auth");


router.put("/updateProfileDetails", auth, updateProfileDetails);
router.delete("/deleteUserAccount", auth, deleteUserAccount);
router.get("/getAllUserDetails", auth, getAllUserDetails);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);
router.get("/getEnrolledCourses", auth, getEnrolledCourses);
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);
router.post("/updatePassword", auth, updatePassword);

module.exports = router;