import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux'
import {getInsructorCourses} from "../../../../Services/Operations/CourseAPI";
import {IoAddCircleOutline} from "react-icons/io5"
import CourseCards from "./CourseCards"
import { useNavigate } from 'react-router-dom';
function MyCourses() {
  const [myCourses, setMyCourses] = useState(null);
  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);
  const navigate = useNavigate();
  
  
  async function  getAllInstructorCourses(id){
    try{
      // console.log("Printing id : ", id);
      const responce = await getInsructorCourses(token);
      // console.log("Printing all the courses of an instructor : ", responce);
      setMyCourses(responce);

      }catch(error){
      console.error(error);
    }
  }
  // console.log(typeof(myCourses), myCourses);
  useEffect(()=> {
    getAllInstructorCourses(user._id);
  }, []);

  return (
    <div>
        <div className='flex justify-between gap-1 items-center'>
          <p className='text-3xl font-semibold text-richblack-5'>My Courses</p>
          <div>
          <button onClick={()=>{navigate("/dashboard/add-course")}} className='px-4 py-2 bg-yellow-200 flex gap-1 items-center rounded-md text-[14px] justify-center font-[600] text-richblack-900'>
            <IoAddCircleOutline className='font-semibold'></IoAddCircleOutline>
            New
          </button>

          </div>          
        </div>
        <div>
          {
            //jugad in mycourses!==null resolve it
            myCourses!==null ? (<div>
              <CourseCards courses={myCourses} setMyCourses={setMyCourses} className="w-full"></CourseCards>
            </div>) : (
              <div>
                <p className='text-[16px] font-[500] text-richblack-5'>You do not created any course yet</p>
              </div>
            )
          }
        </div>
    </div>
  )
}

export default MyCourses















