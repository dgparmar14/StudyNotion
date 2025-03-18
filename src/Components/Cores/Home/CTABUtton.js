import React from 'react'
import { Link } from 'react-router-dom'

function CTABUtton({children, routLocation, active}) {
  return (
    <div>
        <Link to={routLocation}>
        <div className={`text-[14px] InstructorShadow px-4 py-2 max-w-fit rounded-md text-center ${active ? "bg-green InstructorShadow text-white" : "bg-white text-black"} transition-all duration-200 hover:scale-95`}>
            {children}
        </div>

        </Link>
    </div>
  )
}

export default CTABUtton;