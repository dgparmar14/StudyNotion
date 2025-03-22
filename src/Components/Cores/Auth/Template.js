import React from 'react'
import lines from "../../../assets/Images/frame.png"
import LoginForm from './Login';
import SignupForm from "./Signup"

function Templet({heading, subHeading1, subHeading2, image, setIsLoggedIn, type}) {
  return (
    <div className='w-11/12 max-w-fit flex flex-col md:flex-row gap-24 justify-between mx-auto px-4 py-4 mt-20'>

      <div className='bg-navbarBgColor flex gap-4 text-[#F1F2FF] flex-col md:w-[38%] p-5'>
        <div>
          <p className='text-3xl font-semibold'>{heading}</p>
          <p className='text-[17px] text-[#AFB2BF] mt-4'>
            {
              subHeading1+" "
            }
            <span className='text-[#47A5C5] font-"Edu SA Beginner" italic'>
              {
                subHeading2
              }
            </span>
          </p>
        </div>

        <div>
          {
            type=="login" ? <LoginForm setIsLoggedIn={setIsLoggedIn}></LoginForm> : <SignupForm setIsLoggedIn={setIsLoggedIn}></SignupForm>
          }
        </div>
      </div>

      <div className='relative'>
          <img src={lines} className='z-1 translate-x-4 translate-y-4 w-[90%]'></img>
          <img src={image} alt='Image' className='z-10 absolute left-0 top-0 w-[90%]'></img>
      </div>

    </div>
  )
}

export default Templet