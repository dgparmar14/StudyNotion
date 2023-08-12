import React from 'react'
import image from "../assets/Images/login.webp"
import Template from '../Components/Cores/Auth/Template'

function Login({setIsLoggedIn}) {
  return (
    <div>
      <Template
                  heading = {"Welcome Back"}
                  subHeading1={"Build skills for today, tomorrow, and beyond."}
                  subHeading2={"Education to future-proof your career"}
                  setIsLoggedIn={setIsLoggedIn}
                  image={image}
                  type={"login"}></Template>
                
    </div>
  )
}

export default Login