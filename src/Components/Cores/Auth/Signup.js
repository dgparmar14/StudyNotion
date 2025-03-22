import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import CountryCode from "../../../data/countrycode.json"
import {AiOutlineEyeInvisible} from "react-icons/ai"
import {MdOutlineVisibility} from "react-icons/md"
import { setSignUpData } from '../../../Reducer/Slices/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { SendOTP } from '../../../Services/Operations/authAPI'
import {ACCOUNT_TYPE} from "../../../Utils/Constants"
import Tabs from '../../Common/Tabs'

function SignUpForm({setIsLoggedIn}) {
    const [formData, setFormData] = useState({
        firstName : "",
        lastName : '',
        email : "",
        password : "",
        confirmpassword : "", 
    });
   

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    
    function changeHandler(event){
        setFormData((prev) => ({
            ...prev,
            [event.target.name] : event.target.value
        }))
    }
    const [accounttype, setAccountType] = useState("student");

    function studentClickHandler(){
        setAccountType("student");
        
    }
    function inStructorClickHandler(){
        setAccountType("instuctor");
        
    }

    function submitHandler(event){
        event.preventDefault();
        if(formData.password!==formData.confirmpassword){
            event.preventDefault();
            toast.error("Password do not matched");
            return;
        }

        const signData = {
            ...formData,
            accounttype,
        }
      
        dispatch(setSignUpData(signData));
        dispatch(SendOTP(formData.email, navigate));

        //Reset
        setFormData({
            firstName : "",
            lastName : '',
            email : "",
            password : "",
            confirmPassword : "", 

        })
        setAccountType(ACCOUNT_TYPE.STUDENT)
    }

    const tabData = [
        {
          id: 1,
          tabName: "Student",
          type: ACCOUNT_TYPE.STUDENT,
        },
        {
          id: 2,
          tabName: "Instructor",
          type: ACCOUNT_TYPE.INSTRUCTOR,
        },
      ]


    function onPasswordVisibleChange(){
        setPasswordVisible(!passwordVisible)
    }
    function onConfirmPasswordChange(){
        setConfirmPasswordVisible(!confirmPasswordVisible);
    }
  return (
    <div>
       <Tabs tabData={tabData} field={accounttype} setField={setAccountType} />
    <form onSubmit={submitHandler} className='flex gap-6 text-[15px] flex-col mt-8'>
    <div className='flex gap-4 w-[100%]'>
        <label className='flex flex-col gap-1 w-[50%]'>
            <p>First Name <sup className= "text-[#EF476F]">*</sup> </p>
            <input type='text'
                    placeholder='Anchal'
                    value={formData.firstName}
                    name='firstName'
                    onChange={changeHandler}
                    className='bg-white px-4 py-1 rounded-[8px] shadowBox text-black'
                
                    required>
                </input>
        </label>
        <label className='flex flex-col gap-1 w-[50%]'>
            <p>Last Name <sup className= "text-[#EF476F]">*</sup> </p>
            <input type='text'
                    placeholder='Patel'
                    value={formData.lastName}
                    name='lastName'
                    onChange={changeHandler}
                    required
                    className='bg-white px-4 py-1 rounded-[8px] shadowBox text-black'>
                </input>
        </label>

    </div>
       
        <label className='flex flex-col gap-1'>
            <p>Email <sup className= "text-[#EF476F]">*</sup></p>
            <input type='email'
                    placeholder='abc@gmail.com'
                    value={formData.email}
                    name='email'
                    onChange={changeHandler}
                    required
                    className='bg-white px-4 py-1 rounded-[8px] shadowBox text-black'>
                </input>
        </label>
        {/* <label className='flex flex-col gap-1 w-[100%]'>
            <p>Phone Number <sup className= "text-[#EF476F]">*</sup></p>
            <div className='flex gap-4'>
                <select id='countryCode' value={formData.countryCode} required name='countryCode' onChange={changeHandler} className='bg-white w-[20%] px-4 py-1 rounded-[8px] shadowBox'>
                    {   
                        CountryCode.map((element, index) => {
                            return(
                                <option key={index} value={element.code}>
                                    {
                                        element.code
                                    }
                                </option>
                            )
                        })

                    }
                </select>
                <input  type="tel"
                        placeholder='9023346608'
                        value={formData.contactnumber}
                        name='contactnumber'
                        onChange={changeHandler}
                        maxLength={10}
                        minLength={10}
                        required
                        className='bg-white px-4 w-full py-1 rounded-[8px] shadowBox'>
                    </input>
                </div>
                
        </label> */}

        <div className='flex gap-4 w-[100%]'>
            <label  className='flex flex-col gap-1 relative w-[50%]'>
                <p>Password <sup className= "text-[#EF476F]">*</sup></p>
                <input type={passwordVisible ? "text" : "password"}
                        value={formData.password}
                        name='password'
                        onChange={changeHandler}
                        required
                        className='bg-white px-4 py-1 rounded-[8px] shadowBox text-black'>
                    </input>
                    <div className='absolute right-4 top-8'>
                        {passwordVisible?(<AiOutlineEyeInvisible  onClick={onPasswordVisibleChange} className="h-[20px] w-[20px]"></AiOutlineEyeInvisible>) : (<MdOutlineVisibility  onClick={onPasswordVisibleChange} className="h-[20px] w-[20px]"></MdOutlineVisibility>)}
                    </div>
            </label>
            <label  className='flex flex-col gap-1 w-[50%] relative'>
                <p>Confirm Password <sup className= "text-[#EF476F]">*</sup></p>
                <input type={confirmPasswordVisible ? "text" : "password"}
                        value={formData.confirmpassword}
                        name='confirmpassword'
                        onChange={changeHandler}
                        required
                        className='bg-white px-4 py-1 rounded-[8px] shadowBox text-black'>
                    </input>
                    <div className='absolute right-3 top-8'>
                        {confirmPasswordVisible?(<AiOutlineEyeInvisible  onClick={onConfirmPasswordChange} className="h-[20px] w-[20px]"></AiOutlineEyeInvisible>) : (<MdOutlineVisibility  onClick={onConfirmPasswordChange} className="h-[20px] w-[20px]"></MdOutlineVisibility>)}
                    </div>
            </label>
        </div>
        
        <div className="w-full"> 
                    <button className="w-full py-2 bg-green rounded-md mt-3 mb-1 text-white font-semibold">Create Account</button>
        </div>
    </form>

    </div>
  )
}

export default SignUpForm