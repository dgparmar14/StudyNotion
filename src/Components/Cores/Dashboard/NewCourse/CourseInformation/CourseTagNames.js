
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { IoHandLeft } from 'react-icons/io5';
import {RxCross2} from "react-icons/rx"

function CourseTagNames({name,label, register, errors, setValue, getValues}) {
   

    const [tag, setTag] = useState("");
    const [tagList, setTagList] = useState([]);

    useEffect(()=>{
        register(name, {
            required:true
        }, [])
    })
    
    useEffect(()=>{
        setValue(name, tagList);
    }, [tagList]);

    const addToTagList=()=>{
        if(tag){
            setTagList([...tagList, tag]);
            setTag("");
        }
    }  

    const removeTag = (index)=>{
        let updateTagList = [...tagList];
        updateTagList.splice(index, 1);
        setTagList(updateTagList)
  }
return (
    <div className='flex flex-col gap-1'>
        <label htmlFor={name} className='text-[14px] text-richblack-5'>{label}<sup className='text-pink-200'>*</sup></label>
        <div className='flex gap-3 flex-col-reverse'>
            <input
                    id={name}
                    value={tag}
                    onChange={(e)=>{setTag(e.target.value)}}
                    onKeyDown={(e)=>{
                        if(e.key==='Enter'){
                            e.preventDefault();
                            console.log("here");
                           addToTagList();
                        }
                    }}
                    className='bg-richblack-700 text-richblack-100 text-[14px] px-4 py-2 rounded-md'
                    ></input>

            <div className='flex gap-1 text-[12px] text-richblack-5'>
                {

                    tagList.length>0 && tagList.map((element, index)=>{
                        return(
                            <div key={index} className='flex gap-2 px-2 py-1 bg-yellow-400 border border-richblack-5 rounded-2xl'>
                                <p>{element}</p>
                                <button onClick={()=>{removeTag(index)}}><RxCross2></RxCross2></button>
                            </div>
                        )
                    })
                }
            </div>        
            
        </div>



    </div>
  )
}

export default CourseTagNames