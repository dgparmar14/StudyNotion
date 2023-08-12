const app  = require("express");
const router = app.Router();

const {contactUsController } = require("../Controllers/ContactUs");


router.post("/contact", contactUsController);

module.exports = router;
