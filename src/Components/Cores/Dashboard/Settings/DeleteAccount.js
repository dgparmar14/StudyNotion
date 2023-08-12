import React from 'react'
import { useState } from 'react';
import {RiDeleteBinLine} from "react-icons/ri"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteProfile } from '../../../../Services/Operations/UpdateProfile';
import DeleteAccountModal from "./DeleteAccountModal";
import Modal from '../../../Common/Modal';
import { logout } from '../../../../Services/Operations/authAPI';

function DeleteAccount() {
    const [confirmationModal, setConfirmationModal] = useState(false);
    const {token} = useSelector((state)=>state.auth)
    const dispatch = useDispatch;
    const navigate = useNavigate();
   
    const onDeleteHandler = async(token, dispatch, navigate)=>{

        try{
            const responce = await deleteProfile(token, dispatch, navigate);
            setConfirmationModal(null);
            dispatch(logout(navigate));
            console.log("Account deleted successfully");
        }catch(error){
            console.log("Error occred while deleting an account");
        }
    }
  return (
    <div>
        <button onClick={()=>{
                                    setConfirmationModal({
                                        text1 : "Are you sure",
                                        text2 : "Deleting this account may lead to deletion of all your created cources or you may deleted from your purchased cources",
                                        button1Text: "Delete",
                                        button2Text: "Cancel",
                                        button1Handler: () => {onDeleteHandler(token, dispatch, navigate)},
                                        button2Handler: () => {setConfirmationModal(null)}
                                    })
                                }}>
            <div className='flex flex-wrap justify-center items-center md:items-start gap-4'>
                <div className='flex justify-center items-center w-[40px] h-[40px] aspect-square rounded-full bg-pink-700 border border-pink-200'>
                    <RiDeleteBinLine className='text-[20px] text-pink-200'></RiDeleteBinLine>
                </div>
                <div className='flex flex-col gap-1 items-start'>
                    <p className='text-[15px] text-rihblack-25'>Delete Account</p>
                    <div className='flex flex-col items-start text-[13px] text-richblack-25'>
                        <p>Would you like to delete your account?</p>
                        <p> This account contain Paid Courses. Deleting your account may remove all the contains accosiated with it.</p>
                    </div>
                    <p className='text-[15px] text-pink-200 italic'>I want to delete my account.</p>
                </div>
            </div> 
        </button>
        {
            confirmationModal ? (<Modal modalData={confirmationModal}></Modal>) : (<div></div>)
        }
    </div>
    
  )
}

export default DeleteAccount