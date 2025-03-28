import React from 'react'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper'
import {Swiper, SwiperSlide} from "swiper/react"
import CourseCards from './CourseCards'
import CategoryCard from '../Cataloug/CategoryCard'
import { useEffect } from 'react'
import { apiConnector } from '../../../Services/apiConnector'
import { ratingsEndpoints } from '../../../Services/apis'
import { useState } from 'react'
import ReactStars from "react-rating-stars-component";

function CourseSlider({Courses}) {

  const [reviews, setReview] = useState([]);

  useEffect(()=>{
    async function fetchRatings(){
      try{

        const responce = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API);

        console.log("Writing user reviews : ", responce);
        if(!responce.data.success){
          console.log("Could not find review");
        }

        setReview(responce.data.data);


      }catch(error){
        console.error("Fetch review api error : ", error);
      }

    }

    fetchRatings();
  }, []);
  
  return (
    <div className='w-[100%]'>

      <div className='max-w-maxContent'>
        <Swiper 
                
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },
                 
                  639: {
                    slidesPerView: 2,
                  },

                  900:{
                    slidesPerView:3,
                  },

                  1000 : {
                    slidesPerView:4,
                  }

                }}
                loop={true}
                spaceBetween={24}
                freeMode={true}
                autoplay={
                  {
                    delay : 2500
                  }
                }
                modules={[Autoplay, FreeMode, Pagination]} className='w-[100%]'>
                {
                  reviews.map((review, index)=>(
                    <SwiperSlide key={index} className='bg-footer rounded-sm flex flex-col gap-3 px-7 py-4 mb-12'>
                      <div className='h-max flex gap-3'>
                        <div className='w-[45px] aspect-square rounded-full bg-cover'>
                          <img src={review.user.image ? review.user.image : `https://api.dicebear.com/5.x/initials/svg?seed=${review.user.firstName} ${review.user.lastName}`}
                          className='w-[45px] aspect-square rounded-full bg-cover'></img>
                        </div>
                        <div className='flex flex-col'>
                          <p className='text-[16px] text-richblack-5'>{review.user.firstName} {review.user.lastName}</p>
                          <p className='text-[14px] text-richblack-50'>{review.user.email}</p>
                        </div>
                      </div>
                      <div className='text-[16px] text-richblack-25 mt-1'>
                        {
                          review.review.split(" ").splice(0, 15).join(" ")
                        }
                      </div>
                    
                      <div className='flex flex-row gap-2 items-center'>
                        <span className=' text-[16px] text-yellow-50'>{review.rating}</span>
                        <div className='flex flex-row'>
                        <ReactStars
                                    count={5}
                                    value={review.rating}
                                    size={20}
                                    edit={false}
                                    color2={'#ffd700'} ></ReactStars>
                        </div>
                        
                      </div>

                    </SwiperSlide>
                  ))
                }
          
        </Swiper>   
      </div> 
    </div>
  )
}

export default CourseSlider;