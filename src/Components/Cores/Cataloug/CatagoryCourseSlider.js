import React from 'react'

import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay,FreeMode,Navigation, Pagination}  from 'swiper'

import CategoryCard from './CategoryCard'

const CourseSlider = ({Courses}) => {
  return (
    <>
        {
            Courses?.length ? (
                <Swiper
                    slidesPerView={1}
                    loop={true}
                    spaceBetween={200}
                    pagination={true}
                    modules={[Autoplay,Pagination,Navigation]}
                    className="mySwiper"
                    autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                    }}
                    navigation={true}
                    breakpoints={{
                        1024:{slidesPerView:3,}
                    }}
                >
                    {
                        Courses?.map((course, index)=> (
                            <SwiperSlide key={index}>
                                <CategoryCard Course={course} Height={"h-[250px]"} />
                            </SwiperSlide>
                        ))
                    }   
                </Swiper>
            ) : (
                <p className='text-[15px] text-richblack-50'>No Course Found</p>
            )

        }
    </>
  )
}

export default CourseSlider
