import React, { useState } from 'react'
import {HomePageExplore} from "../../../data/homepage-explore"
import HilightedText from './Highlighted';
import CourseDetailsHomePage from './CourseDetailsHomePage';
const tabs = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Carear paths"
]

function CourseCards() {
   
    const [currentTab, setCurrentTab] = useState(tabs[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCourse, setCurrentCourse] = useState(HomePageExplore[0].courses[0].heading);
    
    const setMyValues = (Value)=>{
        setCurrentTab(Value);
        const result = HomePageExplore.filter( (course) => course.tag === Value);
       
        setCourses(result[0].courses);
        setCurrentCourse(result[0].courses[0].heading);
    }
  return (
    <div className='mt-24 relative mb-[850px] lg:mb-48 flex flex-col gap-5 justify-center items-center'>
        <div className='text-3xl text-center font-semibold'>
            <p>Unlock the 
            <HilightedText text={"Power of Code"}></HilightedText>
            </p>
        </div>
        <div className='text-[16px] -mt-2 text-richblack-300 text-center'>
            <p>Learn and build anything ou can imagine</p>
        </div>

        <div className='flex gap-1 rounded-full mt-1 text-richblack-200 bg-richblack-800 px-3 transition-all duration-200 py-1'>
            {
               
                tabs.map( (tab, index) => {
                    
                    return (
                        <div key={index} className={`rounded-full hidden md:block px-5 py-1 ${currentTab === tab ? "bg-richblack-900 text-richblack-50"  : "text-richblack-200"} 
                        cursor-pointer transition-all duration-200 hover:bg-richblack-900 hover:text-richblack-50`}
                        onClick={()=>setMyValues(tab)}>
                        {
                            tab
                        }
                        </div>
                    )
                })
            }
        </div>

        <div className='flex flex-col lg:flex-row absolute top-[12rem] justify-between items-center mx-auto gap-[2.5rem] -mt-8 lg:mt-7'>
            {
                courses.map( (course, index) => {
                    return(
                        <div key={index}>
                            <CourseDetailsHomePage course={course} currentCourse={currentCourse}></CourseDetailsHomePage>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default CourseCards