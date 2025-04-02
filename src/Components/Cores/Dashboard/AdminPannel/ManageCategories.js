import React, { useEffect, useState } from 'react'
import { apiConnector } from '../../../../Services/apiConnector';
import { catagories } from '../../../../Services/apis';
import CategoryCourseDetails from './CategoryCourseDetails';

function ManageCategories() {

  const [categoryList, setCategpryList] = useState([])
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState("");



  useEffect(() => {
    try {
      const ftechCategoryList = async () => {
        setLoading(true);
        try {
          const result = await apiConnector("GET", catagories.CATAGORIES_API);
          setCategpryList(result.data.data);
          console.log("Category list", result.data.data)
          // const category_id = 
          // result?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === ct.name)[0]._id;
          // setCategoryId(category_id);
          // console.log("Category id: ", category_id);
        } catch (error) {
          console.error("Could not fetch category list");
          console.log(error.message);
        }
        setLoading(false);
      };
      ftechCategoryList();
    }
    catch (error) {

    }
  }, [])

  return (
    <div>
      <div className='w-full flex flex-col gap-4 items-center justify-center'>
        <h1 className='text-richblack-5 text-[20px] font-semibold'>Manage Categories</h1>
        <div className='w-[90%] max-w-maxContent flex flex-col gap-2'>
          {
            categoryList.map((category, index) => (
              <CategoryCourseDetails
                key={index}
                category={category}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ManageCategories