import React, { useEffect, useState } from 'react'

const RequirementField = ({name, label, register, errors, setValue, getValues}) => {
    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);


    useEffect(()=> {
        register(name, {
            required:true,
            // validate: (value) => value.length > 0
        })
    },[])

    useEffect(()=> {
        setValue(name, requirementList);
    },[requirementList])

    const handleAddRequirement = () => {
        if(requirement) {
            setRequirementList([...requirementList, requirement]);
            //setRequirement("");
        }
    }

    const handleRemoveRequirement = (index) => {
        const updatedRequirementList = [...requirementList];
        updatedRequirementList.splice(index, 1);
        setRequirementList(updatedRequirementList);
    }

  return (
    <div className='flex flex-col gap-1'>

        <label htmlFor={name} className='text-[14px]  text-richblack-5'>{label}<sup className='text-pink-200'>*</sup></label>
        <div className='flex flex-col gap-1'>
            <input
                type='text'
                id={name}
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                className='w-full text-[14px] text-richblack-200 bg-richblack-700 rounded-md px-4 py-2'
            />
            <button
            type='button'
            onClick={handleAddRequirement}
            className='text-yellow-50 self-start font-[400]'>
                Add
            </button>
        </div>

        {
            requirementList.length > 0 && (
                <ul className='flex flex-col gap-1 text-richblack-5 text-[14px]'>
                    {
                        requirementList.length > 0 && (
                        requirementList.map((requirement, index) => (
                            <li key={index} className='flex gap-1'>
                                <span>{requirement}</span>
                                <button
                                type='button'
                                onClick={() => handleRemoveRequirement(index)}
                                className='text-xs text-pure-greys-300'>
                                    clear
                                </button>
                            </li>
                        ))
                        )
                    }
                
                </ul>
            )
        }
        {errors[name] && (
            <span>
                {label} is required
            </span>
        )}
      
    </div>
  )
}

export default RequirementField
