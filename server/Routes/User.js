const express = require("express");
const router = express.Router();

const {sendOtp, signUp, login, changepassword} = require("../Controllers/Auth");
const {resetPasswordToken, resetPassword} = require("../Controllers/ResetPassword");

const {auth} = require("../Middlewares/auth");

router.post("/signUp", signUp);
router.post("/login", login);
router.post("/sendOtp", sendOtp);
router.post("/changePassword", auth, changepassword);

router.post("/resetPasswordToken", resetPasswordToken);
router.post("/resetPassword", resetPassword);

module.exports = router;