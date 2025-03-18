import React from 'react'
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import TimeLineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
    {
        logo : logo1,
        heading : "Leadership",
        description : "Fully committed to the success company"
    },
    {
        logo : logo2,
        heading : "Responsibility",
        description : "Students will always be our top priority"
    },
    {
        logo : logo3,
        heading : "Flexibility",
        description : "The ability to switch is an important skills"
    },
    {
        logo : logo4,
        heading : "Solve the problem",
        description : "Code your way to a solution"
    }
]

function TimeLineSection() {
  return (
    <div className='flex lg:flex-row flex-col gap-15 justify-between items-center'>
       
            <div className='flex flex-col gap-4'>
                {
                    timeline.map( (element, index) =>{
                        return (
                            <div key={index}>
                                <div className='flex flex-row gap-4' key={index}>
                                    <div className='w-12 h-12 flex justify-center items-center rounded-full bg-white'>
                                        <img src={element.logo}></img>
                                    </div>
                                    <div >
                                        <div className='text-black font-bold'>
                                            {element.heading}
                                        </div>
                                        <div>
                                            {element.description}
                                        </div>
                                    </div>
                                </div>
                                <div className={`dottedLine translate-x-5 translate-y-2 ${index==4 ? "hidden" : "block"} `}></div>

                            </div>
                           
                            
                        )
                           
                    })
                }
            </div>
            <div className='relative px-4 py-4'>
                <div className='lg:photogradient'></div>
                <div className='w-[98%] order-1 flex'>
                    <img src={TimeLineImage} className='z-10'></img>
                </div>
                <div className='z-10 absolute bg-[linear-gradient(to_top,#07A698,#1B282F)] px-10 py-7 flex lg:flex-row flex-col translate-x-[23%] -translate-y-[50%]'>
                    <div className='flex flex-row gap-4 lg:border-r-2 border-[#037957] lg:pr-4 justify-center items-center'>
                        <p className='text-5xl text-white font-bold '>10</p>
                        <p className='text-[1.2rem] text-white'>Years <br></br> of experience</p>
                    </div>
                    <div className='flex flex-row gap-4 lg:pl-4 justify-center items-center'>
                        <p className='text-5xl text-white font-bold '>250</p>
                        <p className='text-[1.2rem] text-white'>Types <br></br> of courses</p>
                    </div>
                </div>
                
            </div>
    
        <div>
            
        </div>
    </div>
  )
}

export default TimeLineSection;