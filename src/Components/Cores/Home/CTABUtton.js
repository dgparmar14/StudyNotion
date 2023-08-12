import React from 'react'
import { Link } from 'react-router-dom'

function CTABUtton({children, routLocation, active}) {
  return (
    <div>
        <Link to={routLocation}>
        <div className={`text-[14px] InstructorShadow px-4 py-2 max-w-fit rounded-md text-center ${active ? "bg-yellow-50 InstructorShadow text-black" : "bg-richblack-800 text-white"} transition-all duration-200 hover:scale-95`}>
            {children}
        </div>

        </Link>
    </div>
  )
}

export default CTABUtton;