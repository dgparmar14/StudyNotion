import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { apiConnector } from '../../Services/apiConnector';
import { contactusEndpoint } from '../../Services/apis';
import { toast } from 'react-hot-toast';
import countryCode from "../../data/countrycode.json"

function ContactForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState : {errors, isSubmitSuccessful}
    } = useForm();

    const [loading, setLoading] = useState();

    async function submitHandler(data){
      setLoading(true);
     
        // try{
        //   const{
        //     firstname,
        //     lastname,
        //     email,
        //     contactNumber,
        //     message
        //   }=data
        //   const responce = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, {firstname, lastname, email, contactNumber, message});
  
        //   if(!responce.data.success){
        //     toast.error("Error occured in contact");
        //     console.log("Could not connect");
        //   }
  
        //   toast.success('Email sent successfully');
        // }
        // catch(error){
        //   console.error("Error occured in contact us form");
        //   toast.error("Could not send email");
        // }
        try{
          setLoading(true);
          // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
          const response = {status:"OK"};
          console.log("Logging response", response);
          setLoading(false);
      }
      catch(error) {
          console.log("Error:" , error.message);
          setLoading(false);
      }
      }      
    
    useEffect( () => {
      if(isSubmitSuccessful) {
          reset({
              email:"",
              firstname:"",
              lastname:"",
              message:"",
              phoneNo:"",
          })
      }
  },[reset, isSubmitSuccessful] );
  return (
    <div>
      <form className='flex flex-col gap-5'>
        <div className='flex flex-wrap flex-row gap-2'>
            <div className='flex flex-col gap-1'>
              <label htmlFor='firstname' className='text-[14px] text-richblack-5'>First Name</label>
              <input type='text'
                      id="firstname"
                      name='firstname'
                      placeholder='Enter your name'
                      className='px-4 py-2 rounded-md bg-richblack-800 text-[14px] text-richblack-200'
                      {...register("firstname", {require:true})}>
              </input>
              {
                errors.firstname && (
                  <span>Please enter first name</span>
                )
              }
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor='lastname' className='text-[14px] text-richblack-5'>Last Name</label>
              <input type='text'
                      id="lastname"
                      name='lastname'
                      className='px-4 py-2 rounded-md bg-richblack-800 text-[14px] text-richblack-200'
                      placeholder='Enter your lastname'
                      {...register("lastname")}>
              </input>
            </div>
        </div> 

          <div className='flex flex-col gap-1'>
            <label htmlFor='email' className='text-[14px] text-richblack-5'>Email</label>
              <input type='email'
                      id="email"
                      name='email'
                      placeholder='Enter your email'
                      className='px-4 py-2 rounded-md bg-richblack-800 text-[14px] text-richblack-200'
                      {...register("email", {require:true})}>
              </input>
              {
                errors.email && (
                  <span>Please enter email</span>
                )
              }

          </div>
          <div className='flex flex-col gap-1'>
              <label htmlFor='contactNumber' className='text-[14px] text-richblack-5'>Contact Number</label>
              <div className='flex flex-row gap-3'>
                <select
                      name='dropedown'
                      id='dropedown'
                      className='px-5 py-2 bg-richblack-800 text-[14px] text-richblack-200 rounded-md w-[30%]'
                      {...register("dropedown", {required:true})}>
                        {
                          countryCode.map( (element, index) => {
                            return(<option key={index} value={"+"+element.code}>{element.code}</option>)
                          })
                        }
                </select>
                <input type='tel'
                        name='contactNumber'
                        id='contactNumber'
                        className='px-4 py-2 rounded-md bg-richblack-800 text-[14px] text-richblack-200 w-[100%]'
                        placeholder='Enter contact number'
                        {...register("phoneNo",  
                            {
                                required:{value:true, message:"Please enter Phone Number"},
                                maxLength: {value:10, message:"Invalid Phone Number"},
                                minLength:{value:8, message:"Invalid Phone Number"} })}>
                </input>
                
              </div>
              {
                    errors.phoneNo && (
                        <span>
                            {errors.contactNumber.message}
                        </span>
                    )
                }

          </div>
          <div className='flex flex-col gap-1'>
                <label htmlFor='message' className='text-[14px] text-richblack-5'>Message</label>
                <textarea 
                    name='message'
                    id='message'
                    cols="30"
                    rows="7"
                    placeholder='Enter Your message here'
                    className='px-4 py-2 rounded-md bg-richblack-800 text-[14px] text-richblack-200'
                    {...register("message", {required:true})}
                />
                {
                    errors.message && (
                        <span>
                            PLease enter your message.
                        </span>
                    )
                }
            </div>
            <button onClick={handleSubmit(submitHandler)} className='bg-yellow-200 rounded-md text-richblack-900 w-[100%] py-2 mt-3'>Send Message</button>

          
      </form>

    </div>
  )
}

export default ContactForm