import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {IoAddCircleOutline} from "react-icons/io5"
import { useDispatch, useSelector } from 'react-redux';
import NestedView from './NestedView';
import {MdOutlineNavigateNext} from "react-icons/md"
import { setCourse, setEditCourse, setStep } from '../../../../../Reducer/Slices/courseSlice';
import { toast } from 'react-hot-toast';
import { updateSection, createSection } from "../../../../../Services/Operations/CourseAPI"

function CourseBuilder() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState:{errors},
} = useForm();


  const [editSectionname, setEditSectionName] = useState(false);
  const {course} = useSelector((state)=>state.course);
  const [loading, setLoading] = useState(false);
  const {token} = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("UPDATED");
  }, [course])
  

  function cancelEdit(){
    setEditSectionName(false);
    setValue("sectionName", "");
  }

  function goBack(){
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }
  function goNext(){
    if(course.courceContent.length==0){
      toast.error("Atleast add one section to the course");
      return
    }
    if(course.courceContent.some((section) => section.subSections.length===0)){
      toast.error("Atleast add one lecture to your course");
      return
    }
    dispatch(setStep(3));

  }

  function handleChangeEdit(sectionId, sectionName){
    console.log("Printing edit section name : ", editSectionname);
    if(editSectionname === sectionId){
      cancelEdit();
      return
    }
    else{
      setEditSectionName(sectionId);
      setValue("sectionName", sectionName)
    }

  }
  async function onSubmitHandler(data){
    setLoading(false);
    let result;
    console.log("Here....");
    if(editSectionname){ 
      console.log("Priting edit section name : ", editSectionname);  
      const coid = course._id;
      result = await updateSection(
        {
          sectionName : data.sectionName,
          sectionId : editSectionname,
          coid}, token);
          console.log("Wrinting result",result);    
    }

    else{
      console.log("Printing course id : ", course);
      result = await createSection(
        {
          sectionName : data.sectionName,
          courceId : course._id
        }, token
      )
    }
   
    if(result){
     
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }
    setLoading(true);


  }


  return (
    <div className='flex px-8 py-4 border border-richblack-400  bg-richblack-800 rounded-md'>
      <div className='flex flex-col gap-3 w-full'>
        <p className='text-3xl font-semibold text-richblack-5'>Course builder</p>
        <form onSubmit={handleSubmit(onSubmitHandler)} className='flex gap-1 flex-col'>

          <div className='flex flex-col gap-1'>
            <label htmlFor='sectionName' className='text-[14px] text-richblack-5'>Section name<sup className='text-pink-200'>*</sup></label>
            <input
                    id='sectionName'
                    placeholder='Enter section name'
                    {...register("sectionName", {required:true})}
                    className='text-[15px] text-richblack-100 px-4 py-2 rounded-md bg-richblack-700 w-full shadow-sm shadow-richblack-400'></input>
            {
              errors.sectionName && (
                <span className='text-pink-200'>Section name is required <sup>**</sup></span>
              )
            }
          </div>

          <div className='flex gap-4 flex-row items-end'>
            <button type='submit'>{
              <div className='flex gap-2 text-[15px] bg-richblack-800 border border-yellow-200 rounded-md px-2 py-1 mt-4 justify-center items-center text-yellow-200'>
                <IoAddCircleOutline></IoAddCircleOutline>
                {
                  editSectionname ? "Edit Section Name" : "Create Section"
                }
              </div>
            }</button>
            {
              editSectionname && (<button onClick={cancelEdit} className='text-richblack-5 text-[14px]'>Cancel Edit</button>)
            }
          </div>

        </form>
       
        <div>
          {
            course.courceContent && (<NestedView handleChangeEdit={handleChangeEdit} className="w-[100%]"></NestedView>)
          }
        </div>
        <div className='flex gap-3 justify-end'>
          <button onClick={goBack} className='text-richblack-900 bg-yellow-200 text-[15px] rounded-md px-2 py-1'>Back</button>
          <button onClick={goNext} className='text-richblack-900 bg-yellow-200 text-[15px] rounded-md px-2 py-1 flex gap-1 justify-center items-center'>Next <MdOutlineNavigateNext></MdOutlineNavigateNext></button>
        </div>
        
      </div>
    </div>
  )
}

export default CourseBuilder