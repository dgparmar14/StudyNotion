import React from 'react'
import { useDispatch } from 'react-redux';
import { NavLink, matchPath, useLocation, useNavigate } from 'react-router-dom';
// import * as Icons from "react-icons/vsc"
function SidebarLinks({link, iconName}) {

    // const Icon = Icons[iconName]
    const location = useLocation();
   

    function matchRoute(path){
        return matchPath({path:path}, location.pathname);
    }

  return (
    <NavLink to={link.path} className={`${matchRoute(link.path) ? "bg-yellow-800 " : "bg-transparent"} w-full py-2 text-sm relative`}>
        <span className={`w-[0.2rem] h-full bg-yellow-50 absolute left-0 top-0 ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}></span>
        <div className='flex gap-2 ml-3 px-3 text-[15px] text-richblack-200'>
            {/* <Icon></Icon> */}
            {link.name}
        </div>
    </NavLink>
  )
}


export default SidebarLinks



