import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {AiOutlineEyeInvisible} from "react-icons/ai";
import {MdOutlineVisibility} from "react-icons/md"
import { useDispatch } from 'react-redux';
import { login } from '../../../Services/Operations/authAPI';


function LoginForm({setIsLoggedIn}) {
  const [formData, setFormData] = useState({
    email:"",
    password:"",
   
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function changeHandler(event){
    setFormData((prev) => ({
      ...prev,
      [event.target.name] : event.target.value
    }))
  }
  function onSubmitHandler(event){
    event.preventDefault();
    dispatch(login(formData.email, formData.password, navigate));
  }

  const [passwordVisible, setPasswordVisible] = useState(false);
  function changePasswordVisible(){
    setPasswordVisible(passwordVisible);
  }
  const [accounttype, setAccountType] = useState("student");

  function studentClickHandler(){
    setAccountType("student");
  }
  function inStructorClickHandler(){
    setAccountType("instuctor");
  }


  return (
    <div className='bg-richblack-900 flex flex-col gap-6'>
      {/* <div className="flex rounded-3xl mt-3 border-richblack-700 bg-richblack-600 w-max">
                    <button className={`px-4 py-2 rounded-3xl ${accounttype ==="student" ? "bg-footer text-white" : "bg-richblack-600 text-richblack-100"}`} onClick={studentClickHandler}>Student</button>
                    <button className={`px-4 py-2 rounded-3xl ${accounttype === "instuctor" ? "bg-footer text-white" : "bg-richblack-600 text-richblack-100"}`} onClick={inStructorClickHandler}>Instructor</button>
      </div> */}
      <form className='flex flex-col gap-6 text-[15px] p-5' onSubmit={onSubmitHandler}>
        <label className='flex flex-col gap-1 w-[100%]'>
              <p>Email <sup className= " text-[#EF476F]">*</sup></p>
              <input type='email'
                      placeholder='abc@gmail.com'
                      value={formData.email}
                      name='email'
                      onChange={changeHandler}
                      required
                      className='bg-footer px-4 py-2 rounded-[8px] shadowBox'>
                  </input>
        </label>
          <label  className='flex flex-col gap-1 relative w-[100%]'>
                <p>Password <sup className= "text-[#EF476F]">*</sup></p>
                <input type={passwordVisible ? "text" : "password"}
                        value={formData.password}
                        name='password'
                        onChange={changeHandler}
                        required
                        className='bg-footer px-4 py-2 rounded-[8px] shadowBox'>
                    </input>
                    <div className='absolute right-4 top-9'>
                        {passwordVisible?(<AiOutlineEyeInvisible  onClick={changePasswordVisible} className="h-[20px] w-[20px]"></AiOutlineEyeInvisible>) : (<MdOutlineVisibility  onClick={changePasswordVisible} className="h-[20px] w-[20px]"></MdOutlineVisibility>)}
                    </div>
                    <Link to={"/forgotpassword"} className='text-[#47A5C5] text-[12px] flex justify-end'>Forgot Password</Link>
            </label>
            <div className="w-full"> 
                    <button className="w-full py-2 bg-yellow-50 rounded-md mt-3 mb-1 text-black font-semibold">Sign In</button>
            </div>

      </form>


    </div>
  )
}

export default LoginForm