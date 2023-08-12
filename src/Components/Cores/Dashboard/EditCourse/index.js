import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import RenderSteps from '../NewCourse/RenderSteps';
import { setCourse, setEditCourse } from '../../../../Reducer/Slices/courseSlice';
import { getFullDetailsOfCourse } from '../../../../Services/Operations/CourseAPI';

function EditCourse() {
    let {courseId} = useParams();
    const {token} = useSelector((state)=>state.auth);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const {course} = useSelector((state)=>state.course);

    useEffect(()=>{
        const getFullCourseDetails = async(req, res)=>{
            
            console.log("Printing courseId", courseId);
            setLoading(true);
            const result = await getFullDetailsOfCourse(courseId, token);
            console.log("Printing course detals : ", result);

            if(result){
                console.log("here");
                dispatch(setEditCourse(true));
                dispatch(setCourse(result.data.data.courseDetails));
            }
            setLoading(false);
        }
        getFullCourseDetails();
    }, [])

    if(loading){
        return(
            <div>
                Loadig
            </div>
        )
    }

  return (
    <div>
        <p>Edit Course</p>
        <div className='text-richblack-5'>
            {
                course ? <RenderSteps></RenderSteps> : (<div>Course Not Found</div>)
            }
        </div>
    </div>
  )
}

export default EditCourse