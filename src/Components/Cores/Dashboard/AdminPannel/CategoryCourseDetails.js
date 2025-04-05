import React from 'react'
import { Link } from 'react-router-dom';

export default function CategoryCourseDetails(props) {
  const { category } = props;
  return (
    <div>
      <div className='w-full flex flex-col gap-2 items-start justify-start bg-richblack-800 rounded-lg p-6'>

        {/* This ensures H1 and buttons are in one line */}
        <div className='w-full flex items-center justify-between'>
          <h1 className='text-richblack-5 text-2xl font-semibold'>{category.name}</h1>

          {/* Buttons Container */}
          <div className='flex gap-4'>
            {
              category.courses.length > 0 ? (
                <Link to={`/catalouge/${category.name.split(" ").join("-").toLowerCase()}`}>
                  <button className='bg-richblack-700 text-richblack-5 text-sm font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:bg-richblack-600 hover:scale-105'>
                    View Course
                  </button>
                </Link>
              ) :
                <Link to={`/catalouge/${category.name.split(" ").join("-").toLowerCase()}/${category._id}/course/0`}>
                  <button className='bg-richblack-700 text-richblack-5 text-sm font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:bg-richblack-600 hover:scale-105'>
                    No Course Found
                  </button>
                </Link>
            }
            {
              category.quiz ? (
                <Link to={`/${category.name.split(" ").join("-").toLowerCase()}/${category._id}/quiz/${category.quiz}`}>
                  <button className='bg-richblack-700 text-richblack-5 text-sm font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:bg-richblack-600 hover:scale-105'>
                    View Quiz
                  </button>
                </Link>
              ) :
                <Link to={`/${category.name.split(" ").join("-").toLowerCase()}/${category._id}/quiz/0`}>
                  <button className='bg-richblack-700 text-richblack-5 text-sm font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:bg-richblack-600 hover:scale-105'>
                    Create Quiz
                  </button>
                </Link>
            }
          </div>
        </div>

        {/* Description and Date */}
        <p className='text-richblack-300 text-sm'>{category.description}</p>
        <p className='text-richblack-300 text-sm'>{category.createdAt}</p>

      </div>
    </div>
  )
}
