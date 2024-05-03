import React from 'react'
import { useSelector } from 'react-redux'
import RenderItems from './RenderItems'
import RenderTotalPrice from './RenderTotalPrice'

function Cart() {
    const {totalItems, total} = useSelector((state) => state.cart)
    const {cart} = useSelector((state)=>state.cart);
    //console.log("Printing cart : ", cart);
  return (
    <div className=''>
        <p className='text-3xl font-semibold text-richblack-5 -mt-3'>My Wishlist</p>
        <p className='text-[15px] text-richblack-100 mt-5'>{totalItems} items in cart</p>
        
        {
            totalItems>0 ? (
                <div className='flex flex-wrap justify-between border-t border-t-richblack-400 mt-4'>
                    
                    <RenderItems></RenderItems>
                    <RenderTotalPrice></RenderTotalPrice>
                </div>
            ) : (
                <div className='mx-auto mt-2  my-auto text-richblack-5 text-[18px] font-[400]'>Cart is empty</div>
            )
        }
    </div>
  )
}

export default Cart