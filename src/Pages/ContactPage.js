import React from 'react'
import {HiChatBubbleLeftRight} from "react-icons/hi2"
import {IoEarthSharp} from  "react-icons/io5"
import {IoIosCall} from "react-icons/io"
import ContactForm from '../Components/Common/ContactForm'
import Footer from '../Components/Common/Footer'
import CourseSlider from '../Components/Cores/Home/CourseSlider'
import ContactUsForm from '../Components/Common/ContactUsForm'


function ContactPage() {
  return (
    <div className='bg-navbarBgColor'>
    <div className="w-11/12 max-w-maxContent mx-auto flex flex-col gap-5 mt-4 px-4 py-4 overflow-x-hidden">
        <div className='flex flex-wrap mt-7 flex-row gap-12 self-center px-4 mx-18'>
            <div className='flex mx-4 ml-4 mr-4 flex-col gap-5 px-8 py-5 h-max bg-richblack-800 rounded-md'>
                <div className='flex items-start gap-2 text-richblack-200 text-[14px]'>
                    <div className='opacity-0 md:opacity-100 text-[22px] mt-1'>
                        <HiChatBubbleLeftRight></HiChatBubbleLeftRight>
                    </div>
                    <div>
                        <p className='text-[14px] font-semibold text-richblack-5'>Chat on us</p>
                        <p>Our friendly team is here to help.</p>
                        <p>Our email address:aanchalpatel4404@gmail.com</p>
                    </div>
                </div>
                <div  className='flex items-start gap-2 text-richblack-200 text-[14px]'>
                    <div className='opacity-0 md:opacity-100 text-[22px] mt-1'>
                        <IoEarthSharp></IoEarthSharp>
                    </div>
                    <div>
                        <p className='text-[14px] font-semibold text-richblack-5'>Visit us</p>
                        <p>Come and say hello at our office HQ.</p>
                        <p>Here is the location/ address</p>
                    </div>
                </div>
                <div  className='flex items-start gap-2 text-richblack-200 text-[14px]'>
                    <div className='opacity-0 md:opacity-100 text-[22px] mt-1'>
                        <IoIosCall></IoIosCall>
                    </div>
                    <div>
                        <p className='text-[14px] font-semibold text-richblack-5'>Call Us</p>
                        <p>Mon - Fri From 8am to 5pm</p>
                        <p>+123 456 7890</p>
                    </div>
                </div>
            </div>

            <div className='flex flex-col mr-4 gap-5 h-max justify-center mx-4 ml-4 px-12 py-5 border lg:w-[50%] border-richblack-500 rounded-lg'>
                <p className='text-3xl w-[80%] text-richblack-5 font-semibold'>Got a Idea? We’ve got the skills. Let’s team up</p>
                <p className='text-[16px] text-richblack-200 '>Tall us more about yourself and what you’re got in mind.</p>
                <ContactUsForm></ContactUsForm>
            </div>
        </div>
        <div className='flex flex-col gap-5 mb-12 justify-center items-center mt-24'>
            <p className='text-richblack-5 text-3xl font-semibold'>Reviews from other learners</p>
            <CourseSlider></CourseSlider>
        </div>

       

    </div>
    <Footer></Footer>

    </div>
    
  )
}

export default ContactPage