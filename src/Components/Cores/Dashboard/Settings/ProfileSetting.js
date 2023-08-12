import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { GetAllDetailsOfUser, UpdatePrifilePicture } from '../../../../Services/Operations/UpdateProfile';
import { useForm } from 'react-hook-form';
import { setUser } from '../../../../Reducer/Slices/profileSlice';
import ProfileInformation from "./ProfileInformation"
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';

function ProfileSetting() {
    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [imageSource, setImageSource] = useState(user.image);
    const dispatch = useDispatch();
    const [remove, setRemove] = useState(false);
    //const [file, setFile] = useState();
    let file;

   
    const handleFileChange = (e) => {
       
        file = e.target.files[0];   
        console.log("Printing file123 : ", file);
        profilePhotoChangeHandler();
    }

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors},
        
    
    } = useForm();

    let responce
    
    const profilePhotoChangeHandler = async () => {
        const currentImage = getValues();
        if(currentImage != imageSource){
            setProfileImage();
        }
        console.log("After upating : ", user);
        
    }

    const setProfileImage = async()=>{
        setLoading(true); 
        try{
            const formData = new FormData();
            console.log("Printing file : ", file);

           
            formData.append("displayImage", file);
           
            
            console.log("printing form data : ", formData);

            responce = await UpdatePrifilePicture(formData,token);
            console.log("Printing responce : ", responce);
        
            console.log("before updating : ", user);

            if(responce != null){
                dispatch(setUser(responce));
                localStorage.setItem("user", JSON.stringify(responce))
                setImageSource(responce.image);
            }
           
            
        }catch(error){
            console.log("Error occured in updating the profile picture");
            console.error(error);
        }
        setLoading(false);
    }

    const handleRemoveProfile = async ()=>{
        setLoading(true);
        file =  `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName} ${user.lastName}`;
        setRemove(true);
        console.log("Printing file in remove button : ", file);
        setProfileImage();
    }

  return (
    <div className='text-white flex flex-col gap-10 mb-12'>
        <p className='text-[18px] font-[600] text-richblack-25'>
            Edit Profile
        </p>

        
         
        <div className='flex flex-col gap-7 max-w-[72%] justify-center items-center ml-12'>
            <div className='flex gap-7 flex-wrap w-[97%] bg-richblack-800 rounded-md border border-richblack-700 px-7 py-4'>
                <div>
                    <img src={imageSource} className='w-[65px] aspect-square rounded-full'></img>
                </div>
                <div className='flex flex-col gap-2'>
                    <p className='text-[15px] text-richblack-25'>Change Profile Picture</p>
                    <div className='flex gap-2'> 
                        <form className='flex gap-2 flex-wrap'>
                            <button className='px-3 py-1 text-richblack-900 text-[14px] bg-yellow-50 rounded-md cursor-pointer relative'>Change <input type='file' {...register("displayImage")} onChange={handleFileChange}  className=' w-[90px] h-[50px] absolute top-0 left-0 opacity-0 cursor-pointer'></input></button>  
                            <button onClick={handleRemoveProfile} className='px-3 py-1 text-[14px] text-richblack-50 bg-richblack-700 border border-richblack-100 rounded-md'>Remove</button>
                        </form> 
                        
                    </div>
                </div>
            </div>
            <div className='flex gap-7 bg-richblack-800 rounded-md border border-richblack-700 px-7 py-4'>
                <ProfileInformation></ProfileInformation>
            </div>
            <div className='flex gap-7 w-[97%] bg-richblack-800 rounded-md border border-richblack-700 px-7 py-4'>
                <ChangePassword></ChangePassword>
            </div>
            <div className='flex gap-7 bg-pink-900 rounded-md border border-pink-700 px-7 py-4'>
                <DeleteAccount></DeleteAccount>
            </div>
        </div>

        
        
    </div>
  )
}

export default ProfileSetting