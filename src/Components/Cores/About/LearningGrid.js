import React from 'react'
import HilightedText from '../Home/Highlighted';
import { Link } from 'react-router-dom';
import CTABUtton from '../Home/CTABUtton';

const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
  ];

function LearningGrid() {
  return (
    <div className="bg-richblack-900 px-4 py-12">
        <div className="w-11/12 max-w-maxContent grid grid-cols-1 lg:grid-cols-4 mx-auto px-4 py-4">
            {
                LearningGridArray.map( (element, index) => {
                    return (
                        <div key={index}
                            className={`${element.order<0 && "col-span-2 bg-transparent"}
                            ${element.order%2==1 ? "bg-richblack-700" : "bg-richblack-800"}
                            ${element.order===3 && "lg:col-start-2"}`}>
                        {

                            element.order<0 ? (
                                <div className='px-4 py-3 flex flex-col gap-3'>
                                    <div className='text-4xl font-bold text-richblack-5'>
                                        <p>{element.heading}</p>
                                        <HilightedText text={element.highlightText}></HilightedText>
                                    </div>
                                    <div>
                                        <p className='text-[16px] text-richblack-200'>{element.description}</p>
                                    </div>
                                    <CTABUtton routLocation={element.BtnLink} active={true}>{element.BtnText}</CTABUtton>
                                </div>
                            ) : (
                                <div className='px-5 py-7 flex flex-col gap-4 w-[250px] h-[250px]'>
                                    <p className='text-[18px] font-bold text-richblack-5'>{element.heading}</p>
                                    <p className='text-[16px] text-richblack-300'>{element.description}</p>
                                </div>
                            )
                        }
                        
                    </div>

                    )
                   
                })
            }
        </div>
    </div>
  )
}

export default LearningGrid