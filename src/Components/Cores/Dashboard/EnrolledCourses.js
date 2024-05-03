import React from 'react'
import { useState } from 'react'
import getEnrolledCourses from "../../../Services/Operations/ProfileAPI"

import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router-dom';


function EnrolledCourses() {
    const [enrolledcourses, setEnrolledCourses] = useState(null);
    const {token}= useSelector((state) => state.auth); 
    const navigate = useNavigate();
    
     async function getAllEnrolledCourses(){
        try{
            const responce = await getEnrolledCourses(token);
       // console.log(responce.cources)
            setEnrolledCourses(responce.cources);

        }catch(error){
            console.log("Error occured in function call for get enrolled courses");
            console.error(error);
        }
    }
    useEffect(()=>{
        getAllEnrolledCourses();
    },[])

  return (
    <div>
    <div className='w-full h-full md:px-4 py-4'>
        {
            !enrolledcourses ? (<div className='loading h-[100%] w-[100%] flex self-center'></div>) : (
                <div className='flex flex-col gap-4 mx-auto my-auto'>
                    <p className='text-3xl font-semibold text-richblack-5'>Enrolled Courses</p>
                    {
                        enrolledcourses.length>0 ? 
                        (<div>
                            <div className='md:flex justify-between hidden bg-richblack-700 text-richblack-5 text-[18px] md:px-5 rounded-t-md py-2'>
                                <p className='w-[55%] '>Course Name</p>
                                <p className='w-[20%]'>Durations</p>
                                <p className='w-[25%]'>progress</p>
                            </div>
                            <div className='flex flex-col justify-between gap-0 border-richblack-700 border-2'>
                                {
                                    enrolledcourses.map((course, index) => {
                                        //console.log("Printing course : ", course);
                                        return(
                                        <div onClick={()=>navigate(`/view-course/${course._id}/section/${course.courceContent[0]?._id}/sub-section/${course.courceContent[0].subSections[0]?._id}`)} key={index} className='flex flex-col md:flex-row border border-b-richblack-600 md:px-5 py-3 items-center'>
                                            <div className='flex flex-wrap gap-4 w-[55%] items-center px-2'>
                                                <img src={course.thumbNail} className='w-[70px] aspect-square rounded-md '></img>
                                                <div className='flex flex-col gap-1'>
                                                    <p className='text-richblack-5 font-semibold text-[15px]'>{course.courceName}</p>
                                                    <p className='text-[15px] text-richblack-200'>{course.description}</p>
                                                </div>
                                            </div>
                                           
                                            <div className='w-[20%] px-2'>
                                                <p className='text-richblack-5 ml-5'>{course.duration}</p>
                                            </div>
                                            <div className='flex flex-col gap-2 px-2  justify-center items-center md:justify-start md:items-start'> 
                                                <p className='text-richblack-200 text-[15px]'>Progress : {course.progressPercentage || 0}%</p>
                                                <ProgressBar
                                                        completed={course.progressPercentage || 0}
                                                        height="8px"
                                                        isLabelVisible={false}
                                                        className='w-[100%] lg:w-[200px]'>
                                                </ProgressBar>
                                            </div>
                                        </div>
                                        )
                                    })
                                }
                            </div>
                        </div>) 
                        : (<div className='text-richblack-25 text-[14px]'>You are not enrolled in any course yet</div>)
                    }
                </div>
            )
        }
    </div>

    </div>
  )
}

export default EnrolledCourses;