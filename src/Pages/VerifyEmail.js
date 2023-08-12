import React, { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux'
import { setSignUpData } from '../Reducer/Slices/authSlice';
import { signUp } from '../Services/Operations/authAPI';
import { Link, useNavigate } from 'react-router-dom';
import { MdRestore } from 'react-icons/md';
import { SendOTP } from '../Services/Operations/authAPI';
import { IoMdArrowBack } from 'react-icons/io';


function VerifyEmail() {
    const { signupData, loader } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [otp, setOTP] = useState("");

    useEffect(() => {
        // Only allow access of this route when user has filled the signup form
        if (!signupData) {
          navigate("/signup");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    
    
    const {
        accounttype,
        firstName,
        lastName,
        email,
        password,
        confirmpassword,
      } = signupData;
  
    function submitHandler(event){
        event.preventDefault();
        

        dispatch(signUp(accounttype,
            firstName,
            lastName,
            email,
            password,
            confirmpassword,
            otp,
            navigate))
        
    }

   
  
    
  return (
    <div className='w-11/12 max-w-maxContent flex justify-center items-center h-[90vh] mx-auto text-richblack-5'>
        {
            loader ? (<div>Loading</div>) : (
                <div className='flex flex-col gap-5 justify-center'>
                    <p className='text-3xl font-bold'>
                        Verify email
                    </p>
                    <p className='text-[18px] text-richblack-200'>
                        A verification code has been sent to you. Enter the code below
                    </p>
                    <form onSubmit={submitHandler} className='flex flex-col gap-4'>
                    <OtpInput
                        value={otp}
                        onChange={setOTP}
                        numInputs={6}
                        renderSeparator={<span className='opacity-0'>---</span>}
                        renderInput={(props) => <input {...props}  placeholder="-"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"/>}
                    />
                        <button type='submit' className='text-[17px] font-medium bg-yellow-200 rounded-md transition-all duration-200 text-richblack-900 py-2 mt-4'>Verify Email</button>
                    </form>
                    <div className='flex justify-between items-center'>
                        <Link to={"/login"} className='flex gap-2 items-center text-richblack-5 justify-start font-medium tracking-wide'>
                            <IoMdArrowBack></IoMdArrowBack>
                            Back to login
                        </Link>
                        <button onClick={() => (dispatch(SendOTP(email, navigate)))} className='flex gap-2 justify-center items-center text-blue-100'>
                            <MdRestore></MdRestore>
                        Resend
                        </button>
                    </div>
                    
                </div>
            )
        }

    </div>
  )
}

export default VerifyEmail