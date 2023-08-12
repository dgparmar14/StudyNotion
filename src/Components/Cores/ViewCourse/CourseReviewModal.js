import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { createRating } from '../../../Services/Operations/CourseAPI';
import { useForm } from 'react-hook-form';
import {CgClose} from "react-icons/cg";
import ReactStars from "react-rating-stars-component";

function CourseReviewModal({setReviewModal}) {
    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
    const {courseEntireData} = useSelector((state)=>state.viewCourse);

    useEffect(()=>{
        setValue("courseReview", "");
        setValue("courseRating", 0);
    }, []);

    const setRatingCount = (count)=>{
        setValue("courseRating", count);
    }

    const onSubmit = async(data)=>{
        await createRating({
            courseId : courseEntireData._id,
            rating : data.courseRating,
            review : data.courseReview
        }, token);

        setReviewModal(false);
    }

    const {
        setValue,
        register,
        getValues,
        formState : {errors},
        handleSubmit
    } = useForm();

   

  return (
    <div className="fixed  inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
        <div className='w-[450px] bg-richblack-800 flex border flex-col border-richblack-400 rounded-md gap-4'>
            <div className='bg-richblack-700 px-4 py-2 rounded-t-md flex justify-between'>
                <p className='text-richblack-5 text-[16px]'>Add Review</p>
                <button onClick={()=>setReviewModal(false)} className='text-richblack-5'>
                    <CgClose></CgClose>
                </button>
            </div>

            <div className='flex flex-col gap-3 items-center justify-center px-4 py-2 pb-4'>
                <div className='flex gap-4 justify-center items-center'>
                    <div>
                        <img src={user.image} alt='User Image' className='w-[50px] aspect-square rounded-full'></img>
                    </div>
                    <div className='flx gap-2 justify-center items-center'>
                        <p className='text-[16px] text-richblack-5'>{user.firstName} {user.lastName}</p>
                        <p className='text-[12px] text-richblack-50'>Posting Publically</p>
                    </div>
                </div>
                <ReactStars 
                                    count={5}
                                    onChange={setRatingCount}
                                    size={24}
                                    color2={'#ffd700'} ></ReactStars>
                <div className='w-[100%]'>
                    <form onClick={handleSubmit(onSubmit)} className='w-[100%] flex flex-col gap-4 justify-center items-center'>
                       
                        <div className='w-[100%] flex flex-col gap-2'>
                            <label htmlFor='courseReview' className='text-richblack-5 text-[15px]'>Add Your Experience <sup className='text-pink-200'>*</sup></label>
                            <textarea
                                    id='courseReview'
                                    placeholder='Add your Experience here'
                                    {...register("courseReview", {required : true})}
                                    className='px-4 py-2 bg-richblack-700 h-[100px] text-[15px] shadow-sm shadow-richblack-400 rounded-md text-richblack-50'></textarea>
                            {
                                errors.courseReview && (
                                    <span className='text-pink-200 text-[14px]'>Please add your experience <sup>**</sup></span>
                                )
                            }
                        </div>
                        <div className='mt-4 self-end flex gap-3'>
                            <button onClick={()=>setReviewModal(false)} className='text-richblack-5 text-[14px] bg-richblack-700 rounded-md px-4 py-2'>Cancel</button>
                            <button type='submit' className='text-[14px] text-richblack-900 bg-yellow-200 rounded-md px-4 py-2'>Save</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CourseReviewModal