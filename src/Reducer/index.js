
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice"
import profileReducer from "./Slices/profileSlice";
import cartReducer from "./Slices/cartSlice";
import coursereducer from "./Slices/courseSlice.js";
import viewCourseReducer from "./Slices/viewCourseSlice";
import resultReducer from "./Slices/ResultSlice.js";
import categoryReducer from './Slices/categorySlice.js';

const rootReducer = combineReducers(
    {
        auth : authReducer,
        profile : profileReducer,
        cart : cartReducer,
        course : coursereducer, 
        viewCourse : viewCourseReducer,
        result : resultReducer,
        category : categoryReducer
    }
   
)

export default rootReducer;