import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getAverageRating} from '../../../../Services/Operations/CourseAPI';
import ReactStars from 'react-stars';
import {BiStar} from "react-icons/bi"
import {RiDeleteBin6Line} from "react-icons/ri"
import {removeItem} from "../../../../Reducer/Slices/cartSlice.jsx"
import { averageRating } from '../../../../Services/AverageRating';

function RenderItems() {
    const {cart} = useSelector((state) => state.cart);
    const dispatch = useDispatch();
   
    function getaverageRating(course){
      const average = averageRating(course.ratingAndReviews);
      return average
    }

    //console.log("Course printing : ", cart.course);
  
  return (
    <div className='w-8/12'>
       
        {
            cart.map((course,index)  => {
                //getaverageRating(course);
                //console.log("Printing course", course)
                return(
                  
                    <div key={index} className={`${index===cart.length-1 ? "border-b border-b-richblack-400" : ""} border-b border-b-richblack-400 py-7 mt-2 gap-4 flex flex-wrap flex-row`}> 
                        <img src={course?.thumbNail} className='w-[200px] h-[150px] rounded-md'></img>
                        <div className='flex flex-col gap-1'>
                            <div className='text-richblack-5 fomt-[500] text-[17px]'>{course?.courceName}</div>
                            <div className='text-[14px] text-richblack-50'>{course?.catagory[0]?.name}</div>
                            
                            <div className='flex flex-row gap-2 items-center text-richblack-5'>
                                <span className='text-yellow-200 text-[14px]'>{getaverageRating(course)}</span>
                                <ReactStars
                                    count={5}
                                    size={20}
                                    edit={false}
                                    activeColor="#ffd700"
                                    emptyIcon={<BiStar></BiStar>}
                                    fullIcon={<BiStar></BiStar>} className='flex'>
                                </ReactStars>
                                <span  className='text-yellow-200 text-[14px]'>{course.ratingAndReviews?.length}</span>
                            </div>
                            <div className='text-richblack-50 text-[15px] flex gap-6'>
                                <p className='text-richblack-100'>Total Courses</p>
                                <ul className=' text-richblack-100 list-disc flex gap-5'>
                                    <li>Lesson</li>
                                    <li>Beginner</li>
                                </ul>
                            </div>

                        </div>
                        <div className='flex flex-col gap-3 ml-auto'>
                            <button onClick={()=>dispatch(removeItem(course._id))} className='flex gap-1 justify-center items-center px-4 py-2 bg-richblack-800 rounded-md border w-fit border-richblack-700 text-[16px] text-pink-200'>
                            <RiDeleteBin6Line/>
                            Remove</button>
                            <p className='text-[18px] font-[550] text-yellow-200 '>Rs. {course.price}</p>
                        </div>
                    </div>
                )
            })
        }

    </div>
  )
}

export default RenderItems