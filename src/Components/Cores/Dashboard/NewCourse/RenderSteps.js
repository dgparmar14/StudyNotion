import React from 'react'
import { useSelector } from 'react-redux'
import {IoMdCheckmark} from "react-icons/io"
import CourseInformation from './CourseInformation/CourseInformation'
import CourseBuilder from './CourseBuilder/CourseBuilder'
import EnrolledCourses from '../EnrolledCourses'
import Publish from './Publish'
import QuizDetails from './QuizInformation/QuizDetails'

const steps = [
    {
        id : 1,
        title : "Course Information",
    },
    {
        id : 2,
        title : "Course Bulider",
    },
    {
        id : 3,
        title : "Add Quiz",
    },
    {
        id : 4,
        title : "Publish",
    }
]

function RenderSteps() {
    const {step} = useSelector((state) => state.course);
  return (
    <div className='flex flex-col gap-5'>
        <div className='gap-0 hidden md:flex justify-center items-center w-[700px]'>
            {
                steps.map((item, index) => {
                    return(
                        <div className='flex flex-col gap-1 w-full'>
                            <div key={index} className='flex w-full gap-0 justify-center items-center'>
                                <div className={`${item.id==step ? "bg-yellow-800 text-yellow-50 border border-yellow-50" : "text-richblack-200 border border-richblack-200 bg-richblack-800"} ${item.id<step && "bg-yellow-50 text-richblack-900"} aspect-square content-center rounded-full flex justify-center items-center px-2 text-[18px] text-center`}>
                                {
                                    item.id<step ? (<IoMdCheckmark className='text-[15px]'></IoMdCheckmark>) : (<div>{item.id}</div>)
                                }
                                </div>
                                <div className={`${item.id!==steps.length? "border stepsBorder h-[1px]":""} ${item.id<step ? "bg-yellow-50" : "bg-richblack-200"} w-full`}></div>
                            </div>
                            <div>
                                <p className={`${item.id===step ? "text-yellow-50" : "text-richblack-600"} text-[15px] font-[400]`}>
                                    {
                                        item.title
                                    }
                                </p>
                            </div>
                        </div>

                        
                    )
                })
            }
        </div>
       
        <div>
            {step===1 && <CourseInformation></CourseInformation>}
            {step===2 && <CourseBuilder></CourseBuilder>}
            {step===3 && <QuizDetails></QuizDetails>}
            {step===4 && <Publish></Publish>}
        </div>

    </div>
  )
}

export default RenderSteps