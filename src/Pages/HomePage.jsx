import React from 'react'
import { Link } from 'react-router-dom'
import {FaArrowRight}   from "react-icons/fa"
import HilightedText from '../Components/Cores/Home/Highlighted'
import CTABUtton from '../Components/Cores/Home/CTABUtton'
import Banner from "../assets/Images/banner.mp4"
import CodeBlock from "../Components/Cores/Home/CodeBlocks"
import TimeLineSection from "../Components/Cores/Home/TimeLineSection"
import LearningLanguageSection from "../Components/Cores/Home/LearningLanguageSection"
import BecomeAnInstructor from '../Components/Cores/Home/BecomeAnInstructor'
import CourseSlider from '../Components/Cores/Home/CourseSlider'
import CourseCards from '../Components/Cores/Home/CourseCards'
import Footer from "../Components/Common/Footer"

function HomePage() {
  return (
    <div>
    {/* section-1 */}
      <div className='relative mx-auto w-11/12 max-w-maxContent text-white flex flex-col items-center justify-between pb-[8rem]'>
        <Link to={"/signUp"}>
         
          <div className='flex mx-auto mt-16  group rounded-full text-[1rem] font-bold bg-richblack-800 InstructorShadow
border-radius: 500px; hover:scale-95 text-richblack-200 transition-all duration-200 '> 
            <div className='flex gap-2 items-center px-8 py-[7px] group-hover:bg-richblack-900 rounded-full transition-all duration-200'>
              <p>Bocome an instuctor</p>
              <FaArrowRight></FaArrowRight>

            </div>

           </div>

        </Link>

        <div className='mt-7 text-4xl font-semibold text-center'>
          Empower your future with 
          <HilightedText text={"Coding Skills"} className="hilightGradient"></HilightedText>
        </div>

        <div className='w-[70%] text-[16px] font-semibold mt-4 text-richblack-300 text-center'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
        </div>

        <div className='flex gap-7 mt-7'>
          <CTABUtton to={"/signup"} active={true}>
            Learn More
          </CTABUtton>

          <CTABUtton to={"/login"} active={false}>
            Book a demo
          </CTABUtton>
        </div>

        <div className='mt-9 lg:w-[1035px] lg:h-[515px] mx-auto flex items-center md:w-[70%] w-[80%] justify-center'>
          <video muted loop autoPlay className='lg:w-[1035px] lg:h-[515px]  px-4 videoShadow'>
            <source src={Banner} type='video/mp4'></source>
          </video>
        </div>

        <div className='mt-10 mb-4 mx-auto w-[90%]'>
          <CodeBlock

          position={"lg:flex-row"}

          heading={
            <div className='text-3xl font-semibold'>
              Unlock your 
              <HilightedText text={"coading potential"}></HilightedText> with our online courses
            </div>
          }

          subheading={
            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
          }

          content1={
            {
              routeLocation : "/signup",
              active : true,
              desc : "Try it yourself"

            }
          }

          content2={
            {
              routeLocation : "/login",
              active : false,
              desc : "Learn more"

            }

          }
          codeblock = {
            `<!DOCTYPE html>\n<html>\nhead><title>Example<\n/title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\n
            nav><ahref="one/">One</a><ahref="two/">Two\n</a><ahref="three/">Three</a>\n/nav>`
          }
          codeColor={"text-yellow-25"}
          gradient = {"1"}

          ></CodeBlock>
        </div>

        <div className='mt-10 mb-4 mx-auto w-[90%]'>
          <CodeBlock

          position={"lg:flex-row-reverse"}

          heading={
            <div className='text-3xl font-semibold'>
              Unlock your 
              <HilightedText text={"coading potential"}></HilightedText> with our online courses
            </div>
          }

          subheading={
            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
          }

          content1={
            {
              routeLocation : "/signup",
              active : true,
              desc : "Try it yourself"

            }
          }

          content2={
            {
              routeLocation : "/login",
              active : false,
              desc : "Learn more"

            }

          }
          codeblock = {
            `<!DOCTYPE html>\n<html>\nhead><title>Example<\n/title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\n
            nav><ahref="one/">One</a><ahref="two/">Two\n</a><ahref="three/">Three</a>\n/nav>`
          }
          codeColor={"text-yellow-25"}
          gradient={2}

          ></CodeBlock>
        </div>

        <CourseCards></CourseCards>

      </div>
      
      {/* section-2 */}
      <div className='bg-[#F9F9F9] text-richblack-700'>

          <div className='bgImage h-[250px] flex justify-center items-center'>
            <div className='w-11/12 max-w-maxContent mx-auto flex justify-center items-center'>
              <div className='flex justify-center items-center gap-7'>
                <CTABUtton routLocation={"/signup"} active={"true"}>
                  <div className="flex gap-2 items-center justify-center">
                    Explore Full Catalouge
                    <FaArrowRight></FaArrowRight>
                  </div>
                </CTABUtton>
                <CTABUtton>
                  <div>Learn more</div>
                </CTABUtton>
              </div>
            </div>
          </div>

          <div className='w-11/12 max-w-maxContent mx-auto mb-8 flex flex-col gap-10 mt-12 px-4 py-4'>
              <div className='flex flex-col md:flex-row justify-between mt-5 gap-[4rem]'>

                <div className='text-4xl font-semibold'>
                  Get the skills you need for a <HilightedText text={"job that is in demand."}></HilightedText>
                </div>

                <div className='flex flex-col gap-7 justify-between items-center'>

                  <div className='text-[16px]'>
                    The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                  </div>
                  <div>
                    <CTABUtton active={"true"} routLocation={"/signup"}>
                      Learn More
                    </CTABUtton>
                  </div>

                </div>

              </div>
              <TimeLineSection></TimeLineSection>
              <LearningLanguageSection></LearningLanguageSection>
          </div>
      </div>

      {/* section-3 */}
      <div className='flex flex-col w-11/12 max-w-maxContent justify-center items-center gap-14 my-14 bg-richblack-900  text-richblack-300  mx-auto'>
          <BecomeAnInstructor></BecomeAnInstructor>
          <h2 className='text-4xl font-semibold'>Reviews from other learners</h2>
          <CourseSlider></CourseSlider>
      </div>

       {/* section-4 */}

      <div>
      <Footer></Footer>

      </div>
    </div>
  )
}

export default HomePage;