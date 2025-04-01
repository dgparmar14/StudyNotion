import React from 'react'
import { apiConnector } from '../apiConnector'
import {categoryEndpoint, quizEndPoint} from '../apis'

import { useDispatch } from 'react-redux';
import { setLoading } from '../../Reducer/Slices/authSlice';


const {
   CREATE_CATEGORY_API,
   GET_CATEGORY_COURSE_DETAILS,
   ADD_CATEGORY_REQUEST_API,
   UPDATE_CATEGORY_REQUEST_API,
   GET_CATEGORY_REQUEST_API,
   DELETE_CATEGORY_REQUEST_API,
   GET_CATEGORY_CREATED_BY_USER_API,
   REQUEST_FOR_ADMIN,
} = categoryEndpoint;

const {GET_QUIZ_API} = quizEndPoint


const dispatch = useDispatch();

export default async function CreateCategory(categoryName, token) {
  try{
      dispatch(setLoading(true))
      const response = await apiConnector("POST", CREATE_CATEGORY_API, {categoryName}, {Authorization : `Bearer${token}`})
      if(!response.data.success){
         throw new Error(response.data.message)
      } 
  }
  catch(error){
      console.log("Error occured while creating couese ", error.message)
  }
  dispatch(setLoading(true));
  return res.data;
}

export default async function GetCategoryCourseDetails(categoryId, token) {
   try{
       dispatch(setLoading(true))
       const response = await apiConnector("GET", GET_CATEGORY_COURSE_DETAILS, {categoryId}, {Authorization : `Bearer${token}`})
       if(!response.data.success){
          throw new Error(response.data.message)
       } 
   }
   catch(error){
       console.log("Error occured while creating couese ", error.message)
   }
   dispatch(setLoading(true));
   return res.data;
 }


 export default async function GetQuiz(categoryId, token) {
   try{
       dispatch(setLoading(true))
       const response = await apiConnector("GET", GET_QUIZ_API, {categoryId}, {Authorization : `Bearer${token}`})
       if(!response.data.success){
          throw new Error(response.data.message)
       } 
   }
   catch(error){
       console.log("Error occured while creating couese ", error.message)
   }
   dispatch(setLoading(true));
   return res.data;
 }
