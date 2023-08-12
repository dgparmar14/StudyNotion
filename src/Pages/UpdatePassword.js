import React, { useState } from 'react'
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { MdOutlineVisibility } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {BsCheckCircleFill} from "react-icons/bs"
import { IoMdArrowBack } from 'react-icons/io';
import {changePassword} from "../Services/Operations/authAPI";


function ResetPassword() {

    const {loading} = useSelector( (state) => state.auth);
    const location = useLocation();
    const dispatch = useDispatch();
    const token = location.pathname.split('/').at(-1);
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        password : "",
        confirmPassword : ""
    })
    function changeHandler(event){
        setFormData( (prev) => ({
            ...prev,
            [event.target.name] : event.target.value
        }))
    }

    function submitHandler(event){
        event.preventDefault();
        dispatch(changePassword(formData.password, formData.confirmPassword, token, navigate));
    }

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    function changePasswordVisible(){
        setPasswordVisible(!passwordVisible);
    }
    function changeConfirmPasswordVisible(){
        setConfirmPasswordVisible(!confirmPasswordVisible);
    }
 
    
  return (
    <div className='w-11/12 max-w-maxContent mx-auto h-[90vh] flex justify-center items-center'>
        {
            loading ? (<div>Loading</div>) : (
                <div className='flex flex-col gap-4 px-2 py-2 justify-center w-[80%] lg:w-[40%]'>
            <p className='text-3xl font-semibold text-richblack-5'>Choose  new password</p>
            <p className='text-[18px] text-richblack-200'>Almost done. Enter your new password and youre all set.</p>
            <form onSubmit={submitHandler} className='flex flex-col gap-2 justify-center'>
                <label className='flex flex-col gap-2 relative text-[16px]'>
                    <p className='text-richblack-5'>New password<sup className='text-pink-200'>*</sup></p>
                    <input type={passwordVisible ? "text" : "password"}
                            value={formData.password}
                            name='password'
                            required
                            onChange={changeHandler}
                            className='px-2 py-2 bg-richblack-700 text-richblack-5 rounded-md'>
                    </input>
                    <div className='text-richblack-5 absolute top-11 right-3'>
                        {
                            passwordVisible ? (<AiOutlineEyeInvisible onClick={changePasswordVisible}></AiOutlineEyeInvisible>) : (<MdOutlineVisibility onClick={changePasswordVisible}></MdOutlineVisibility>)
                        }
                    </div>

                </label>
                <label className='flex flex-col gap-2 relative text-[16px]'>
                    <p className='text-richblack-5'>Confirm password<sup className='text-pink-200'>*</sup></p>
                    <input type={passwordVisible ? "text" : "password"}
                            value={formData.confirmPassword}
                            name='confirmPassword'
                            required
                            onChange={changeHandler}
                            className='px-2 py-2 bg-richblack-700 text-richblack-5 rounded-md'>
                    </input>
                    <div className='text-richblack-5 absolute top-11 right-3'>
                        {
                            passwordVisible ? (<AiOutlineEyeInvisible onClick={changeConfirmPasswordVisible}></AiOutlineEyeInvisible>) : (<MdOutlineVisibility onClick={changeConfirmPasswordVisible}></MdOutlineVisibility>)
                        }
                    </div>

                </label>
                <div>
                    <ul className='text-[14px] text-[#05A77B] grid grid-cols-2 gap-y-3 mt-4'>
                        <li className='flex gap-2 items-center'>
                            <BsCheckCircleFill></BsCheckCircleFill>
                            <p>one lowercase character</p>
                        </li>
                        <li className='flex gap-2 items-center'>
                            <BsCheckCircleFill></BsCheckCircleFill>
                            <p>one special character</p>
                        </li>
                        <li className='flex gap-2 items-center'>
                            <BsCheckCircleFill></BsCheckCircleFill>
                            <p>one uppercase character</p>
                        </li>
                        <li className='flex gap-2 items-center'>
                            <BsCheckCircleFill></BsCheckCircleFill>
                            <p>8 character minimum</p>
                        </li>
                        <li className='flex gap-2 items-center'>
                            <BsCheckCircleFill></BsCheckCircleFill>
                            <p>one number</p>
                        </li>
                    </ul>
                </div>
                <button className='bg-yellow-200 text-richblack-900 py-2 rounded-md mt-4 transition-all duration-200 hover:scale-105'>Reset Password</button>
            </form> 
            <div>
                <Link to={"/login"} className='flex gap-3 items-center text-richblack-5 justify-start font-medium tracking-wide'>
                    <IoMdArrowBack></IoMdArrowBack>
                    Back to login
                </Link>
            </div>
           

        </div>
            )
        }    
    </div>
  )
}

export default ResetPassword