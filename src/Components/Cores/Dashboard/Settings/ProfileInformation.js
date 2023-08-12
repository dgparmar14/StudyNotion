import React from 'react'
import { useForm } from 'react-hook-form'
import { FcEngineering } from 'react-icons/fc';
import countrycode from "../../../../data/countrycode.json"
import { useDispatch, useSelector } from 'react-redux';
import { UpdateProfile } from '../../../../Services/Operations/UpdateProfile';
import { setUser } from '../../../../Reducer/Slices/profileSlice';
import { useState } from 'react';
function ProfileInformation() {
    const {
        setValue,
        getValues,
        register,
        handleSubmit,
        formState : {errors}
    } = useForm();

    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);


    const profession = [
       {
        professionName : "Developer",
        prof : "developer"
       },
       {
        professionName : "Software Engineer",
        prof : "softwareEngineer"
       },
       {
        professionName : "Teacher",
        prof : "=teacher"
       },
       {
        professionName : "Student",
        prof : "student"
       }
    ];

    const isFormUpdated = ()=>{
        const currentValues = getValues();

        if(user.firstName != currentValues.firstName){
            return true;
        }
        else if(user.additioalDetails.profession != currentValues.profession){
            return true;
        }
        else if(user.additioalDetails.dob != currentValues.birthDate){
            return true;
        }
        else if(user.additioalDetails.gender != currentValues.gender){
            return true;
        }
        else if(user.additioalDetails.contactNumber != currentValues.phoneNumber){
            return true;
        }
        else if(user.additioalDetails.about != currentValues.description){
            return true;
        }
        else {
            return false;
        }
    }

    const onSubmitHandler = async()=>{
        if(isFormUpdated()){
            setLoading(true);
            try{
                const formData = new FormData();
                const currentValues= getValues();
                if(user.firstName != currentValues.firstName){
                    formData.append("firstName", currentValues.firstName);
                }
                else{
                    formData.append("forstName", user.firstName);
                }

               (user.additioalDetails.profession != currentValues.profession) ? formData.append("profession", currentValues.profession) : formData.append("profession", user.additioalDetails.profession);

               (user.additioalDetails.dob != currentValues.birthDate) ? formData.append("birthDate", currentValues.birthDate) : formData.append("birthDate", user.additioalDetails.dob);

               (user.additioalDetails.gender != currentValues.gender) ? formData.append("gender", currentValues.gender) : formData.append("gender", user.additioalDetails.gender);

               (user.additioalDetails.contactNumber != currentValues.phoneNumber) ? formData.append("phoneNumber", currentValues.phoneNumber) : formData.append("phoneNumber", user.additioalDetails.contactNumber);

               (user.additioalDetails.about != currentValues.description) ? formData.append("description", currentValues.description) : formData.append("description", user.additioalDetails.about);

               const userProfileUpdate = await UpdateProfile(formData, token);
               console.log("Printing user profile update api responce : ", userProfileUpdate);

               if(userProfileUpdate){
                    dispatch(setUser(userProfileUpdate.updatedUser));
                    console.log("Printing user after updating profile : ", user);
               }

            }catch(error){
                console.log("Eror occured while updating the profile");
                console.error(error);
            }
            setLoading(false);

        }
    }
        
  return (
    <div>
        <div className='flex flex-col'>
            <p>Profile Information</p>
            <form className='flex gap-4 flex-col w-[100%]' onSubmit={handleSubmit(onSubmitHandler)}>
                <div className='flex flex-wrap md:flex-nowrap justify-between gap-4'>
                    <div className='flex gap-1 flex-col md:w-[90%]'>
                        <label htmlFor='firstName' className='text-[14px] text-richblack-5'>First Name</label>
                        <input id='firstName' {...register("firstName")}
                        placeholder='*******' className='text-richblack-50 bg-richblack-700 px-4 py-2 text-[14px] rounded-md'></input>
                        <div className='text-[12px] text-richblack-100'>Named emtered above will be used at all certifies</div>
                    </div>
                    <div className='flex gap-1 flex-col md:w-[90%]'>
                        <label htmlFor='profession' className='text-[14px] text-richblack-5'>Profession</label>
                        <select id='profession' {...register("profession")}
                             className='text-richblack-50 bg-richblack-700 px-4 py-2 text-[14px] rounded-md'>
                        {
                            profession.map((occupation, index)=>{
                                return(
                                    <option key={index} value={occupation.prof}>{occupation.professionName}</option>
                                )
                                
                            })
                        }
                        </select>
                    </div>
                </div>
                <div className='flex flex-wrap md:flex-nowrap gap-4 justify-between'>

                    <div className='flex gap-1 flex-col w-[90%]'>
                        <label htmlFor='birthDate' className='text-[14px] text-richblack-5'>Date of Birth</label>
                        <input type='date' id='birthDate' {...register("birthDate")} className='text-richblack-50 bg-richblack-700 px-4 py-2 text-[14px] rounded-md'></input>
                    </div>

                    <div className='flex gap-1 flex-col w-[90%]'>
                        <label htmlFor='gender' className='text-[14px] text-richblack-5'>Gender</label>
                        <div className='flex justify-between text-[14px] text-richblack-50 px-4 py-2 bg-richblack-700 rounded-md'>
                            <div className='flex justify-center items-center gap-1'>
                                <input type='radio' {...register("gender")}
                                    value="Male" name='gender' 
                                    className='text-richblack-50 radio bg-richblack-800 px-4 py-2 text-[14px] rounded-md'>   
                                </input> Male
                               
                            </div>

                            <div className='flex justify-center items-center gap-1'>
                                <input type='radio' {...register("gender")}
                                value="Female" name='gender' className='text-richblack-50 bg-richblack-800 px-4 py-2 text-[14px] rounded-md'>   
                                </input> Female
                            </div>

                            <div className='flex justify-center items-center gap-1'>
                                <input type='radio' {...register("gender")}
                                value="Other" name='gender' className='text-richblack-50 bg-richblack-800 px-4 py-2 text-[14px] rounded-md'>   
                                </input> Other
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-wrap md:flex-nowrap gap-4 justify-between'>
                    <div className='w-[90%] flex flex-col gap-1'>
                        <label htmlFor='phoneNumber' className='text-[14px] text-richblack-5'>Phone Number</label>
                        <div className='flex gap-2'>
                            <select id='countryCode'
                            {...register("countryCode")}
                            className='text-richblack-50 w-[40%] bg-richblack-700 px-4 py-2 text-[14px] rounded-md'>
                            {
                                countrycode.map((country, index)=>{
                                    return(
                                        <option key={index} value={country.code}>{country.code}</option>
                                    )
                                })
                            }
                            
                            </select>
                            <input type='tel' placeholder='1234567891' 
                                maxLength={10} minLength={10} id='phoneNumber'
                                {...register("phoneNumber")}
                                pattern='[0-9]{10}'
                                className='text-richblack-50 w-[100%] bg-richblack-700 px-4 py-2 text-[14px] rounded-md'></input>
                            {
                                errors.phoneNumber &&
                                <span className='text-pink-200 text-[14px]'>Enter Valid Phone Number **</span>                   
                            }
                        </div>
     
                    </div>
                    <div className='flex gap-1 flex-col w-[90%]'>
                        <label htmlFor='description' className='text-[14px] text-richblack-5'>Discription</label>
                        <input id='description' {...register("description")}
                        placeholder='Enter about your self' className='text-richblack-50 bg-richblack-700 px-4 py-2 text-[14px] rounded-md'></input>
                    </div>
                </div>

                <button type='submit' className='text-[14px] font-[500] px-4 py-1 mt-3 bg-yellow-50 rounded-md text-richblack-900 self-end'>Update</button>
            </form>
        </div>
    </div>
  )
}

export default ProfileInformation