import React, { useState } from "react";

function CategoryRequestModal({ isOpen, onClose, onConfirm }) {
   const [categoryName, setCategoryName] = useState("");
 
   if (!isOpen) return null;
 
   return (
     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
       <div className="w-[350px] rounded-md border border-gray-600 bg-richblack-800 px-6 py-4 shadow-lg">
         {/* Modal Header */}
         <h2 className="text-xl font-semibold text-white mb-3">Enter Category Name</h2>
 
         {/* Input Field */}
         <input
           type="text"
           placeholder="Category Name"
           value={categoryName}
           onChange={(e) => setCategoryName(e.target.value)}
           className="w-full rounded-md bg-richblack-700 px-3 py-2 text-white-100 focus:outline-none"
         />
 
         {/* Buttons */}
         <div className="mt-4 flex justify-end gap-3">
           <button
             onClick={onClose}  // Removed the false argument
             className="px-4 py-1 text-white bg-gray-600 rounded-md hover:bg-gray-500"
           >
             Cancel
           </button>
           <button
             onClick={() => {
               onConfirm(categoryName);
               setCategoryName(""); // Clear input after confirmation
             }}
             className="px-4 py-1 text-richblack-900 bg-yellow-100 rounded-md hover:bg-yellow-200"
           >
             Confirm
           </button>
         </div>
       </div>
     </div>
   );
 }


export default CategoryRequestModal;
