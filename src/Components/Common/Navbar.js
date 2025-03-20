import React from 'react'
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import {NavbarLinks} from "../../data/navbar-links";
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom';
import {AiOutlineShoppingCart} from "react-icons/ai"
import ProfileDropedown from '../Cores/Auth/ProfileDropedown';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { apiConnector } from '../../Services/apiConnector';
import { catagories } from '../../Services/apis';
import { useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io"

// const catalog = [
//     {
//         title : "Python",
//         link : "/catalog/python"
//     },
//     {
//         title : "Web dev",
//         link : "/cataloug/web-development"
//     }
// ]

function Navbar() {
    const {token} = useSelector( (state) => state.auth);
    const {user} = useSelector( (state) => state.profile);
    const {totalItems} = useSelector( (state) => state.cart);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    function matchRoute(route){
        return matchPath({path : route},location.pathname)
    }   

    const [subLinks, setSubLinks] = useState([]);
   
    const fetchSubLinks = async()=>{
        setLoading(true);
        try{
            const result = await apiConnector("GET", catagories.CATAGORIES_API);
           
            setSubLinks(result.data.data);

        }catch(error){
            console.error("Could not fetch category list");
            console.log(error.message);
        }
        setLoading(false);
    }

  
    useEffect(() => {
        fetchSubLinks();
    },[])
  return (  
    
    <div className='w-[100%] flex bg-opacity-95 justify-between items-center  px-[30px] py-2 shadow-[rgba(0,0,0,0.89)_0px_25px_20px_-20px] bg-navbarBgColor '>
        <div>
            <img src={Logo} className='h-[35px]'></img>
        </div>
        <div>
        {
            <ul className='flex gap-4 text-[15px]'>
                {
                    NavbarLinks.map( (link, index) => (
                        <li key={index}>
                            {
                                link.title==="Catalog" ? (
                                    <div onClick={(e)=>e.stopPropagation()} className='flex gap-2 relative items-center group'>
                                        <p className='text-richblack-50'>
                                            {
                                                link.title
                                            }
                                        </p>
                                        <IoIosArrowDown className='text-richblack-100'></IoIosArrowDown>
                                        <div className='absolute lg:w-[250px] z-[1000] invisible group-hover:visible hover:block hover:visible hover:opacity-100 bg-richblack-5 group-hover:opacity-100 transition-all duration-200 text-richblack-900 top-[80%] translate-y-2 -translate-x-[50%] px-2 rounded py-2'>   
                                        <div className='absolute w-[20px] aspect-square  rotate-45 rounded left-[75%]  z-0 -top-[5%] bg-richblack-5'></div>
                                        <div className='flex flex-col z-[1000]'>
                                            {
                                                subLinks.map((catagory, index) => (
                                                    <Link to={`/catalouge/${catagory.name.split(" ").join("-").toLowerCase()}`} key={index} className='hover:bg-richblack-200 px-3 py-2 rounded-md'>{catagory.name}</Link>
                                                ))
                                            }

                                        </div>
                                        
                                        </div>

                                </div>
                                  

                                ) : (
                                    <Link to={link?.path} className={`${matchRoute(link.path)? "text-green" : "text-white"}`}>
                                    {
                                        link.title
                                    }
                                    </Link>
                                )
                            }
                        </li>
                    ))
                }
            </ul>
           
        }
        </div>

        <div className='flex gap-4 justify-center items-center'>
            {
                user && user.accountType != "Instructor" && (
                    <button onClick={()=>navigate("/dashboard/cart")} className='relative z-40'>
                        <AiOutlineShoppingCart className=' text-richblack-5 z-40 text-[24px] w-[38px]'></AiOutlineShoppingCart>
                        {
                            totalItems > 0 && (
                                <span className='absolute text-[12px] px-[6px] aspect-square -z-10 left-3 -top-3 rounded-full bg-yellow-100'>
                                    {
                                        totalItems
                                    }
                                </span>
                            )
                            
                        }

                    </button>
                    
                )
            }
            {
                token === null && (
                    <Link to={"/signUp"}>
                        <button className=' bg-green border cursor-pointer border-richblack-700 px-4 py-1 text-white text-[14px] rounded-md'>Sign Up</button>
                    </Link>
                )
            }
            {
                token === null && (
                    <Link to={"/login"}>
                        <button className=' bg-green border border-richblack-700 cursor-pointer px-2 py-1 text-white text-[14px] rounded-md'>Log in</button>
                    </Link>
                )
            }
            {
                token !== null && <ProfileDropedown></ProfileDropedown>
            }
        </div>
    </div>


    
  )
}

export default Navbar

