import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setCategoryId } from '../../../../Reducer/Slices/categorySlice';

export default function CategoryDetails(props) {
  const { category } = props;
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const handleViewQuis = () => {
    dispatch(setCategoryId(category._id))
    if(category.quiz){
      nevigate( `/dashboard/quiz/${category.quiz}`)
    }else{
      nevigate(`/dashboard/quiz/0`)
    }

  }
  //console.log("Categry details in the category course details ", category)
  return (
    <div>
      <div className='w-full flex flex-col gap-2 items-start justify-start bg-richblack-800 rounded-lg p-6'>

        {/* This ensures H1 and buttons are in one line */}
        <div className='w-full flex items-center justify-between'>
          <h1 className='text-richblack-5 text-2xl font-semibold'>{category.name}</h1>

          {/* Buttons Container */}
          <div className='flex gap-4'>
            <Link to={`/catalouge/${category.name.split(" ").join("-").toLowerCase()}`}>
              <button className='bg-richblack-700 text-richblack-5 text-sm font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:bg-richblack-600 hover:scale-105'>
                View Courses
              </button>
            </Link>
            
              <button 
                className={`bg-richblack-700 text-richblack-5 text-sm font-semibold py-2 px-6 rounded-lg 
                  transition duration-300 ease-in-out transform 
                  hover:bg-richblack-600 hover:scale-105}`
                  }
                  onClick={handleViewQuis}
              >
                View Quiz
              </button>
           
          </div>
        </div>

        {/* Description and Date */}
        <p className='text-richblack-300 text-sm'>{category.description}</p>
        <p className='text-richblack-300 text-sm'>{category.createdAt}</p>

      </div>
    </div>
  )
}
