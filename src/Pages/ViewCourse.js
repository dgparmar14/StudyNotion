import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import VideoSideBar from '../Components/Cores/ViewCourse/VideoSideBar';
import CourseReviewModal from '../Components/Cores/ViewCourse/CourseReviewModal';
import { useDispatch, useSelector } from 'react-redux';
import { getFullDetailsOfCourse } from '../Services/Operations/CourseAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../Reducer/Slices/viewCourseSlice';

function ViewCourse() {
    const [reviewModal, setReviewModal] = useState(null);
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const {courseId} = useParams();

    useEffect(()=>{
        async function getFullDetails(){
            try{
                const res = await getFullDetailsOfCourse(courseId, token);
                console.log("PRINTING FULL COURSE DETAILS IN FUNCTION CALL : ", res);
                dispatch(setCourseSectionData(res.data.data.courseDetails.courceContent));
                dispatch(setEntireCourseData(res.data.data.courseDetails));
                dispatch(setCompletedLectures(res.data.data.completedVideos));

                let lectures = 0;
                res.data.data.courseDetails.courceContent.forEach((sections)=>{
                    lectures += sections.subSections.length;
                })

                dispatch(setTotalNoOfLectures(lectures));
            }
            catch(error){
                console.error("ERROR OCCURED IN VIEW COURSE BACKENF=D CALL : ",  error);
            }
        }
        getFullDetails();
    }, []);

  return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
        <VideoSideBar setReviewModal={setReviewModal} className="relative flex min-h-[calc(100vh-3.5rem)]"></VideoSideBar>
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
            <div className="mx-auto w-11/12 max-w-[1000px] py-10">
                <Outlet></Outlet>
            </div>
        </div>
        {
            reviewModal && <CourseReviewModal setReviewModal={setReviewModal}></CourseReviewModal>
        }
    </div>
  )
}

export default ViewCourse