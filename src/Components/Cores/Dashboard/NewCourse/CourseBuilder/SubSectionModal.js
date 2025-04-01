import React from 'react'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux';
import { updateSubSection } from '../../../../../Services/Operations/CourseAPI';
import { setCourse } from '../../../../../Reducer/Slices/courseSlice';

import { createSubSection } from "../../../../../Services/Operations/CourseAPI"
import { Toast, toast } from 'react-hot-toast';
import {RxCross1} from "react-icons/rx"
import Upload from '../../../../Common/Upload';
import { FaCommentDollar } from 'react-icons/fa';

function SubSectionModal({
    modalData,
    setModal,
    add,
    view,
    edit
}) 


{
 
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState:{errors},
  } = useForm();
 
  const {token} = useSelector((state) => state.auth);
  const {course} = useSelector( (state) => state.course);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect( ()=>{
    if(view || edit){
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideoUrl", modalData.videoFile);
    }
  }, [])

  function isFormUpdated(){
    const currentValues = getValues();
    console.log("Modal data : ", modalData);
    console.log("Current Values : ", currentValues)

    if(currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideourl!== modalData.videoFile){
        return true;
    }
    return false;
  }

  async function handleEditSubSection(){
    setLoading(true);
    const currentValues = getValues();
    const formData = new FormData();
    const subSectionId = modalData._id
    formData.append("sectionId", modalData.sectionId);
    formData.append("subsectionId", subSectionId);

    if(currentValues.lectureTitle !== modalData.title){
      formData.append("title", currentValues.lectureTitle);
    }
    if(currentValues.lectureDesc !== modalData.description){
      formData.append("description", currentValues.lectureDesc);
    }
    if(currentValues.lectureVideourl !== modalData.videoFile){
      formData.append("videoFile", currentValues.lectureVideourl);
    }

    let result;

    try{
      result = await updateSubSection(formData, token);
      
      console.log("Printing result after updating subsection : ", result);

    }catch(error){
      console.error(error);
      toast.error("Could not update sub section");
    }

    if(result){
      if (result) {
        const updatedCourseContent = course.courceContent.map((section) => {
            if (section._id === modalData.sectionId) {
              return {
                ...section,
                subSections: section.subSection.map((subSec) => 
                  subSec._id === result._id ? result : subSec
                )
              };
            }
            return section;
        });
    
        const updatedCourse = { ...course, courceContent: updatedCourseContent };
        console.log("Updated course:", updatedCourse);
        dispatch(setCourse(updatedCourse));
    }
    
    }
    setLoading(false);
    setModal(null);
  }

   async function submitHandler(data){
    console.log("here");
    setLoading(true);
    if(view){
      console.log("here");
      return
    }

    if(edit){
      console.log("here");
      if(!isFormUpdated){
        console.log("here");
        return
      }
      else{
        console.log("here");
        handleEditSubSection();
        return;
      }
    }


    const formData = new FormData();
    
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("videoFile", data.lectureVideourl);
    formData.append("sectionId", modalData._id);
    console.log("Printing videoUrl", JSON.stringify(data.lectureVideourl));
    console.log("Printing Form data",typeof(formData.sectionId));
    
    let result;

    try{
      result = await createSubSection(formData, token);

      console.log("Printing result after creating subSection", result);

    }catch(error){
      console.error(error);
      toast.error("Could not create subsection")
    }

    if(result){
      if (result) {
        const updatedCourseContent = course.courceContent.map((section) => {
            if (section._id === modalData.sectionId) {
                return {
                  ...section,
                  subSections: [...section.subSection, result]
                };
            }
            return section;
        });
    
        const updatedCourse = { ...course, courceContent: updatedCourseContent };
        console.log("Updated course:", updatedCourse);
        dispatch(setCourse(updatedCourse));
    }
    
    }
    setLoading(false);
    setModal(null);
    
  }

 
  return (
    <div className="fixed  inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        <div className='flex justify-between px-8 items-center bg-richblack-700 py-2'>
          <p className='text-[15px] font-[650] text-richblack-5'>{view && "Viewing"} {add && "Adding"} {edit && "editting"}</p>
          <button onClick={() => (!loading ? setModal(null) : {})} className='text-[15px] text-richblack-5 font-[650]'><RxCross1></RxCross1></button>
        </div>


        <div className='px-8 py-2'>
            <form  onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-4'>
              <Upload 
                      name="lectureVideourl"
                      label="Lecture Video"
                      register={register}
                      errors={errors}
                      getValues={getValues}
                      setValue={setValue}
                      video={true}
                      viewData={view ? modalData.videoUrl : null}
                      editData={edit ? modalData.videoUrl : null}
                      className="mx-4"></Upload>

              <div className='flex gap-2 flex-col'>
                <label htmlFor='lectureTitle' className='text-[15px] text-richblack-5'>Lecture Title<sup className='text-pink-200'>*</sup></label>
                <input name='lectureTitle'
                        id='lectureTitle'
                        placeholder="Enter lecture title"
                        {...register("lectureTitle", {required:true})}
                        className='px-4 py-2 text-[14px] text-richblack-5 bg-richblack-700 rounded-md shadow-sm shadow-richblack-600'></input>
                {
                  errors.lectureTitle && (
                    <span className='text-pink-200'>Lecture title is required <sup className='text-pink-200'>**</sup></span>
                  )
                }
              </div>
              <div className='flex gap-2 flex-col'>
                <label htmlFor='lectureDesc' className='text-[15px] text-richblack-5'>Lecture Discription <sup className='text-pink-200'>*</sup></label>
                <input name='lectureDesc'
                        id='lectureDesc'
                        placeholder="Enter lecture description"
                        {...register("lectureDesc", {required:true})}
                        className='px-4 py-2 text-[14px] text-richblack-5 bg-richblack-700 rounded-md shadow-sm shadow-richblack-600'></input>
                {
                  errors.lectureDesc && (
                    <span className='text-pink-200'>Lecture description is required <sup className='text-pink-200'>**</sup></span>
                  )
                }
              </div>
              
              <div className="flex justify-end">
                  <button disabled={loading} className='px-4 py-1 text-richblack-900 bg-yellow-200 rounded-md mt-4 mb-4'>
                    
                    {loading ? "Loading.." : edit ? "Save Changes" : "Save"}
                    </button>
                </div>
              
            </form>
        </div>
        
      </div>
    </div>
  )
}

export default SubSectionModal