import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoBookOutline, IoPeopleOutline, IoCashOutline } from "react-icons/io5";
import { getInsructorCourses } from "../../../../Services/Operations/CourseAPI";
import { instructorDataAPI } from "../../../../Services/Operations/CourseAPI";

import InstructorStates from "./InstructorStates";

export default function Instructor() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const instructorApiData = await instructorDataAPI(token);
      const result = await getInsructorCourses(token);
      //console.log("Printing instructor DATA TYPE : ",instructorApiData);
      if (instructorApiData.length) {
        setInstructorData(instructorApiData);
      }
      if (result) {
        setCourses(result);
      }
    })();
    setLoading(false);
  }, []);

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  );

  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  );
 

  // console.log("Writing cources : ", courses);
  // console.log("Writing instructordata : ", instructorData);

  return (
    <div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-richblack-100">
          Hi {user?.firstName} 👋
        </h1>
        <p className="font-medium text-richblack-200">
          Let's start something new
        </p>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
        </div>
      ) : courses.length > 0 ? (
        <div>
          {/* Total Statistics */}
          <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6">
            <p className="text-lg font-bold text-richblack-5">Statistics</p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* Total Courses */}
              <div className="p-4 rounded-2xl shadow-lg border border-richblack-700 flex items-center gap-4">
                <div className="p-4 border rounded-2xl border-yellow-600">
                <IoBookOutline className="text-yellow-200 w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm text-richblack-400">Total Courses</p>
                  <p className="text-3xl font-bold text-richblack-50">
                    {courses.length}
                  </p>
                </div>
              </div>

              {/* Total Students */}
              <div className="p-4 rounded-2xl shadow-lg border border-richblack-700 flex items-center gap-4">
                <div className="p-4 border rounded-2xl border-yellow-600">
                  
                <IoPeopleOutline className="text-yellow-200 w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm text-richblack-400">Total Students</p>
                  <p className="text-3xl font-bold text-richblack-50">
                    {totalStudents}
                  </p>
                </div>
              </div>

              {/* Total Income */}
              <div className="p-4 rounded-2xl shadow-lg border border-richblack-700 flex items-center gap-4">
                <div className="p-4 border rounded-2xl border-yellow-600">
                <IoCashOutline className="text-yellow-200 w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm text-richblack-400">Total Income</p>
                  <p className="text-3xl font-bold text-richblack-50">
                    &#x20B9; {totalAmount}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="my-4 space-x-4">
            {/* Render chart / graph */}
            {totalAmount > 0 || totalStudents > 0 ? (
              <InstructorStates courses={instructorData} />
            ) : (
              <div className="flex-1 rounded-md bg-richblack-800 p-6">
                <p className="text-lg font-bold text-richblack-5">Visualize</p>
                <p className="mt-4 text-xl font-medium text-richblack-50">
                  Not Enough Data To Visualize
                </p>
              </div>
            )}
          </div>
          <div className="rounded-md bg-richblack-800 p-6">
            {/* Render 3 courses */}
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-richblack-5">Your Courses</p>
              <Link to="/dashboard/my-courses">
                <p className="text-xs font-semibold text-yellow-50">View All</p>
              </Link>
            </div>
            <div className="my-4 flex items-start space-x-6">
              {courses.slice(0, 3).map((course) => (
                <div key={course._id} className="w-1/3">
                  <img
                    src={course.thumbNail}
                    alt={course.courceName}
                    className="h-[201px] w-full rounded-md object-cover"
                  />
                  <div className="mt-3 w-full">
                    <p className="text-sm font-medium text-richblack-50">
                      {course.courceName}
                    </p>
                    <div className="mt-1 flex items-center space-x-2">
                      <p className="text-xs font-medium text-richblack-300">
                        {course.studentsEnrolled.length} students
                      </p>
                      <p className="text-xs font-medium text-richblack-300">
                        |
                      </p>
                      <p className="text-xs font-medium text-richblack-300">
                        Rs. {course.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
          <p className="text-center text-2xl font-bold text-richblack-5">
            You have not created any courses yet
          </p>
          <Link to="/dashboard/add-course">
            <p className="mt-1 text-center text-lg font-semibold text-yellow-50">
              Create a course
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}
