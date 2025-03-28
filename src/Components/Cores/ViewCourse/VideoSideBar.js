import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import {IoChevronBack} from "react-icons/io5"
import {SlArrowUp} from "react-icons/sl"

function VideoSideBar({setReviewModal}) {
    const dispatch = useDispatch();
    const {sectionId, subSectionId} = useParams();
    const [activeStatus, setActiveStatus] = useState("");
    const [videoActive, setVideoActive] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures
    } = useSelector((state)=>state.viewCourse);

    console.log("Printing completed course data : ". completedLectures);
   

    useEffect(()=>{
        setLoading(true);
        function setActiveFlag(){
            if(courseSectionData.length==0){
                return
            }

            const currentSectionIndex = courseSectionData.findIndex((data)=>
                data._id === sectionId
            );

            const currentSubSectionIndex= courseSectionData[currentSectionIndex]?.subSections.findIndex((data)=>
                data._id === subSectionId
            )

            const activeSubsectionId = courseSectionData[currentSectionIndex]?.subSections[currentSubSectionIndex]._id;
            console.log("Printing current section data : ", courseSectionData);
            setActiveStatus(courseSectionData[currentSectionIndex]._id);
            setVideoActive(activeSubsectionId);
        }

        setActiveFlag();
        setLoading(false);

    }, [courseSectionData, location.pathname, courseEntireData]);

  return (
    <div className='w-[14rem] py-4 min-h-[calc(1000vh-2rem)] bg-richblack-800'>
        <div className='mt-4 flex flex-col gap-2'>
            <div className='flex justify-between px-3 items-center'>
                <button onClick={()=>{navigate("/dashboard/enrolled-courses")}} className="w-[25px] aspect-square rounded-full flex justify-center items-center bg-richblack-900">
                    <IoChevronBack className="text-richblack-5"></IoChevronBack>
                </button>
                <button onClick={()=>{setReviewModal(true)}} className='px-4 py-1 text-[14px] text-richblack-900 bg-yellow-200 rounded-md'>
                    Add Review
                </button>
            </div>
            <div className='flex justify-between items-center px-3 mt-7 py-2 gap-1'>
                <p className='text-[16px] text-richblack-5 font-[500]'>{courseEntireData.courceName}</p>
                <p className='text-[14px] text-richblack-200'>{(completedLectures && completedLectures.length) || 0} / {totalNoOfLectures}</p>
            </div>
            <div>
                {
                    courseSectionData.map((section, index)=>{
                        return (
                            <div key={index} onClick={()=>{
                                setActiveStatus(section._id)
                            }} className='text-richblack-25 flex flex-col gap-1'>
                                <div className={`flex cursor-pointer justify-between items-center px-3 py-1`}>
                                    <p className='text-[14px]'>{section.title}</p>
                                    <div >
                                        <SlArrowUp className={`${activeStatus === section._id ? "rotate-180" : ""} text-[12px] transition-all duration-200`}></SlArrowUp>
                                    </div>
                                </div>
                                {
                                    activeStatus === section._id && (
                                        <div className='flex flex-col'>
                                            {
                                                section.subSections && section.subSections.map((subSection, index) => {
                                                    return(
                                                        <div key={index} onClick={()=>{navigate(`view-course/${courseEntireData._id}/section/${section._id}/sub-section/${subSection._id}`)
                                                                                                setVideoActive(subSection._id)}} 
                                                         className={`flex gap-2 ${videoActive === subSection._id ? "bg-yellow-200 text-richblack-900" : "bg-richblack-900 text-richblack-5"} px-3 text-[14px] text-richblack-50 py-1`}>
                                                            <input 
                                                                    type='checkbox'
                                                                    checked={completedLectures && completedLectures.includes(subSection._id)}
                                                                    disabled={true}
                                                                    >

                                                            </input>
                                                             <div>
                                                                {
                                                                    subSection.title
                                                                }
                                                            </div>

                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        )
                    })
                }
            </div>

        </div>
    </div>
  )
}

export default VideoSideBar