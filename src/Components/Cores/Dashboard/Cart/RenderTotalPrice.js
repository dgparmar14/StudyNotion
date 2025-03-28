import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { buyCourse } from '../../../../Services/Operations/StudetUtilityAPI';
import { useNavigate } from 'react-router-dom';


function RenderTotalPrice() {
    const {total, cart} = useSelector( (state) => state.cart);
    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    function clickHandler(){
        const courses = cart.map((course)=>course._id);
        buyCourse(token, courses, user, navigate, dispatch)
    }
  return (
    <div className='md:w-[300px] w-[100%] h-[200px] px-7 py-2 bg-richblack-800 mt-2 border gap-2 border-richblack-400 rounded-md flex justify-center flex-col'>
        <p className='text-richblack-200 text-[15px]'>Total :</p>
        <p className='text-[18px] text-yellow-100'>Rs. <span>{total}</span></p>
        {/* <p className='text-richblack-200 text-[15px] line-through'>Rs. 3500</p> */}
        <button onClick={clickHandler} className='px-4 py-1 bg-yellow-200 rounded-md font-[500] text-richblack-900 text-[14px]'>Buy now</button>
    </div>
  )
}

export default RenderTotalPrice