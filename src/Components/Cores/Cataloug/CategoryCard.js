import React, { useEffect, useState } from 'react'
import {averageRating} from "../../../Services/AverageRating"
import { Link } from 'react-router-dom';
import RatingStars from '../../Common/RatingStars';

function CategoryCard({Course, Height}) {
    const [average, setAverage] = useState(0);

    useEffect(()=>{
        const count = averageRating(Course.ratingAndReviews);
        setAverage(count);
    }, [Course])
    //console.log("Printing course : ------------", Course);
  return (
    <div>
        <Link to={`/course/${Course._id}`}>
            <div>
                <img src={Course?.thumbNail} alt='Course Thumbnail' className={`${Height} w-[450px] rounded-sm object-cover`}></img>
            </div>
            <div className='flex gap-1 flex-col mt-3'>
                <p className='text-richblack-25'>{Course?.courceName}</p>
                {/* <div>{Course?.instructor?.firstName} <spam>{Course?.instructor?.lastName}</spam></div> */}
                <div className='flex gap-2 text-richblack-50 text-[14px]'>
                    <span>{average || 0}</span>
                    <RatingStars Review_Count={average}></RatingStars>
                    <span>{Course?.ratingAndReviews.length} Ratings</span>
                </div>
                <p className='text-[15px] text-richblack-50'>Rs. {Course.price}</p>
            </div>

        </Link>
    </div>
  )
}

export default CategoryCard