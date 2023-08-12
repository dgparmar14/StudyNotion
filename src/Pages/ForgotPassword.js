import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {IoMdArrowBack} from "react-icons/io"
import { getPasswordResetToken } from '../Services/Operations/authAPI';

function ResetPassword() {
    const dispatch = useDispatch();
    const {loading} = useSelector( (state) => state.auth)
    const [emailSent, setEmailSent] = useState("");
    const [email, setEmail] = useState(null)
    function onSubmitHandler(e){
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent))
    }
  return (
    <div className='flex w-11/12 max-w-maxContent mx-auto flex-col items-center gap-4 h-[90vh] justify-center'>
        {
            loading  ? ( <div className='flex justify Center items-center text-3xl w-[50%] lg:w-[30%] font-semibold'> Loading....</div>) : (
                <div className='flex flex-col gap-4 justify-center w-[30%]'>
                    <h1 className='text-richblack-5 text-4xl text-semibold'>
                        {
                            !emailSent ? ("Reset your password") : "Check your email"
                        }
                    </h1>
                    <div className='text-[17px] text-richblack-200'>
                        {
                            !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : (`We have sent the reset email to ${email}`)
                        }
                    </div>
                    <form onSubmit={onSubmitHandler}>
                        <div className='text-richblack-5 text-[14px]'>
                            {
                                !emailSent &&
                                (
                                    
                                        <label className='flex flex-col gap-2'>
                                            <p>Email <sup className='text-pink-200'>*</sup></p>
                                            <input type='email'
                                                    name="email"
                                                    value={email}
                                                    onChange={(e)=>setEmail(e.target.value)}
                                                    required
                                                    placeholder='Enter Your Email Id'
                                                    className='px-4 py-[12px] rounded-md bg-richblack-800'
                                                    ></input>
                                        </label>

                                
                                    
                                )
                            }
                        </div>
                        <div>
                            <button type='submit' className='w-full bg-yellow-200 text-richblack-900 text-[16px] rounded-md mt-3 hover:scale-105 transition-all duration-200 py-2'>
                                {
                                    !emailSent ? "Reset Password" : "Resend Email "
                                }
                            </button>
                    </div>
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