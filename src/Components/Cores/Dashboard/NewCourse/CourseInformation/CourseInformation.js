import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { apiConnector } from '../../../../../Services/apiConnector';
import { catagories } from '../../../../../Services/apis';
import {TbCoinRupee} from "react-icons/tb";
import RequirementField from './RequirementField';
import { setStep } from '../../../../../Reducer/Slices/courseSlice';
import { toast } from 'react-hot-toast';
import { setCourse } from '../../../../../Reducer/Slices/courseSlice';
import { editCourseDetails } from '../../../../../Services/Operations/CourseAPI';
import { addCourseDetails } from '../../../../../Services/Operations/CourseAPI';
import { COURSE_STATUS } from '../../../../../Utils/Constants';
import CourseTagNames from './CourseTagNames';
import Upload from '../../../../Common/Upload';
import CategoryRequestModal from '../../CategoryRequest/CategoryRequestModal';
import { getQuizResult } from '../../../../../Services/Operations/quizApi';
import { Link } from 'react-router-dom';
import { createCategoryRequest } from '../../../../../Services/Operations/Category';

function CourseInformation() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState:{errors},
} = useForm();

  const {token} = useSelector((state)=> state.auth);
  const user = useSelector((state) => state.profile);
  const {course, editCourse} = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCatagories, setCourseCatagoties] = useState([]);
  const [isPass, setIsPass] = useState(false);
  const [createRequestModalOpen, setCreateRequestModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isTakeQuiz, setIsTakeQuiz] = useState(false);
  const [displayMessage, segtDisplayMessage] = useState(false)
  const dispatch = useDispatch();
  const {step} = useSelector((state)=> state.course);
  
  const handleCategoryRequest = async(categoryName) => {
    try{
      const result = await createCategoryRequest(categoryName, token);
      console.log("Careate Category Request api result : ", result);
      if(result.success){
        setIsTakeQuiz(false)
        segtDisplayMessage(true)
        setCreateRequestModalOpen(false)
      }
    }
    catch(error){
      toast.error("Error occured while creating category request")
    }
  }
  const handleCheckResult = async () => {
    if (!selectedCategory) {
      toast.error("Please select a category first!");
      return;
    }
    try {
      const result = await getQuizResult(selectedCategory.quiz, user.user._id, token);
      console.log("Quiz result: ", result);
      
      // Assuming result contains a pass/fail status
      if (result && result.isPassed) {
        setIsPass(true);
      } else {
        setIsPass(false);
        setIsTakeQuiz(true);
        toast.error("You did not pass the quiz.");
      }
    } catch (error) {
      console.error("Error occurred while getting result", error);
    }
  };
  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    const category = courseCatagories.find(cat => cat._id === selectedCategoryId);
    setSelectedCategory(category);
  };
  useEffect(()=>{
    const getCatagories = async()=>{
      setLoading(true);
      try{
        const result = await apiConnector("GET", catagories.CATAGORIES_API);
        console.log("Category data : ", result)
        setCourseCatagoties(result.data.data);

        }catch(error){
            console.error("Could not fetch category list");
            console.log(error.message);
        }
        setLoading(false);
      }
      getCatagories();
      
      if(editCourse){
        setValue("courseTitle", course.courceName);
        setValue("courseShortDesc", course.description);
        setValue("coursePrice", course.price);
        setValue("courseTags", course.tag);
        setValue("courseBenefits", course.whatYouWillLearn);
        setValue("courseCategory", course.catagory);
        setValue("courseRequirements", course.instructions);
        setValue("courseImage", course.thumbNail);
        setIsPass(true)
      }

  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if(currentValues.courseTitle !== course.courceName ||
        currentValues.courseShortDesc !== course.dataescription ||
        currentValues.coursePrice !== course.price ||
        
        currentValues.courseTags.toString() !== course.tag.toString() ||
        currentValues.courseBenefits !== course.whatYouWillLearn ||
        currentValues.courseCategory !== course.catagory ||
        currentValues.courseImage !== course.thumbNail ||
        currentValues.courseRequirements.toString() !== course.instructions.toString() )
        return true;
    else
        return false;
}

//handles next button click 
const onSubmitHandler = async(data) => {
  //debugger
  console.log("inside fun");
  
    if(editCourse) {
        if(isFormUpdated()) {
            const currentValues = getValues();
            const formData = new FormData();

            formData.append("courseId", course._id);
            if(currentValues.courseTitle !== course.courceName) {
                formData.append("courceName", data.courseTitle);
            }

            if(currentValues.courseShortDesc !== course.description) {
                formData.append("description", data.courseShortDesc);
            }

            if(currentValues.coursePrice !== course.price) {
                formData.append("price", data.coursePrice);
            }

            if(currentValues.courseBenefits !== course.whatYouWillLearn) {
                formData.append("whatYouWillLearn", data.courseBenefits);
            }

            if(currentValues.courseCategory !== course.catagory._id) {
                formData.append("catagory", data.courseCategory);
            }

            if(currentValues.courseRequirements.toString() !== course.instructions.toString()) {
                formData.append("instructions", JSON.stringify(data.courseRequirements));
            }
            if(currentValues.courseImage.toString() !== course.thumbNail.toString()) {
              formData.append("thumbnailImage", JSON.stringify(data.courseImage));
            }
            if(currentValues.courseTags.toString() !== course.tag.toString()) {
              formData.append("tag", JSON.stringify(data.courseTags));
            }
           

            setLoading(true);
            const result = await editCourseDetails(formData, token);
            console.log("Printing result : ", result);
            setLoading(false);
            if(result) {
              dispatch(setStep((step+1)));
              dispatch(setCourse(result));
            }
          } 
          else {
              toast.error("NO Changes made so far");
          }
         

          return;
      }
      console.log("outstide ifffff");
      
    //create a new course
    console.log("Printing data : ", data);
    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("tags", data.courseTags)
    formData.append("category", data.courseCategory);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("status", COURSE_STATUS.DRAFT);
    formData.append("thumbNail", data.courseImage);

    setLoading(true);
    console.log("BEFORE add course API call");
    console.log("PRINTING FORMDATA", formData);
    const result = await addCourseDetails(formData,token);
    console.log("Printing result : ", result);
    if(result) {
     
      console.log(step);
      dispatch(setCourse(result));
      dispatch(setStep(2));
  }
    setLoading(false);
    console.log("PRINTING FORMDATA", formData);
    console.log("PRINTING result", result);

}
  return (
    <div className='px-7 py-5 bg-richblack-800 border border-richblack-400 rounded-md'>
      <form className='flex gap-5 flex-col'  onSubmit={handleSubmit(onSubmitHandler)}>
          
      <div className='flex flex-col gap-1 justify-center'>
            <label htmlFor='courseCategory' className='text-[14px] text-richblack-5'>Catagories<sup className='text-pink-200'>*</sup></label>
            <select
              id='courseCategory'
              {...register("courseCategory", {required:true})}
              onChange={handleCategoryChange}
              className='text-[14px] text-richblack-200 px-4 py-2 bg-richblack-700 rounded-md'>
                
                <option value="">Choose a catagory</option>
                {
                  !loading && (courseCatagories.map((category, index) => (
                        <option key={index} value={category?._id}>
                            {category?.name}
                        </option>
                    ))  )
                }
                {
                  errors.courseCategory && (
                    <span className='text-[14px] text-pink-200'>Course Catagory is required<sup>**</sup></span>
                  )
                }

            </select>
          </div>
          {
            !isPass && (
              <div className="flex gap-4 justify-end">
                {
                  selectedCategory && (
                    <button type="button" onClick={handleCheckResult} className='text-[15px] text-richblack-900 bg-yellow-50 rounded-md px-4 py-2'>
                    Check Result
                  </button>
                  )
                }
                <button className='text-[15px] text-richblack-900 bg-gray-500 rounded-md px-4 py-2 '
                  onClick={() => setCreateRequestModalOpen(true)}>
                  Add Category Request
                </button>
                
                  {isTakeQuiz && 
                    <Link to={`/dashboard/takeQuiz/${selectedCategory.quiz}`}>
                      <button type="button" className="text-[15px] text-richblack-900 bg-yellow-50 rounded-md px-4 py-2">
                        Take Quiz
                      </button>
                    </Link>
                                        
                  }
                
              </div>
            )
          }
          {
            displayMessage && (
              <p className='text-[14px] text-richblack-5'>Your category requst is created Successfully! You can create course in that category ince admin approves that.</p>
            )
          }
          {isPass && <><div className='flex flex-col gap-1 justify-center'>
          <label htmlFor='courseTitle' className='text-[14px] text-richblack-5'>Course Name<sup className='text-pink-200'>*</sup></label>
          <input id='courseTitle'
            placeholder='Enter course name'
            {...register("courseTitle", { required: true })}
            className='text-[14px] text-richblack-200 px-4 py-2 bg-richblack-700 rounded-md'>
          </input>
          {errors.courseTitle && (
            <span className='text-[14px] text-pink-200'>Course name is required<sup>**</sup></span>
          )}
        </div><div className='flex flex-col gap-1 justify-center'>
            <label htmlFor='courseShortDesc' className='text-[14px] text-richblack-5'>Short Description<sup className='text-pink-200'>*</sup></label>
            <textarea id='courseShortDesc'
              placeholder='Enter course description'
              {...register("courseShortDesc", { required: true })}
              className='text-[14px] text-richblack-200 px-4 py-2 min-h-[140px] bg-richblack-700 rounded-md'>
            </textarea>
            {errors.courseShortDesc && (
              <span className='text-[14px] text-pink-200'>Course description is required<sup>**</sup></span>
            )}
          </div><div className='relative flex flex-col gap-1 justify-center'>
            <label htmlFor='coursePrice' className='text-[14px] text-richblack-5'>Course Price<sup className='text-pink-200'>*</sup></label>

            <input id='coursePrice'
              placeholder='Enter course price'
              {...register("coursePrice", { required: true, valueAsNumber: true })}
              className='text-[14px] text-richblack-200 px-4 pl-8 py-2 bg-richblack-700 rounded-md'>
            </input>
            {errors.coursePrice && (
              <span className='text-[14px] text-pink-200'>Course price is required<sup>**</sup></span>
            )}
            <TbCoinRupee className='absolute text-richblack-200 top-[55%] left-2 text-[18px]'></TbCoinRupee>
          </div><CourseTagNames
            name="courseTags"
            label="Tags"
            register={register}
            setValue={setValue}
            error={errors}
            getValues={getValues}></CourseTagNames><Upload
              name="courseImage"
              label="Course Image"
              register={register}
              errors={errors}
              getValues={getValues}
              setValue={setValue}
              video={false}
              viewData={null}
              editData={null}></Upload><div className='flex flex-col gap-1 justify-center'>
            <label htmlFor='courseBenefits' className='text-[14px] text-richblack-5'>Benefits of Course<sup className='text-pink-200'>*</sup></label>
            <textarea id='courseBenefits'
              placeholder='Enter benefits of course'
              {...register("courseBenefits", { required: true })}
              className='text-[14px] text-richblack-200 px-4 py-2 min-h-[140px] bg-richblack-700 rounded-md'>
            </textarea>
            {errors.courseBenefits && (
              <span className='text-[14px] text-pink-200'>Course benefits required<sup>**</sup></span>
            )}
          </div><RequirementField name="courseRequirements"
            label="Instructions/Requirements"
            errors={errors}
            register={register}
            getValues={getValues}
            setValue={setValue}></RequirementField><div className='flex gap-3 self-end'>
            {editCourse && <button onClick={() => { dispatch(setStep(2)); } } className='text-[15px] text-richblack-900 bg-yellow-200 rounded-md px-4 py-2'>Continue without Saving</button>}

            <button type='submit' className='text-[15px] text-richblack-900 bg-yellow-50 rounded-md px-4 py-2'>
              {editCourse ? "Save Changes" : "Next"}
            </button>

          </div></>
          }
      </form>
      {
        createRequestModalOpen && (
          <CategoryRequestModal
            isOpen={createRequestModalOpen}
            onClose={() => setCreateRequestModalOpen(false)}
            onConfirm={handleCategoryRequest}
          />
  )
}
    </div>
  )
}

export default CourseInformation