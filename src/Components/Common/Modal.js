import React from 'react'
import IconButton from './IconButton'

function Modal({modalData}) {
  return (
    <div className="fixed  inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
        <div className='flex flex-col gap-2 px-7 py-3 rounded-md border border-richblack-400 bg-richblack-800'>
            <p className='text-[20px] text-richblack-5 font-semibold'>{modalData.text1}</p>
            <p className='text-richblack-100 text-[15px]'>{modalData.text2}</p>
            <div className='flex gap-3 mt-4 mb-3 justify-center items-center'>
              <button onClick={modalData.button1Handler} className='px-4 py-1 rounded-md text-richblack-900 bg-yellow-100 cursor-pointer'>{modalData.button1Text}</button>
              <button onClick={modalData.button2Handler} className='px-4 py-1 rounded-md text-richblack-5 bg-richblack-700 cursor-pointer'>{modalData.button2Text}</button>
            </div>
        </div>
    </div>
  )
}

export default Modal