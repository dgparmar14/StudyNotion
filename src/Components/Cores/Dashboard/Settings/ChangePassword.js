import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { MdOutlineVisibility } from 'react-icons/md';
import { updatePassword } from '../../../../Services/Operations/UpdateProfile';
import { useSelector } from 'react-redux';


function ChangePassword() {

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showChangePassword, setShowChangepassword] = useState(false);
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state)=>state.profile);

    const [loading, setLoading] = useState(false);

    const {
        setValue,
        getValues,
        handleSubmit,
        register,
        formState : {errors}
    } = useForm();

    const onSubmitHandler = async() => {
        setLoading(true);
        try{
            const formData = new FormData();
            const currentValues = getValues();

            formData.append("currentPassword", currentValues.currentPassword);
            formData.append("changePassword", currentValues.currentPassword);

            const responce = await updatePassword(formData, token);
            console.log("Password Updated successully");



        }catch(error){
            console.log("Error occured while uodating password");
            console.error(error);

        }
        setLoading(false);
    }

  return (
    <div className='flex flex-col gap-4 w-[100%]'>
    <p>Change Password</p>
    {
        !loading && 
        <form className='flex justify-between flex-col gap-4 w-[100%]'>
            <div className='flex flex-wrap md:flex-nowrap justify-between gap-4'>
                <div className='flex gap-1 flex-col w-[90%]'>
                    <label htmlFor='currentPassword' className='text-richblack-25 text-[14px]'>Current Password <sup className='text-pink-200'>*</sup></label>
                    <div className='relative'>
                        <input type={showCurrentPassword ? "text" : "password"} id='currentPassword'
                            placeholder='********' {...register("currentPassword", {required:true})}
                            className='bg-richblack-700 text-[14px] text-richblack-50 w-[100%] px-4 py-2 rounded-md'></input>
                        <div className='absolute right-3 top-[9px] text-richblack-50'>
                            {showCurrentPassword ? (<AiOutlineEyeInvisible  onClick={()=>(setShowCurrentPassword(false))}  className="h-[20px] w-[20px]"></AiOutlineEyeInvisible>) : (<MdOutlineVisibility  onClick={()=>(setShowCurrentPassword(true))} className="h-[20px] w-[20px]"></MdOutlineVisibility>)}
                        </div>
                        {
                            errors.currentPassword && <span className='text-[12px] text-pink-200'>Enter valid password**</span>
                        }
                    </div>
                    
                </div>
                <div className='flex gap-1 flex-col w-[90%]'>
                    <label htmlFor='changePassword' className='text-richblack-25 text-[14px]'>Change Password <sup className='text-pink-200'>*</sup></label>
                    <div className='relative'>
                        <input type={showCurrentPassword ? "text" : "password"} id='changePassword'
                            placeholder='********' {...register("changePassword", {required:true})} 
                            className='bg-richblack-700 text-[14px] text-richblack-50 px-4 py-2 w-[100%] rounded-md'></input>
                        <div className='absolute right-3 top-[9px]'>
                            {showChangePassword ? (<AiOutlineEyeInvisible  onClick={()=>(setShowChangepassword(false))}  className="h-[20px] w-[20px]"></AiOutlineEyeInvisible>) : (<MdOutlineVisibility  onClick={()=>(setShowChangepassword(true))} className="h-[20px] w-[20px]"></MdOutlineVisibility>)}
                        </div>
                        {
                            errors.ChangePassword && <span className='text-[12px] text-pink-200'>Enter valid password**</span>
                        }
                    </div>
                </div>

            </div>
            
            <button onClick={handleSubmit(onSubmitHandler)} className='text-[14px] mt-4 text-richblack-900 self-end bg-yellow-100 rounded-md px-4 py-1'>Change</button>
        </form>

    }
        
    </div>
  )
}

export default ChangePassword