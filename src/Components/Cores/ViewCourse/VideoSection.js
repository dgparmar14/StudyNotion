import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { markLectureAsComplete } from '../../../Services/Operations/CourseAPI';
import { setCompletedLectures } from '../../../Reducer/Slices/viewCourseSlice';
import 'video-react/dist/video-react.css'; 
import { Player } from 'video-react';
import {BsYoutube} from "react-icons/bs"



function VideoSection() {
    const {token} = useSelector((state)=>state.auth);
    const {courseId, sectionId, subSectionId} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [videoData, setVideoData] = useState();
    const [videoEnded, setVideoEnded] = useState(false);

    const {
        courseSectionData,
        courseEntireData,
        completedLectures
    } = useSelector((state)=>state.viewCourse);

    console.log("Printing completed lecturers data : ", completedLectures);

    
    const [loading, setLoading] = useState(false);
    const playRef = useRef();

    //console.log("PRINTNG COURSE SECTION DATA " , courseSectionData);

    useEffect(()=>{
        const setVideoSpecificDetails = async()=>{
            setLoading(true);
            if(!courseSectionData.length){
                return
            }

            if(!courseId && !sectionId && !subSectionId){
                navigate("/dashboard/enrolled-courses");
                return;
            }
            else{
                const currentsection = courseSectionData.filter((data)=>
                    data._id === sectionId
                );

                const currentSubSection = currentsection[0].subSections.filter((data)=>
                    data._id === subSectionId
                );

                setVideoData(currentSubSection[0]);
                //console.log("Printng video Data : ", videoData);
                setVideoEnded(false);
            }
            setLoading(false);
        };
        setVideoSpecificDetails();
    }, [courseSectionData, courseEntireData, location.pathname]);


    function isFirstVideo(){
        const currentSectionIndex = courseSectionData.findIndex((section)=>
            section._id === sectionId
        );

        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSections.findIndex((subSection)=>
            subSection._id === subSectionId
        );

        // console.log("Printing section index and subsection index in isFirstVideo : ", currentSectionIndex, currentSubSectionIndex)

        if(currentSectionIndex === 0 && currentSubSectionIndex === 0 ){
            return true;
        }

        else{
            return false;
        }
    }

    function isLastVideo(){
        const currentSectionIndex = courseSectionData.findIndex((section)=>
            section._id === sectionId
        );

        const totalNoOfSubSections = courseSectionData[currentSectionIndex].subSections.length;

        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSections.findIndex((subSection)=>
            subSection._id === subSectionId
        );

        // console.log("Printing section index and subsection index in isLastVideo : ", currentSectionIndex, currentSubSectionIndex)
        if(currentSectionIndex === courseSectionData.length-1 && currentSubSectionIndex === totalNoOfSubSections-1 ){
            return true;
        }

        else{
            return false;
        }
        
    }

    function goToNextVideo(){
        const currentSectionIndex = courseSectionData.findIndex((section)=>
            section._id === sectionId
        );

        const totalNoOfSubSections = courseSectionData[currentSectionIndex].subSections.length;

        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSections.findIndex((subSection)=>
            subSection._id === subSectionId
        );

        if(currentSectionIndex !== totalNoOfSubSections-1){
            const nextSubSectionId = courseSectionData[currentSectionIndex].subSections[currentSubSectionIndex + 1]._id;

            const currentSectionId = courseSectionData[currentSectionIndex]._id;

            navigate(`/view-course/${courseId}/section/${currentSectionId}/sub-section/${nextSubSectionId}`)
            
        }
        else{
            const nextSubSectionId = currentSectionIndex[currentSectionIndex + 1].subSections[0]._id;
            const nextSectionId = courseSectionData[currentSectionIndex+1]._id; 
            navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
        }

    }

    function goToPreviousVideo(){
        const currentSectionIndex = courseSectionData.findIndex((section)=>
            section._id === sectionId
        );

        const totalNoOfSubSections = courseSectionData[currentSectionIndex].subSections.length;

        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSections.findIndex((subSection)=>
            subSection._id === subSectionId
        );

        if(currentSubSectionIndex !== 0){
            const prevSubSectionId = courseSectionData[currentSectionIndex].subSections[currentSubSectionIndex - 1]._id;

            const currentSectionId = courseSectionData[currentSectionIndex]._id;

            navigate(`/view-course/${courseId}/section/${currentSectionId}/sub-section/${prevSubSectionId}`)
            
        }
        else{
            const prevSectionId = courseSectionData[currentSectionIndex-1]._id; 
            const subSectionLength = courseSectionData[currentSectionIndex-1].subSections.length;
            const prevSubSectionIndex = currentSectionIndex[currentSectionIndex - 1].subSections[subSectionLength-1]._id;
           
            navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionIndex}`)
        }

    }

    const handleLectureCompletion = async()=>{
        setLoading(true);
        const res = await markLectureAsComplete({courseId : courseId, subSectionId : subSectionId}, token);
        if(res){
            dispatch(setCompletedLectures(subSectionId));
        }
        setLoading(false);
    }
  return (
    <div className='flex flex-col gap-4'>
        <div>
            {
                !videoData ? (<div>No Lecture Found</div>) : (
                    <div className="relative">
                        <Player ref={playRef}
                                aspectRatio='16:9'
                                playsInline
                                onEnded={()=>setVideoEnded(true)}
                                src={videoData.videoUrl}
                                className="z-0 rounded-md px-4 py-2"
                                >
                                   
                                </Player>
                                <div className='z-[1000] self-center absolute top-[40%] right-[45%]'>
                                    {
                                        videoEnded && (
                                            <div className='flex flex-col gap-4'>
                                                <div className='flex gap-2'>
                                                    {
                                                        (completedLectures==null || !completedLectures.includes(subSectionId)) && (
                                                            <button onClick={()=>handleLectureCompletion()} className='text-richblack-900 px-4 py-1 rounded-md bg-yellow-200'>{!loading ? "Mark As Completed" : "Loading..."}</button>
                                                        )
                                                    }
                                                    {
                                                        <button disabled={loading} onClick={()=>{
                                                            if(playRef?.current){
                                                                playRef.current.seek(0);
                                                                setVideoEnded(false);
                                                            }
                                                        }} className='text-richblack-5 bg-richblack-800 rounded-md px-4 py-1'>Rewatch</button>
                                                    }
                                                </div>

                                                <div className='flex gap-2'>
                                                    {
                                                        !isFirstVideo() && (
                                                            <button disabled={loading} onClick={()=>goToPreviousVideo()} className='text-richblack-900 px-4 py-1 rounded-md bg-yellow-200'>Prev</button>
                                                        )
                                                    }
                                                    {
                                                        !isLastVideo() && (
                                                            <button disabled={loading} onClick={()=>goToNextVideo()} className='text-richblack-5 bg-richblack-800 rounded-md px-4 py-1'>Next</button>
                                                        )
                                                    }
                                                </div>
                                            </div>      
                                            
                                        )
                                    }
                                    </div>

                    </div>
                )
            }
        </div>
        {
            videoData && (
                <div disabled={loading} className='flex flex-col gap-2'>
                    <p className='text-richblack-50 text-2xl font-semibold'>{videoData.title}</p>
                    <p className='text-[14px] text-richblack-100'>{videoData.description}</p>
                </div>

            )
        }
       
    </div>
  )
}

export default VideoSection