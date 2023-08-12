const express = require("express");
const router = express.Router();

const {capturePayment, verifyPayment, sendEmailPaymentSuccess} = require("../Controllers/Payments");
const {auth, isStudent} = require("../Middlewares/auth");

router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/varifySignature", auth, isStudent, verifyPayment);
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendEmailPaymentSuccess)

module.exports = router;