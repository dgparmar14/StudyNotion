import React, { useEffect, useState } from 'react'
import { getCategoryRequestsForAdmin, updateCategoryRequestStatus } from '../../../../Services/Operations/Category'
import { useSelector } from 'react-redux'

export default function CategoryRequests() {
  const { token } = useSelector((state) => state.auth)
  const [categoryRequests, setCategoryRequests] = useState([])

  useEffect(() => {
    const getCategoryRequests = async (token) => {
      try {
        const response = await getCategoryRequestsForAdmin(token)
        setCategoryRequests(response.data)
      } catch (error) {
        console.error("Error fetching category requests for admin:", error)
      }
    }
    getCategoryRequests(token)
  }, [token])

  const statusHandler = async (request, status) => {
    try {
      request.status = status; // Update the status in the request object
      const response = await updateCategoryRequestStatus(request._id, request, token); // Call the API
      console.log("Response inside handler", response);

      if (response.success === true) {
        // Remove the updated request from the categoryRequests state
        setCategoryRequests((prevRequests) =>
          prevRequests.filter((req) => req._id !== request._id)
        );
        console.log("Category request updated and removed from the list");
      }
    } catch (error) {
      console.error("Error updating category request status:", error);
    }
  };

  return (
    <div className="p-6">
      {
        categoryRequests.length > 0 ? (
          <div>
            <h2 className="text-3xl font-bold text-richblack-100 mb-6">Category Requests</h2>

            {/* Header */}
            <div className="hidden md:grid grid-cols-5 gap-4 px-6 py-3 bg-richblack-700 rounded-2xl mb-2">
              <p className="text-richblack-200 text-sm font-semibold">Category Name</p>
              <p className="text-richblack-200 text-sm font-semibold">Requested By</p>
              <p className="text-richblack-200 text-sm font-semibold">Requested On</p>
              <p className="text-richblack-200 text-sm font-semibold">Status</p>
              <p className="text-richblack-200 text-sm font-semibold">Actions</p>
            </div>

            {/* Requests */}
            <div className="space-y-4">
              {
                categoryRequests.map((request) => (
                  <div
                    key={request._id}
                    className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-richblack-800 p-6 rounded-2xl shadow-md border border-richblack-600 hover:shadow-lg transition-shadow"
                  >
                    {/* Category Name */}
                    <div className="text-white font-semibold truncate">{request.categoryName}</div>

                    {/* Requested By */}
                    <div className="text-white font-semibold truncate">
                      {request.createdBy.firstName + " " + request.createdBy.lastName}
                    </div>

                    {/* Requested On */}
                    <div className="text-white font-semibold">
                      {new Date(request.createdOn).toLocaleDateString()}
                    </div>

                    {/* Status */}
                    <div>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold
                        ${request.status === 'Pending' ? 'bg-yellow-700 text-yellow-200'
                          : request.status === 'Approved' ? 'bg-green-700 text-green-200'
                          : 'bg-red-700 text-red-200'}`}
                      >
                        {request.status}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => statusHandler(request, 'approved')}
                        className="px-4 py-2 text-sm rounded-xl bg-green-600 text-white hover:bg-green-500 transition-all"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => statusHandler(request, 'rejected')}
                        className="px-4 py-2 text-sm rounded-xl bg-red-600 text-white hover:bg-red-500 transition-all"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        ) : (
          <p className="text-richblack-200">No category requests found.</p>
        )
      }
    </div>
  )
}
