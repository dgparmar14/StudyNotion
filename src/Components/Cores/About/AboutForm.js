import React from 'react'
import ContactForm from '../../Common/ContactForm'

function AboutForm() {
  return (
    <div className='w-11/12 mt-14 mb-14 mx-auto max-w-maxContent px-8 py-18 flex justify-center items-center flex-col gap-5'>
        <div className='flex flec-col gap-3 w-[50%] flex-col justify-center items-center'>
            <p className='text-3xl text-richblack-5 font-semibold'>
                Get in Touch
            </p>
            <p className='text-[16px] text-richblack-200'>
                We’d love to here for you, Please fill out this form.
            </p>
            <div className='mt-12'>
                <ContactForm></ContactForm>
            </div>
        </div>
    </div>
  )
}

export default AboutForm