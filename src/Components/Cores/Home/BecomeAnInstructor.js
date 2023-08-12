import React from 'react'
import CTABUtton from './CTABUtton'
import Instructor from "../../../assets/Images/Instructor.png"
import HilightedText from './Highlighted'

function BecomeAnInstructor() {
  return (
    <div className='flex flex-col lg:flex-row gap-14 mt-4'>
        <div className='w-[100%]'>
            <img src={Instructor} alt='Become An Instructor' className='becomeInstructor'></img>
        </div>
        <div className='flex flex-col gap-12'>
            <p className='w-[30%] text-4xl font-semibold text-white'>Become an <HilightedText text={"Instructor"}></HilightedText></p>
            <p className='text-[16px] w-[70%]'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
            <div className='w-fit'>
                <CTABUtton routLocation={"/signup"} active={"true"}>Learn More</CTABUtton>
            </div>
        </div>
    </div>
  )
}

export default BecomeAnInstructor;