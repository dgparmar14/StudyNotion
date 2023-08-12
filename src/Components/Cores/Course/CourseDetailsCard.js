import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../../Reducer/Slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import {BsCaretRightFill} from "react-icons/bs";
import {FaShareSquare} from "react-icons/fa"
import { toast } from 'react-hot-toast';
import copy from 'copy-to-clipboard';
import { ACCOUNT_TYPE } from '../../../Utils/Constants';


function CourseDetailsCard({course, setConfirmationModal, handleSubmit}) {

    
    const dispatch = useDispatch();
    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth)
    const navigate = useNavigate();

    function handleOnShare(){
        copy(window.location.href);
        toast.success("Link Copied to Clipboard")
    }

    function handleAddToCart(){
        if(user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("You are an instructor, you can't buy course");
            return
        }
        if(token){
            dispatch(addToCart(course));
            return
        }
        setConfirmationModal({
            text1 : "You are not logged in yet",
            text2 : "Please log in to buy a course",
            button1Text: "Login",
            button2Text: "Cancel",
            button1Handler: () => {navigate("/login")},
            button2Handler: () => {setConfirmationModal(null)}

        })

    }

    
  return (

    <div className='sm:w-[300px] mx-7 sm:mx-0 scroll-mb-52 scroll-me-32 px-4 py-4 bg-richblack-700 rounded-sm md:absolute right-[8rem] top-7'>
        <div>
            <img src={course.thumbNail} alt='This is course image' className='rounded-sm h-[175px] w-full'></img>
        </div>
        <div className='flex flex-col gap-2 mt-4'>
            <p className='text-[24px] font-semibold text-richblack-5'>{`Rs. ${course.price}`}</p>
            {
                user && course.studentsEnrolled.includes(user._id) ? (
                    <button onClick={()=>navigate("/dashboard/enrolled-courses")} className='text-richblack-900 mt-1 bg-yellow-200 px-4 py-2 rounded-md transition-all duration-200 hover:scale-95'>Go to Course</button>
                ) : (
                    <button onClick={handleSubmit} className='text-richblack-900 bg-yellow-200 mt-1 px-4 py-2 rounded-md transition-all duration-200 hover:scale-95'>Buy Now</button>
                )
            }
           {
                !course?.studentsEnrolled.includes(user._id) &&
                <button onClick={handleAddToCart} className='text-richblack-5 bg-richblack-900 rounded-md px-4 mt-1 py-2 shadow-md shadow-richblack-600 transition-all duration-200 hover:scale-95'>Add to Cart</button>
           }
           <p className='text-richblack-50 text-center text-[14px] mt-2'>30-Day Money-Back Gurentee</p>
            <p className='text-richblack-5 text-[14px] mt-1'>This Course Includes : </p>
            <div className='flex flex-col gap-1 text-caribbeangreen-300 -mt-1'>
                {
                    course.instructions.map((instruction, index) => (
                        <div className='flex gap-2 items-center' key={index}>
                            <BsCaretRightFill className='text-[14px]'></BsCaretRightFill>
                            <p className='text[14px]'>{instruction}</p>
                        </div>
                    ))
                }
            </div>
            <div className='flex items-center justify-center'>
                <button onClick={handleOnShare} className='flex gap-2 items-center text-[16px] text-yellow-200'>
                    <FaShareSquare></FaShareSquare>
                    Share
                </button>
            </div>
            
        </div>
    </div>
  )
}

export default CourseDetailsCard