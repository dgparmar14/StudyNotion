import React from 'react';

function CategoryModal({ isOpen, onClose, onSubmit, newCategoryName, setNewCategoryName, newCategoryDescription, setNewCategoryDescription}) {
  if (!isOpen) return null;

  return (
    <div className="fixed  inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="border-richblack-400 flex gap-2 flex-col bg-richblack-800 text-richblack-5 p-6 rounded-md shadow-md w-[90%] max-w-md">
        <h2 className="text-lg font-semibold mb-4">Create New Category</h2>
       <div className='flex gap-2 flex-col'>
          <label className='text-richblack-50'>Category Name <span className='text-pink-200'>*</span></label>
          <input
              required={true}
              type="text"
              placeholder="Enter category name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="px-4 py-2 text-[14px] text-richblack-5 bg-richblack-700 rounded-md shadow-sm shadow-richblack-600 w-full"
            />
        </div>
        <div className='flex gap-2 flex-col'>
          <label className='text-richblack-50'>Category Description <span className='text-pink-200'>*</span></label>
          <textarea
          type="text"
          placeholder="Enter description"
          value={newCategoryDescription}
          onChange={(e) => setNewCategoryDescription(e.target.value)}
          className="px-4 py-2 text-[14px] text-richblack-5 bg-richblack-700 rounded-md shadow-sm shadow-richblack-600 w-full"
        />
        </div>
      
        <div className="flex justify-end gap-2 mt-4">
          <button
            className=" bg-gray-700 px-4 py-2 rounded-md"
            onClick={() => {
              onClose();
              setNewCategoryName("");
              setNewCategoryDescription("");
            }}
          >
            Cancel
          </button>
          <button
            className="bg-yellow-50 px-4 py-2 rounded-md"
            onClick={onSubmit}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryModal;
