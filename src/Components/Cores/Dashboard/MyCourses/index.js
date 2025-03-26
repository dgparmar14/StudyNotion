import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getInsructorCourses } from '../../../../Services/Operations/CourseAPI';
import { IoAddCircleOutline } from 'react-icons/io5';
import CourseCards from './CourseCards';
import { useNavigate } from 'react-router-dom';

function MyCourses() {
  const [myCourses, setMyCourses] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  async function getAllInstructorCourses() {
    if (!user?._id) return; // Prevent calling API if user is not available
    try {
      const response = await getInsructorCourses(token);
      setMyCourses(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllInstructorCourses();
  }, [user]); // Re-run when `user` changes

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-3xl font-semibold text-richblack-800">My Courses</p>
        <button
          onClick={() => navigate('/dashboard/add-course')}
          className="px-4 py-2 bg-yellow-200 flex gap-1 items-center rounded-md text-[14px] justify-center font-[600] text-white"
        >
          <IoAddCircleOutline className="font-semibold" />
          New
        </button>
      </div>
      <div className="bg-richblack-900">
        {myCourses ? (
          <CourseCards courses={myCourses} setMyCourses={setMyCourses} className="w-full" />
        ) : (
          <p className="text-[16px] font-[500] text-richblack-5">
            You have not created any courses yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default MyCourses;
