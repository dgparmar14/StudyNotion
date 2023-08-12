import React from 'react'
import CTABUtton from './CTABUtton'
import {FaArrowRight}   from "react-icons/fa"
import { TypeAnimation } from 'react-type-animation'

function CodeBlocks({
    content1, content2, position, heading, subheading, codeblock, codeColor, gradient
}) {
  return (
    <div className={`flex ${position} flex-col mx-auto justify-center read-only relative gap-14 mt-[4rem] w-[100%]`}>
       
        <div className='flex flex-col gap-5 md:w-[35%]'>
            {heading}
            <div className='text-richblack-300 text-[16px]'>
                {subheading}
            </div>
            <div className='flex gap-8 mt-2'>
                <CTABUtton routLocation={content1.routLocation} active={content1.active} >
                    <div className='flex gap-2 items-center'>
                        {content1.desc}
                        <FaArrowRight></FaArrowRight>
                    </div>
                </CTABUtton>
                <CTABUtton routLocation={content2.routLocation} active={content2.active} >
                        {content2.desc}
                </CTABUtton>
            </div>
        </div>

        <div className='h-fit text-[10px] flex gap-3 border border-richblack-800 lg:w-[350px] relative font-mono font-bold pr-2 gradient px-2 py-2'>
        <div className={`${ gradient=="1" ? "gradient1" : "gradient2"}`}></div>
            <div className='w-[10%] flex flex-col gap-2 items-center text-center text-richblack-400 font-inter font-bold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
               

            </div>
            <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono pr-2 ${codeColor}`}>
                <TypeAnimation
                    sequence={[codeblock, 2000, ""]}
                    repeat={Infinity}
                    cursor={true}
                    style={
                        {
                            whiteSpace: "pre-line",
                            display:"block"
                        }
                    }
                    omitDeletionAnimation={true}
                ></TypeAnimation>
            </div>
        </div>

    </div>
  )
}

export default CodeBlocks;