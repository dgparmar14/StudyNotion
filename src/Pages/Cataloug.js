import React, { useEffect, useState } from 'react'
import CourseSlider from '../Components/Cores/Home/CourseSlider'
import Footer from '../Components/Common/Footer'
import { useParams } from 'react-router-dom'
import { catagories } from '../Services/apis'

import { catalogPageDetails } from '../Services/Operations/CatalougPagedetailsAPI'
import { apiConnector } from '../Services/apiConnector';
import CategoryCard from '../Components/Cores/Cataloug/CategoryCard'
import CatagoryCourseSlider from '../Components/Cores/Cataloug/CatagoryCourseSlider'

const Catalog = () => {

    const {catagoryname} = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentTab, setCurrentTab] = useState("mostPopular")
    
    //Fetch all categories
    useEffect(()=> {
        const getCategories = async() => {
            setLoading(true);
            const res = await apiConnector("GET", catagories.CATAGORIES_API);
            const category_id = 
            res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catagoryname)[0]._id;
            setCategoryId(category_id);
            setLoading(false);
        }
        getCategories();
       
    },[catagoryname]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            setLoading(true);
            try{
                const res = await catalogPageDetails(categoryId);
                console.log("Printing res: ", res);
                setCatalogPageData(res);
                const dataArray = res.data.mostSellingCourses;
                console.log("Printing type of data array : ", typeof(dataArray));
            }
            catch(error) {
                console.log(error)
            }
            setLoading(false);
        }        
        getCategoryDetails();    
    },[categoryId]);

    if(loading){
        return (
            <div className='loading w-11/12 max-w-maxContent mx-auto flex justify-center items-center'>
            </div>
        )
    }
    
  return (
    <div>

        <div className='bg-richblack-800 py-12'>

            <div className='w-11/12 max-w-maxContent mx-auto flex gap-2 flex-col'>
                <p className='text-[15px] text-richblack-50'>{`Home / Catalog / `}
                <span className='text-[15px] text-yellow-100'>
                    {catalogPageData?.data?.selectedCategory?.name}
                </span></p>
                <p className='text-[22px] font-[500] tracking-wide text-richblack-5'> {catalogPageData?.data?.selectedCategory?.name} </p>
                <p className='text-[15px] text-richblack-50'> {catalogPageData?.data?.selectedCategory?.description}</p>

            </div>

        </div>

        <div className='w-11/12 mx-auto py-8'>
            {/* section1 */}
            <div className='flex flex-col gap-3'>
                <div className='text-[18px] font-[500] text-black'>Courses to get you started</div>
                <div className=' flex gap-x-3 text-richblack-25 text-[15px]'>
                    <div onClick={()=>{setCurrentTab("mostPopular")}} className={`${currentTab=="mostPopular" ? "text-yellow-100 border-b border-b-richblack-100" : "text-richblack-25"} cursor-pointer transition-all duration-200`}>Most Popular</div>
                    <div onClick={()=>(setCurrentTab("new"))} className={`${currentTab=="new" ? "text-yellow-100 border-b border-b-richblack-100" : "text-richblack-500"} cursor-pointer transition-all duration-200`}>New</div>
                   
                </div>
                <div className='h-[1px] w-[100%] bg-richblack-700 -mt-[12px]'></div>
                <div className='mt-2'>
                    <CatagoryCourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses} />
                </div>
            </div>  

                {/* section2 */}
            <div className='flex flex-col gap-2 py-7'>
                <div className='text-[18px] font-[500] text-white'>Top Courses in {catalogPageData?.data?.selectedCategory?.name}</div> 

                <div >
                    <CatagoryCourseSlider Courses={catalogPageData?.data?.differentCategory.courses}/>
                </div>     
              
            </div>
            {/* section3 */}
            <div className='flex flex-col gap-2 min-w-maxContent'>
                <div className='text-[18px] font-[500] text-white'>Frequently Bought</div>
                <div className='mt-4 max-w-fit'>

                    <div className='flex flex-wrap max-w-[1000px] gap-7'>

                        {
                        catalogPageData?.data?.mostSellingCourses.slice(0,4)
                            .map((course, index) => (
                                <CategoryCard Course={course} key={index} Height={"h-[300px]"}/>
                            ))
                        }

                    </div>

                </div>
            </div>
           
        </div>   
        <Footer />
     </div>
  )
}
export default Catalog













