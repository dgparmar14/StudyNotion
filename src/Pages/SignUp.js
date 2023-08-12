import React from 'react'
import image from "../assets/Images/signup.webp"
import Template from '../Components/Cores/Auth/Template'

function SignUp({setIsLoggedIn}) {
  return (
    <div>
      <Template
                  heading = {"Join the millions learning to code with StudyNotion for free"}
                  subHeading1={"Build skills for today, tomorrow, and beyond."}
                  subHeading2={"Education to future-proof your career"}
                  setIsLoggedIn={setIsLoggedIn}
                  image={image}
                  type={"signup"}></Template>
                
    </div>
  )
}

export default SignUp