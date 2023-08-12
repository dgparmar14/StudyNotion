import React from 'react'
import HilightedText from './Highlighted'
import knowYourProgress from "../../../assets/Images/Know_your_progress.png"
import compareWithOthers from "../../../assets/Images/Compare_with_others.png"
import planYourLesson from "../../../assets/Images/Plan_your_lessons.png"
import CTABUtton from './CTABUtton'

function LearningLanguageSection() {
  return (
    <div className='flex flex-col gap-8 px-2 py-3 mt-20 items-center justify-center'>
        <div className='text-4xl font-semibold mx-auto'>
            <p>Your Swiss knife for <HilightedText text={"learning any kanguage"}></HilightedText></p>
        </div>
        <div className='w-[70%] text-[16px] font-semibold text-center'>
            Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>
        <div className='flex flex-col lg:flex-row -translate-y-14'>
            <img src={knowYourProgress} alt="Know your progress" className='object-contain scale-90 -mr-32'></img>
            <img src={compareWithOthers} alt="Compare with others" className='object-contain scale-90 -mr-14'></img>
            <img src={planYourLesson} alt="Plan your lesson" className='object-contain scale-90 -ml-32'></img>
        </div>
        <div className='-mt-20'>
          <CTABUtton routLocation={"/signup"} active={"true"}>Learn More</CTABUtton>
        </div>
    </div>
  )
}

export default LearningLanguageSection;