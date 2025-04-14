import React, { useEffect, useState } from 'react';
import { getCategoryRequestsForAdmin, updateCategoryRequestStatus } from '../../../../Services/Operations/Category';
import { useSelector } from 'react-redux';
import { IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5';
import { RiLoader4Line } from 'react-icons/ri';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function CategoryRequests() {
  const { token } = useSelector((state) => state.auth);
  const [categoryRequests, setCategoryRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingIds, setProcessingIds] = useState(new Set());
  const [notification, setNotification] = useState(null);
  const [categoryName, setCategoryname] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");
    const [isCategoryCreateModalOpen, setIsCategoryRequestModal] = useState(false);
    const navigate = useNavigate();
    
    const handleCategoryCreation = async () => {
      try{
        const result = await cerate(categoryName, categoryDescription, token);
        console.log("Printing result : ". result);
        if(!result.success){
          throw new Error(result.message);
        }
        navigate(`/dashboard/quiz/0`);
      }catch(error){
        console.log(error)
        toast.error(error)
      }
    }
  useEffect(() => {
    const getCategoryRequests = async () => {
      setIsLoading(true);
      try {
        const response = await getCategoryRequestsForAdmin(token);
        setCategoryRequests(response.data);
      } catch (error) {
        console.error("Error fetching category requests for admin:", error);
        setError("Failed to load category requests. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    getCategoryRequests();
  }, [token]);

  const statusHandler = async (request, status) => {
    try {
      // Show processing state
      setProcessingIds(prev => new Set(prev).add(request._id));
      
      // Update the status in the request object
      request.status = status;
      
      // Call the API
      const response = await updateCategoryRequestStatus(request._id, request, token);
      
      if (response.success === true) {
        // Remove the updated request from the list
        setCategoryRequests((prevRequests) =>
          prevRequests.filter((req) => req._id !== request._id)
        );
        
        // Show success notification
        setNotification({
          type: 'success',
          message: `Category request ${status === 'approved' ? 'approved' : 'rejected'} successfully!`,
        });
      } else {
        throw new Error("Request failed");
      }
    } catch (error) {
      console.error("Error updating category request status:", error);
      setNotification({
        type: 'error',
        message: `Failed to ${status} category request. Please try again.`,
      });
    } finally {
      // Remove processing state
      setProcessingIds(prev => {
        const updated = new Set(prev);
        updated.delete(request._id);
        return updated;
      });
      
      // Auto-dismiss notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <RiLoader4Line className="animate-spin text-yellow-500 text-4xl" />
        <span className="ml-2 text-richblack-300">Loading requests...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 text-red-200 flex items-center">
        <HiOutlineExclamationCircle className="text-xl mr-2" />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-4 md:p-6 relative">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 sm:top-6 sm:right-6 p-3 sm:p-4 rounded-lg shadow-lg flex items-center transition-all duration-300 z-50 ${
          notification.type === 'success' ? 'bg-green-800 text-green-100' : 'bg-red-800 text-red-100'
        }`}>
          {notification.type === 'success' ? (
            <IoCheckmarkCircle className="mr-2 text-xl" />
          ) : (
            <IoCloseCircle className="mr-2 text-xl" />
          )}
          <p className="text-sm sm:text-base">{notification.message}</p>
        </div>
      )}

      <h2 className="text-xl sm:text-2xl font-bold text-richblack-5 mb-4 sm:mb-6">Category Requests</h2>
      
      {categoryRequests.length === 0 ? (
        <div className="bg-richblack-800 rounded-xl p-6 sm:p-8 text-center border border-richblack-700">
          <p className="text-richblack-300 text-base sm:text-lg">No pending category requests found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Header - Desktop & Tablet */}
          <div className="hidden md:grid md:grid-cols-12 gap-2 md:gap-4 px-4 md:px-6 py-3 bg-richblack-700 rounded-xl">
            <p className="text-richblack-50 text-sm md:text-base font-medium col-span-3">Category Name</p>
            <p className="text-richblack-50 text-sm md:text-base font-medium col-span-2">Requested By</p>
            <p className="text-richblack-50 text-sm md:text-base font-medium col-span-2">Requested On</p>
            <p className="text-richblack-50 text-sm md:text-base font-medium col-span-2">Status</p>
            <p className="text-richblack-50 text-sm md:text-base font-medium col-span-3">Actions</p>
          </div>

          {/* Requests */}
          <div className="space-y-3 sm:space-y-4">
            {categoryRequests.map((request) => (
              <div
                key={request._id}
                className="bg-richblack-800 rounded-xl shadow-md border border-richblack-700 overflow-hidden transition-all hover:shadow-lg hover:border-richblack-600"
              >
                {/* Mobile view - small screens */}
                <div className="block md:hidden p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
                    <h3 className="text-richblack-5 text-base sm:text-lg font-medium">{request.categoryName}</h3>
                    <span className={`self-start sm:self-auto px-2 sm:px-3 py-1 rounded-full text-xs font-medium
                      ${request.status === 'Pending' ? 'bg-yellow-600/30 text-yellow-300'
                        : request.status === 'Approved' ? 'bg-green-600/30 text-green-300'
                        : 'bg-red-600/30 text-red-300'}`}
                    >
                      {request.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-richblack-300 text-xs sm:text-sm">
                      <span className="text-richblack-200">Requested by:</span> {request.createdBy.firstName} {request.createdBy.lastName}
                    </p>
                    <p className="text-richblack-300 text-xs sm:text-sm">
                      <span className="text-richblack-200">Date:</span> {formatDate(request.createdOn)}
                    </p>
                  </div>
                  
                  <div className="flex flex-col xs:flex-row gap-2">
                    <button
                      onClick={() => statusHandler(request, 'approved')}
                      disabled={processingIds.has(request._id)}
                      className={`w-full px-3 py-2 rounded-lg text-sm ${
                        processingIds.has(request._id)
                          ? 'bg-richblack-600 text-richblack-300 cursor-not-allowed'
                          : 'bg-green-600 text-white hover:bg-green-500'
                      } transition-all flex justify-center items-center`}
                    >
                      {processingIds.has(request._id) ? (
                        <RiLoader4Line className="animate-spin mr-1" />
                      ) : (
                        <IoCheckmarkCircle className="mr-1" />
                      )}
                      Accept
                    </button>
                    <button
                      onClick={() => statusHandler(request, 'rejected')}
                      disabled={processingIds.has(request._id)}
                      className={`w-full px-3 py-2 rounded-lg text-sm ${
                        processingIds.has(request._id)
                          ? 'bg-richblack-600 text-richblack-300 cursor-not-allowed'
                          : 'bg-red-600 text-white hover:bg-red-500'
                      } transition-all flex justify-center items-center`}
                    >
                      {processingIds.has(request._id) ? (
                        <RiLoader4Line className="animate-spin mr-1" />
                      ) : (
                        <IoCloseCircle className="mr-1" />
                      )}
                      Reject
                    </button>
                  </div>
                </div>

                {/* Desktop view - medium screens and above */}
                <div className="hidden md:grid md:grid-cols-12 gap-2 lg:gap-4 p-4 md:p-6 items-center">
                  {/* Category Name */}
                  <div className="text-richblack-5 text-sm lg:text-base col-span-3 truncate" title={request.categoryName}>
                    {request.categoryName}
                  </div>

                  {/* Requested By */}
                  <div className="text-richblack-50 text-sm lg:text-base col-span-2 truncate" 
                       title={`${request.createdBy.firstName} ${request.createdBy.lastName}`}>
                    {request.createdBy.firstName} {request.createdBy.lastName}
                  </div>

                  {/* Requested On */}
                  <div className="text-richblack-50 text-sm lg:text-base col-span-2">
                    {formatDate(request.createdOn)}
                  </div>

                  {/* Status */}
                  <div className="col-span-2">
                    <span className={`inline-block px-2 lg:px-3 py-1 rounded-full text-xs font-medium
                      ${request.status === 'Pending' ? 'bg-yellow-600/30 text-yellow-300'
                        : request.status === 'Approved' ? 'bg-green-600/30 text-green-300'
                        : 'bg-red-600/30 text-red-300'}`}
                    >
                      {request.status}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 col-span-3">
                    <button
                      onClick={() => statusHandler(request, 'approved')}
                      disabled={processingIds.has(request._id)}
                      className={`px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg text-xs lg:text-sm ${
                        processingIds.has(request._id)
                          ? 'bg-richblack-600 text-richblack-300 cursor-not-allowed'
                          : 'bg-green-600 text-white hover:bg-green-500'
                      } transition-all flex items-center whitespace-nowrap`}
                    >
                      {processingIds.has(request._id) ? (
                        <RiLoader4Line className="animate-spin mr-1" />
                      ) : (
                        <IoCheckmarkCircle className="mr-1" />
                      )}
                      Accept
                    </button>
                    <button
                      onClick={() => statusHandler(request, 'rejected')}
                      disabled={processingIds.has(request._id)}
                      className={`px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg text-xs lg:text-sm ${
                        processingIds.has(request._id)
                          ? 'bg-richblack-600 text-richblack-300 cursor-not-allowed'
                          : 'bg-red-600 text-white hover:bg-red-500'
                      } transition-all flex items-center whitespace-nowrap`}
                    >
                      {processingIds.has(request._id) ? (
                        <RiLoader4Line className="animate-spin mr-1" />
                      ) : (
                        <IoCloseCircle className="mr-1" />
                      )}
                      Reject
                    </button>
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