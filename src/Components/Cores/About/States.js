import React from 'react'

const data = [
    {
        Number : "5K",
        title : "Active Students"
    },
    {
        Number : "10+",
        title : "Mentors"
    },
    {
        Number : "200+",
        title : "Courses"
    },
    {
        Number : "50+",
        title : "Awards"
    }  
]
    


function States() {

  return (
    <div className='bg-[linear-gradient(to_top,#07A698,#1B282F)] mt-24 px-8 py-12'>
        <div className='w-11/12 max-w-maxContent mx-auto px-1'>
            <div className='flex flex-row flex-wrap justify-between'>
                {
                    data.map( (element, index) => {
                        //console.log("Element : ", element)
                        return (<div key={index} className='flex flex-col gap-3'>
                            <p className='text-3xl font-semibold text-richblack-5'>{element.Number}</p>
                            <p className='text-[16px] text-white'>{element.title}</p>
                        </div>)
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default States