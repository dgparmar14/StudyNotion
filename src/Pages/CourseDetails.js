    import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { buyCourse } from '../Services/Operations/StudetUtilityAPI';
import { useNavigate, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../Services/Operations/CourseAPI';
import { useState } from 'react';
import Modal from '../Components/Common/Modal';
import Error from "../Components/Common/Error"
import {averageRating} from "../Services/AverageRating"
import RatingStars from '../Components/Common/RatingStars'
import {AiOutlineInfoCircle} from "react-icons/ai"
import { formatdate } from '../Services/DateFormat';
import {IoGlobeOutline} from "react-icons/io5"
import CourseDetailsCard from '../Components/Cores/Course/CourseDetailsCard';
import {BsCameraVideo} from "react-icons/bs";
import {BsChevronDown} from "react-icons/bs"
import Footer from '../Components/Common/Footer';

function CourseDetails() {

    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {courseId} = useParams();
    const [courseData, setCourseData] =useState("");
    const {loading} = useSelector((state)=>state.profile);
    const {paymentLoading} = useSelector((state)=>state.course);
    const [confirmationMoadal, setConfirmationModal] = useState(null);


    useEffect(()=>{
        const getFullCourseDetails = async ()=>{
            try{
                const res = await getFullDetailsOfCourse(courseId, token);
                //console.log("Printing reponce : ",res);
                setCourseData(res.data);
                
            }
            catch(error){
                console.error("Error occured in getting course details__________", error);

            }
        }
    getFullCourseDetails();
    }, [courseId]);



    const [average, setAverageRating] = useState(0);

    useEffect(()=>{
        if(courseData){
            const count = averageRating(courseData.data.courseDetails.ratingAndReviews);
            setAverageRating(count);

        }
    }, [courseData]);

    const [numberOfLectures, setNumberOfLectures] = useState(0);
    useEffect(()=>{
        if(courseData){

            let lectures = 0; 
            courseData.data.courseDetails.courceContent.forEach((sec) => {
                lectures+=sec.subSections.length;
            });

            //console.log("Ptinting number of lectures : ", lectures);
            setNumberOfLectures(lectures);
        }
        
    }, [courseData]);

    function handleSubmit(){
        if(token){
            buyCourse(token, [courseId], user, navigate, dispatch);
            return
        }
        setConfirmationModal({
            text1 : "You are not logged in yet",
            text2 : "Please log in to buy a course",
            button1Text: "Login",
            button2Text: "Cancel",
            button1Handler: () => {navigate("/login")},
            button2Handler: () => {setConfirmationModal(null)}
        })
    }

    const [active, setActive] = useState([]);
    const handleActive = (id)=>{
        active.includes(id) ? (
            active.filter((sectionId)=>sectionId !== id)
        ) : (active.concat(id))
    }

    if(loading || !courseData){
        return (
            <div>
                Loading......
            </div>
        )
    }


    if(!courseData.success){
        return (<Error></Error>)
    }

    const {
        courceName,
        description,
        createdAt,
        _id,
        instructor,
        duration,
        whatYouWillLearn,
        courceContent,
        thumbNail,
        ratingAndReviews,
        studentsEnrolled
    } = courseData.data.courseDetails



   
  return (
    <div>
        <div className='bg-richblack-800  tracking-wider'>
            <div className='md:relative w-11/12 max-w-maxContent mx-auto flex pt-7 pb-12 flex-col gap-4'>
                <div className='flex flex-col gap-2 mt-8'>
                    <p className='text-2xl text-richblack-5 font-semibold'>{courceName}</p>
                    <p className='text-[16px] text-richblack-50'>{description}</p>
                    <div className='flex flex-wrap md:flex-row gap-2 mt-2 items-center'>
                        <span className='text-[15px] text-yellow-200'>{average}</span>
                        <RatingStars Review_Count={average} Star_Size={20}></RatingStars>
                        <span className='text-[15px] text-richblack-25'>{`(${ratingAndReviews.length} Reviews)`}</span>
                        <span className='text-[15px] text-richblack-25'>{`${studentsEnrolled.length} Enrolled`}</span>
                    </div>
                    <div className='flex gap-2 text-[15px] mt-1 text-richblack-25'>
                    
                        {
                            `Created by ${instructor.firstName} ${instructor.lastName}`
                        }
                    </div>
                    <div className='flex flex-wrap gap-3 text-[15px] text-richblack-25 items-center'>
                        
                        <div className='flex gap-1 items-center'>
                            <AiOutlineInfoCircle></AiOutlineInfoCircle>
                            {
                                `Created at ${formatdate(createdAt)}`
                            }
                        </div>
                        <div className='flex gap-1 items-center'>
                            <IoGlobeOutline className='text-richblack-25'></IoGlobeOutline>
                            <p>English</p>
                        </div>
                        
                    </div>
                </div>
                <CourseDetailsCard course={courseData.data.courseDetails} setConfirmationModal={setConfirmationModal} handleSubmit={handleSubmit}></CourseDetailsCard>      
            </div>
        </div>


        <div className='w-11/12 mt-8 max-w-maxContent mx-auto py-8'>
            <div className='flex gap-1 flex-col'>
                <p className='text-[24px] font-semibold text-richblack-5'>What You Will Learn</p>
                <div className='text-[16px] font-[400] text-richblack-25'>
                    {
                        whatYouWillLearn
                    }
                </div>

            </div>
        </div>


        <div className='w-11/12 max-w-maxContent mx-auto mt-8'>
            <div className='md:w-[60%] w-[90%] flex flex-col gap-4'>
                <div className='text-[24px] font-semibold text-richblack-5'>
                    Course Content  
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-2 text-[15]px] font-[400] text-richblack-25'>
                        <span>{courceContent.length} Section(s)</span>
                        <span>{numberOfLectures} Lectures</span>
                        <span>{duration} Total Length</span>         
                    </div>
                    <button onClick={()=>setActive([])} className='text-[15px] font-[400] text-yellow-50'>Collapse All Sections</button>
                    
                </div>

                <div className='mb-12 border border-richblack-700'>
                    {
                        courceContent.length == 0 ? (<div>No lecture updated yet</div>) : (
                            courceContent.map((section, index) => (
                                <details key={index} className='transition-all duration-400' onClick={()=>{handleActive(section._id)}}>
                                    <summary className='px-7 summeryCourse py-4 bg-richblack-700 transition-all duration-400'>
                                        <div className='flex justify-between w-full'>
                                            <div className='flex gap-1 items-center text-[15px] text-richblack-5'>
                                                <BsChevronDown className={`transition-all duration-200 text-richblack-5`}></BsChevronDown>
                                                {
                                                    section.title
                                                }
                                            </div>
                                            <div className="text-[15px] text-yellow-50">
                                                {
                                                    `${section.subSections.length} Lectures`
                                                }
                                                
                                            </div>
                                            
                                        </div>
                                       
                                    </summary>
                                    <div className='border-x-[1px]'>
                                            {
                                                section.subSections.map((subSection, index)=>(
                                                    <div key={index} className='px-7 py-4 transition-all font-[500] duration-400 text-richblack-25 flex gap-3 text-[15px] items-center'>
                                                        <BsCameraVideo className='text-[14px]'></BsCameraVideo>
                                                        {
                                                            subSection.title
                                                        }
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    
                                </details>
                            ))
                        )
                    }
                </div>

            </div>

        </div>
        <div className='w-11/12 max-w-maxContent  mb-24 mx-auto flex flex-col'>
            <p className='text-2xl font-semibold text-richblack-5'>Author</p>
            <div className='flex items-center gap-2 mt-3'>
                <img src={instructor.image} className='w-[50px] aspect-square rounded-full'></img>
                <div className='text-[15px] text-richblack-5'>
                    {
                        `${instructor.firstName} ${instructor.lastName}`
                    }
                </div>

            </div>
            

        </div>
        <Footer></Footer>

        {
            confirmationMoadal && <Modal modalData={confirmationMoadal}></Modal>
        }
    </div>
  )
}

export default CourseDetails

//<button onClick={()=>handleSubmit()} className='text-richblack-900 bg-yellow-100 rounded-md px-4 py-2'>Buy Now</button>