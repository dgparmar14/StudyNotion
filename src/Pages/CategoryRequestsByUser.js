import React, { useEffect, useState } from 'react';
import { createCategoryRequest, deleteCategoryRequest, getCategoryRequestForUser } from '../Services/Operations/Category';
import { useSelector } from 'react-redux';
import { MdDeleteForever } from "react-icons/md";
import { FaExclamationCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import CategoryModal from '../Components/Cores/Dashboard/AdminPannel/CategoryModal';
import { apiConnector } from '../Services/apiConnector';
import { categoryEndpoint } from '../Services/apis';

export default function CategoryRequestsByUser() {
  const [categoryRequests, setCategoryRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const [categoryName, setCategoryname] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [isCategoryCreateModalOpen, setIsCategoryRequestModal] = useState(false);
  const navigate = useNavigate();
  
  const handleCategoryCreation = async () => {
    try{
      const response = await apiConnector("POST", categoryEndpoint.CREATE_CATEGORY_API, {
        name: categoryName,
        description : categoryDescription
      });
      console.log("Printing create category response : ", response)
      if(!response.data.success){
        throw new Error("Categpry cannot be created");
      }
      navigate(`/dashboard/quiz/0`);
    }catch(error){
      console.log(error)
      toast.error(error)
    }
  }

  useEffect(() => {
    const fetchCategoryRequests = async () => {
      setIsLoading(true);
      try {
        const response = await getCategoryRequestForUser(token);
        console.log("getCategoryRequestForUser ", response.data);
        
        if (response.data) {
          setCategoryRequests(response.data);
        } else {
          throw new Error('No data received');
        }
        setIsCategoryRequestModal(true);
      } catch (error) {
        console.error('Error fetching category requests:', error);
        setError('Failed to load category requests. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryRequests();
  }, [token]);

  const deleteCategoryHandler = async (requestId) => {
    try {
      console.log("Deleting category request:", requestId);
      const response = await deleteCategoryRequest(requestId, token);
      console.log("Delete category request response:", response);
      
      // Update the UI by removing the deleted request
      setCategoryRequests(prevRequests => 
        prevRequests.filter(request => request._id !== requestId)
      );
    } catch (error) {
      console.error("Error deleting category request:", error);
    }
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'approved':
        return 'text-green-500';
      case 'pending':
        return 'text-yellow-500';
      case 'rejected':
        return 'text-red-500';
      default:
        return 'text-richblack-5';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-5 p-4">
      <h1 className="text-richblack-5 text-2xl font-medium mb-5">Category Requests</h1>
      
      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <div className="flex items-center">
            <FaExclamationCircle className="mr-2" />
            <span className="text-base">{error}</span>
          </div>
        </div>
      ) : categoryRequests.length === 0 ? (
        <div className="bg-richblack-800 p-6 rounded-lg text-center">
          <p className="text-richblack-300 text-base">No category requests found.</p>
        </div>
      ) : (
        <div className="bg-richblack-900 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-richblack-700 px-6 py-3 border-b border-richblack-600">
            <div className="grid grid-cols-3 gap-4">
              <h2 className="text-richblack-5 text-lg">Category Name</h2>
              <h2 className="text-richblack-5 text-lg text-center">Created On</h2>
              <h2 className="text-richblack-5 text-lg text-right">Status</h2>
            </div>
          </div>
          
          <div className="divide-y divide-richblack-700">
            {categoryRequests.map((request) => (
              <div 
                key={request._id} 
                className="px-6 py-4 hover:bg-richblack-800 transition-colors duration-200"
              >
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div>
                    <h3 className="text-richblack-5 text-base">
                      {request.categoryName.charAt(0).toUpperCase() + request.categoryName.slice(1)}
                    </h3>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-richblack-300 text-sm">
                      {new Date(request.createdOn).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  
                  <div className="flex justify-end items-center gap-4">
                    <span className={`text-base ${getStatusColor(request.status)}`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                    
                    {
                      request.status == 'Pending' && (
                        <button 
                      className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-richblack-700"
                      onClick={() => deleteCategoryHandler(request._id)}
                      title="Delete Request"
                    >
                      <MdDeleteForever size={22} />
                    </button>
                      )
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {
        isCategoryCreateModalOpen && (
          <CategoryModal
            isOpen={isCategoryCreateModalOpen}
            onClose={()=>setIsCategoryRequestModal(false)}
            onSubmit={handleCategoryCreation}
            newCategoryName = {categoryName}
            setNewCategoryName = {setCategoryname}
            newCategoryDescription = {categoryDescription}
            setNewCategoryDescription = {setCategoryDescription}
          />
        )
      }
    </div>
  );
}