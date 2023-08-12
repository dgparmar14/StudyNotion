import React from 'react'
import Hilighted from "../Components/Cores/Home/Highlighted"
import cover1 from "../assets/Images/aboutus1.webp"
import cover2 from "../assets/Images/aboutus2.webp"
import cover3 from "../assets/Images/aboutus3.webp"
import Quate from '../Components/Cores/About/Quate'
import FundingStory from "../assets/Images/FoundingStory.png"
import States from "../Components/Cores/About/States"
import LearningGrid from '../Components/Cores/About/LearningGrid'
import AboutForm from '../Components/Cores/About/AboutForm'
import Footer from '../Components/Common/Footer'
import ProfileAPI from "../Services/Operations/ProfileAPI";
import CourseSlider from '../Components/Cores/Home/CourseSlider'
function About() {
    const enrolledCourses = ProfileAPI.get
  return (
    <div className=''>
        {/* Section-1 */}
        <section className=' bg-richblack-800 pb-[18rem] mb-[70rem] lg:mb-0'>
            <div className='w-11/12 max-w-maxContent relative flex flex-col gap-5 mx-auto justify-center items-center pt-14'>
                <p className='text-richblack-5 text-4xl font-semibold w-[70%] text-center'>Driving Innovation in Online Education for a <Hilighted text={"Brighter Future"}></Hilighted> </p>
                <p className='text-[16px] text-richblack-200 text-center w-[62%] mt-2'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                <div className='flex gap-3 absolute top-[45%] translate-y-[50%] flex-col lg:flex-row'>
                    <img src={cover1} className=' w-[384px] h-[311px]'></img>
                    <img src={cover2} className=' w-[384px] h-[311px]'></img>
                    <img src={cover3} className=' w-[384px] h-[311px]'></img>
                </div>
            </div>
        </section>

        {/* Section-2 */}
        <section className='mt-24 pt-4 w-11/12 max-w-maxContent mx-auto mb-8'>
            <div>
                <Quate></Quate>
            </div>
        </section>

        {/* Section-3 */}
        <section>
            <div className='w-11/12 max-w-maxContent mx-auto mt-32 flex flex-col md:flex-row gap-32 justify-center items-center px-4 py-8'>
                <div className='md:w-[40%] flex w-[65%] flex-col gap-4'>
                    <p className='text-4xl font-bold pinkGradient'>Our Founding Story</p>
                    <p className='text-[16px]  text-richblack-200'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                    <p className='text-[16px]  text-richblack-200'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                </div>
                <div>
                    <img src={FundingStory}></img>
                </div>
            </div>
        </section>

        {/* Section-4 */}
        <section className='w-11/12 max-w-maxContent flex flex-col md:flex-row justify-center items-center mx-auto mt-24 px-8 py-8 gap-32'>
            <div className='md:w-[40%] w-[65%%] flex flex-col gap-4'>
                <p className='text-4xl font-bold yellowGradient'>Our Vision</p>
                <p className='text-[16px]  text-richblack-200'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
            </div>
            <div className='md:w-[40%] w-[65%] flex flex-col gap-4 text-4xl font-semibold'>
                <Hilighted text={"Our Mission"}></Hilighted>
                <p className='text-[16px] text-richblack-200 font-medium leading-[24px]'>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
            </div>
        </section>

        {/* Section-5 */}
        <section>
            <States></States>
        </section>

        {/* section-6 */}
        <section className='mt-12'>
            <LearningGrid></LearningGrid>
        </section>

        {/* section-7 */}
        <section className='mb-[3rem]'>
            <AboutForm></AboutForm>
        </section>

        {/* section-8 */}
        <section>
            <div className='w-11/12 max-w-maxContent mx-auto flex flex-col gap-12 mt-24 px-4 py-2 mb-[7rem] justify-center items-center'>
                <div>
                    <p className='text-4xl font-semibold text-richblack-5'>Reviews from other learners</p>
                    <CourseSlider></CourseSlider>
                </div>
            </div>
        </section>

        {/* section-9 */}
        <section>
            <Footer></Footer>
        </section>
    </div>
  )
}

export default About