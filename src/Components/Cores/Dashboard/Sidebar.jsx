import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {sidebarLinks} from "../../../data/dashboard-links"
import SidebarLinks from './SidebarLinks';
import { logout } from '../../../Services/Operations/authAPI';
import {VscSignOut} from "react-icons/vsc"
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {VscSettingsGear} from "react-icons/vsc"
import Modal from '../../Common/Modal';

function Sidebar() {

    const {user, loader:profileLoading} = useSelector( (state) => state.profile);
    const {loade : authLoading} = useSelector( (state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [confirmationModal, setConfirmationModal] = useState(null);

    if(authLoading || profileLoading){
        return (
            <div className='w-full flex justify-center items-center'>Loading..............</div>
        )
    }


  return (
    <div>
        <div className='min-h-[calc(100vh-3.5rem)] min-w-[222px] border-r-[1px] border-r-richblack-700 flex gap-2 flex-col bg-richblack-800 py-10'>
            {
                sidebarLinks.map( (link, index) => {
                    if(link.type && user?.accountType !== link.type) return null;
                        return (
                            <SidebarLinks key={link.id}  link={link} iconName={link.icon}/>
                        )
                })
            }
            <div className='w-10/12 mt-3 mx-auto h-[1px] bg-richblack-600'>
           
            <NavLink to={"/dashboard/settings"} className="mt-7 ml-2 flex gap-2 text-richblack-200 items-center text-[15px]">
                <VscSettingsGear></VscSettingsGear>
                Settings
            </NavLink>
            <button
                onClick={()=> setConfirmationModal({
                    text1 : "Are you sure",
                    text2 : "You will be logged out from your account",
                    button1Text: "Logout",
                    button2Text: "Cancel",
                    button1Handler: () => dispatch(logout(navigate)),
                    button2Handler: () =>setConfirmationModal(null)
                })} className='text-white text-[15px] flex gap-2 ml-2 justify-center items-center mt-3'>
                
                    <VscSignOut></VscSignOut>
                    <span>Logout</span>
                

            </button>
        </div>
        </div>
        
        {confirmationModal && <Modal modalData={confirmationModal}></Modal>}

    </div>
  )
}

export default Sidebar