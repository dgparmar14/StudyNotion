import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaRegUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'
import { resetCourseState, setStep } from '../../../../Reducer/Slices/courseSlice';
import { COURSE_STATUS } from '../../../../Utils/Constants';
import { useNavigate } from 'react-router-dom';
import { editCourseDetails } from '../../../../Services/Operations/CourseAPI';

function Publish() {
  const {
    register,
    getValues,
    setValue,
    formState : {errors},
    handleSubmit
  } = useForm();

  useEffect(()=>{
    if(course?.status===COURSE_STATUS.PUBLISHED){
      setValue("public", true);
    }
  },[]);

  const {course} = useSelector((state) => state.course);
  const {token} = useSelector( (state)=>state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  function back(){
    console.log('back function is called')
    dispatch(setStep(2));
  }

  function gotoCourses(){
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses");
  }

  async function handleCourseSet(){
    const currentValues = getValues();
    if((course?.status===COURSE_STATUS.PUBLISHED && currentValues.public===true) || (course?.status===COURSE_STATUS.DRAFT && currentValues.public===false) ){
      gotoCourses();
    }

    const formData = new FormData();
    formData.append("courseId", course._id);
    const coursestatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
    formData.append("status", coursestatus);
    console.log("Printing form data", formData);

    setLoading(true);

    const result = await editCourseDetails(formData, token);

    if(result){
      gotoCourses();
    }

    setLoading(false);

  }


  function onSubmitHandler(){
    console.log("On Submit function is called");
    handleCourseSet();
  }


  return (
    <div className='flex flex-col gap-4'>
      <div className='bg-richblack-800 border border-richblack-400 gap-3 px-7 py-4 rounded-md'>
          <p className='text-[18px] text-richblack-5 font-semibold'>
            Publish Setting
          </p>
          <form onSubmit={handleSubmit(onSubmitHandler)} className='flex flex-col mt-2'>
            <div className='flex gap-2 items-center text-[14px]'>
              <label htmlFor='public'></label>
              <input
                      type='checkbox'
                      id='public'
                      {...register("public")}
                      className='checked:bg-yellow-200  bg-transparent border-2 border-richblack-500 h-4 w-4 rounded-sm'></input>
              <span className='text-richblack-200 text-[14px]'>Make this course as public</span>
            </div>
            
          </form>
        </div>
        <div className='flex gap-4 self-end mt-5'>
              <button onClick={back} className='px-4 py-2 text-richblack-5 rounded-md bg-richblack-900 shadow-sm shadow-richblack-600 cursor-pointer'>Back</button>
              <button onClick={onSubmitHandler} className='px-4 py-2 text-richblack-900 rounded-md bg-yellow-200 cursor-pointer'>Save Changes</button>
        </div>
    </div>

  )
}

export default Publish