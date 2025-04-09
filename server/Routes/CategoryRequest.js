const { createCategoryRequest, deleteCategoryRequest, getCategoryRequest, getCategoryRequestCreatedByUser, getRequestForAdmin, updateCategoryRequest } = require("../Controllers/CategoryRequest");
const { isAdmin, isInstructor, quizRoleCheck, auth } = require("../Middlewares/auth");


const express = require("express")
const router = express.Router()

router.post("/createCategoryRequest", auth, isInstructor, createCategoryRequest)
router.put("/updateCategoryRequest", auth, isAdmin, updateCategoryRequest)
router.get("/getCategoryRequest", auth, isAdmin, getCategoryRequest)
router.delete("/deleteCategoryRequest", auth, isInstructor, deleteCategoryRequest)
router.get("/getCategoryRequestCreatedByUser",auth, isInstructor, getCategoryRequestCreatedByUser)
router.get("/getRequestForAdmin", auth, isAdmin, getRequestForAdmin)

module.exports = router