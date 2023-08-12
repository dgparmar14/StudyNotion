import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice"
import profileReducer from "./Slices/profileSlice";
import cartReducer from "./Slices/cartSlice";
import coursereducer from "./Slices/courseSlice.js";
import viewCourseReducer from "./Slices/viewCourseSlice";


const rootReducer = combineReducers(
    {
        auth : authReducer,
        profile : profileReducer,
        cart : cartReducer,
        course : coursereducer, 
        viewCourse : viewCourseReducer
    }
   
)

export default rootReducer;