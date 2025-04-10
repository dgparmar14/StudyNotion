import React, { useEffect } from 'react'
import { getCategoryRequestForUser } from '../Services/Operations/Category';
import { useSelector } from 'react-redux';

export default function CategoryRequestsByUser() {

  const [categoryRequests, setCategoryRequests] = React.useState([]);
  const { token } = useSelector((state) => state.auth);


  useEffect(() => {
    const fetchCategoryRequests = async (token) => {
      try {
        const response = await getCategoryRequestForUser(token);
        console.log("getCategoryRequestForUser ", response.data);
        setCategoryRequests(response.data);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('Error fetching category requests:', error);
      }
    };

    fetchCategoryRequests(token);
  }, [token]);

  return (
    <div>
      <h1 className='text-richblack-5 text-[30px] font-bold'>Category Requests</h1>
      <div className='flex flex-col gap-4 bg-richblack-800 p-2 rounded-md mt-4'>
        <div className='flex flex-row justify-between items-center bg-richblack-800 rounded-md px-4 py-2'>
          <h2 className='text-richblack-5 text-[20px] font-semibold'>Category Name</h2>
          <h2 className='text-richblack-5 text-[20px] font-semibold'>Status</h2>
        </div>
        {
          categoryRequests.map((request) => (
            <div key={request._id} className='flex flex-row justify-between items-center rounded-md px-4 py-2 border-b border-richblack-600'>
              <div>
                <h2 className='text-richblack-5 text-[20px] font-semibold'>
                  {request.categoryName.charAt(0).toUpperCase() + request.categoryName.slice(1)}
                </h2>
                <p className='text-richblack-400 text-[16px]'>
                  {new Date(request.createdOn).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <h2 className='text-richblack-5 text-[20px] font-semibold'>
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </h2>
            </div>
          ))
        }
      </div>
    </div>
  )
}
