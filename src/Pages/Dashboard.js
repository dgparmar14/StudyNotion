import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/Cores/Dashboard/Sidebar';

function Dashboard() {
    const {loader : authLoading} = useSelector( (state) => state.auth);
    const {loader : profileLoading} = useSelector( (state) => state.profile);

    if(authLoading || profileLoading){
        return (
            <div className='w-full flex justify-center items-center'>Loading..............</div>
        )
    }


    return (
        <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
            <Sidebar></Sidebar>
            <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                <div className="mx-auto w-11/12 max-w-[1000px] py-10">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard