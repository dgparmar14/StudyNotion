import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconButton from '../../Common/IconButton';
import { useNavigate } from 'react-router-dom';
import {FiEdit} from "react-icons/fi"
import getAllCourese from "../../../Services/Operations/ProfileAPI";

function Profile() {
    const {user} = useSelector( (state) => state.profile);
    const navigate = useNavigate();
    
  return (
    <div className=''>
        <p className='text-3xl font-semibold mx-5 text-richblack-5'>My Profile</p>
        <div className='md:w-7/12 mx-auto my-auto flex flex-col justify-center gap-5 mt-[2rem]'>
            
            <div className='flex flex-row flex-wrap justify-between bg-richblack-800 px-5 border border-richblack-500 py-3 items-center rounded-md text-richblack-200'>
                <div className='flex gap-5 flex-wrap justify-center items-center'>
                    <img src={user?.image} alt={`Profile-${user.firstName}`} className='w-[50px] h-[50px] rounded-full'></img>
                    <div className='flex flex-col gap-1'>
                        <p className='text-richblack-5 text-[16px] tracking-wide font-semibold'>{user.firstName+" "+user.lastName}</p>
                        <p className='text-[14px]'>{user.email}</p>
                </div>
 
                </div>
                
                <button onClick={()=>navigate("/dashboard/settings")} className='text-[14px] flex gap-1 mt-2 md:mt-0 px-4 justify-center font-semibold h-fit py-2 items-center rounded-md text-richblack-900 bg-yellow-200'>
                    <FiEdit></FiEdit>
                    Edit
                </button>
            </div>
            <div className='flex flex-wrap justify-between px-5 py-3 bg-richblack-800 border border-richblack-500 rounded-md'>
                <div className='flex flex-col gap-3 justify-between text-richblack-5'>
                    <div className='font-semibold text-richblack-5 text-[16px] tracking-wide'>About</div>
                    <div className='text-[15px] text-richblack-100 -mt-2'>
                        <div>{user.additioalDetails.about ? user.additioalDetails.about : "Add something about you"}</div>   
                    </div>
                </div>
               
                <button onClick={()=>navigate("/dashboard/settings")} className='text-[14px] flex gap-1 px-4 justify-center font-semibold h-fit py-2 items-center rounded-md text-richblack-900 bg-yellow-200'>
                    <FiEdit></FiEdit>
                    Edit
                </button>
            </div>
            <div className='flex flex-wrap justify-between items-start bg-richblack-800 rounded-md border border-richblack-500 px-5 py-4 mb-1'>
                <div className='flex flex-col gap-2'>
                    <div className='flex justify-between'>
                        <p className='text-richblack-5 font-semibold text-[16px] tracking-wide'>Personal Details</p>
                        
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 text-[14px] gap-4'>
                        <div className='flex flex-col'>
                            <p className='text-richblack-100'>First Name</p>
                            <p className='text-richblack-5'>{user?.firstName}</p>
                        </div>
                        <div className='flex flex-col'>
                            <p className='text-richblack-100'>Last Name</p>
                            <p className='text-richblack-5'>{user?.lastName}</p>
                        </div>

                        <div className='flex flex-col'> 
                            <p className='text-richblack-100'>Email</p>
                            <p className='text-richblack-5 text-justify'>{user?.email}</p>
                        </div>

                        <div className='flex flex-col'>
                            <p className='text-richblack-100'>Contact Number</p>
                            <p className='text-richblack-5'>{user?.additioalDetails?.contactNumber ? (user?.additioalDetails?.contactNumber) : ("Add contact number")}</p>
                        </div>
                        
                        <div className='flex flex-col'>
                            <p className='text-richblack-100'>Gender</p>
                            <p className='text-richblack-5'>{user?.additioalDetails?.gender ? (user?.additioalDetails?.gender) : ("Add gender")}</p>
                        </div>
                    
                        
                        <div className='flex flex-col'>
                            <p className='text-richblack-100'>Date of Birth</p>
                            <p className='text-richblack-5'>{user?.additioalDetails?.dob ? (user?.additioalDetails?.dob) : ("Add Date of Birth")}</p>
                        </div>
                    </div>
                </div>
                <button onClick={()=>navigate("/dashboard/settings")} className='text-[14px] mt-2 md:mt-0 flex gap-1 px-4 justify-center font-semibold h-fit py-2 items-center rounded-md text-richblack-900 bg-yellow-200'>
                    <FiEdit></FiEdit>
                    Edit
                </button>

            </div>
            
        </div>
    </div>
  )
}

export default Profile