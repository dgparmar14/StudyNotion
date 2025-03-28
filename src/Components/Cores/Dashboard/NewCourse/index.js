import React from 'react'
import RenderSteps from "./RenderSteps"

function NewCourse() {
  return (
    <div className="">
        <div  className="flex gap-5 justify-start flex-col lg:flex-row">
            <div className="flex flex-col gap-4 lg:w-[60%]">
                <p className="text-3xl text-white font-semibold">Add Course</p>
                <div>
                    <RenderSteps>

                    </RenderSteps>
                </div>
            </div>
            <div className="lg:flex hidden flex-col gap-3 bg-richblack-800 pl-8 pr-4 py-5 rounded-md border border-richblack-400 h-fit">
                <div>
                    <p className="text-[16px] font-[600] text-richblack-5">⚡Course Upload Tips</p>
                </div>
                <div>
                    <ul className="text-[14px] text-richblack-5 list-disc flex flex-wrap gap-1 flex-col">
                        <li>
                            Set the Course Price option or make it free.
                        </li>
                        <li>
                            Standard size for the course thumbnail is 1024x576.
                        </li>
                        <li>
                            Video section controls the course overview video.
                        </li>
                        <li>
                            Course Builder is where you create & organize a course.
                        </li>
                        <li>
                            Add Topics in the Course Builder section to create lessons, quizzes, and assignments.
                        </li>
                        <li>
                            Information from the Additional Data section shows up on the course single page.
                        </li>
                        <li>
                            Make Announcements to notify any important
                        </li>
                        <li>
                            Notes to all enrolled students at once.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NewCourse