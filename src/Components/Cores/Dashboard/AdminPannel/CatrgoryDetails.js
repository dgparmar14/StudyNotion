import React from 'react'
import { Link } from 'react-router-dom';

export default function CategoryDetails(props) {
  const { category } = props;
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
            <Link to={category.quiz ? `/dashboard/quiz/${category.quiz}` : '#'}>
              <button 
                className={`bg-richblack-700 text-richblack-5 text-sm font-semibold py-2 px-6 rounded-lg 
                  transition duration-300 ease-in-out transform 
                  ${category.quiz ? 'hover:bg-richblack-600 hover:scale-105' : 'opacity-50 cursor-not-allowed'}`}
                disabled={!category.quiz}
              >
                View Quiz
              </button>
            </Link>
          </div>
        </div>

        {/* Description and Date */}
        <p className='text-richblack-300 text-sm'>{category.description}</p>
        <p className='text-richblack-300 text-sm'>{category.createdAt}</p>

      </div>
    </div>
  )
}
