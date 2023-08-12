import React from 'react'
import HilightedText from '../Home/Highlighted'

function Quate() {
  return (
    <div className='text-3xl font-semobold w-[70%] text-richblack-200 text-center mx-auto'>
        "We are passionate about revolutionizing the way we learn. Our innovative platform <HilightedText text={"combines technology"}></HilightedText>, <span className="orangGradient">expertise</span>, and community to create an <span className='yellowGradient'>unparalleled educational experience.</span>"
    </div>
  )
}

export default Quate
