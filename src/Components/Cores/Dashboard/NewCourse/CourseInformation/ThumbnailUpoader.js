import React from 'react'
import { useState } from 'react'
import { IoAirplane } from 'react-icons/io5'
import {SlCloudUpload} from "react-icons/sl"

function ThumbnailUpoader({name, label, setValues, getvalue, errors, register}) {

  const [file, setFile] = useState();
  const [uploadedFileUrl, setUploadedFileUrl] = useState();
  const [isUploaded, setIsUploaded] = useState(false);

  const handleChange = (event)=>{
    setFile(event.target.files[0]);
    console.log(file);
    // isUploaded(true);
  }

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <div className='flex flex-col gap-2 w-full h-[200px] bg-richblack-700 border-dashed border-richblack-600 rounded-md px-4 py-2 justify-center items-center'>
        {
          isUploaded ? (<div>
                            <img src={uploadedFileUrl} alt='Thumbnail Image'></img>
                            <button>Cancel</button>
                          </div>) :

                        (<div className='relative flex justify-center items-center'>
                            <input type='file' alt='Upload Thumbnail' onClick={handleChange} accept='image/jpeg image/png image/gif' className='absolute z-10 w-[40px] opacity-0'></input>
                            <div className='absolute w-[40px] aspect-square z-0 flex justify-center items-center bg-richblack-900 rounded-full'>
                              <SlCloudUpload className='text-yellow-100 scale-150'></SlCloudUpload>
                            </div>
                        </div>
                        
                        )
        }
      </div>
      
    </div>
  )
}

export default ThumbnailUpoader