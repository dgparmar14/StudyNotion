import React from 'react'
import {HiUsers} from "react-icons/hi"
import {FcFlowChart}from "react-icons/fc"
function CourseDetailsHomePage({course, currentCourse}) {
  return (
    <div className={`flex flex-col gap-3 w-[300px] h-[300px] mb-4 pb-4 justify-between lg:h-[280px] lg:w-[280px] aspect-square ${course.heading==currentCourse ? "bg-white text cardShadow" : "bg-richblack-800"}`}>
    <div className='flex flex-col gap-3 border-b-2 h-[85%] border-dashed border-[#DBDDEA] py-4'>
        <p className={`text-[1.25rem] mx-4 font-bold ${course.heading==currentCourse ? "text-[#161D29]" : "text-richblack-25"}`}>{
          course.heading
        }
      </p>

      <div className={`text-[16px] mx-4 mb-2 ${course.heading==currentCourse ? "text-richblack-500" : "text-richblack-400"}`}>{
          course.description
        }
      </div>


    </div>
     
      <div className={`flex h-[10%] justify-between items-center -mt-5 px-4 ${course.heading==currentCourse ? "text-blue-500" : "text-[#838894]"}`}>

        <div className='flex gap-1 justify-center items-center'>
          <HiUsers className='text-xl'></HiUsers>
          <div>
          {
            course.level
          }
          </div>
        </div>

        <div className='flex gap-1 justify-center items-center'>
          <FcFlowChart></FcFlowChart>
          <div>
            {
              course.lessionNumber
            }
          </div>
        </div>
        
      </div>

    </div>
  )
}

export default CourseDetailsHomePage