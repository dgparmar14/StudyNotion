import React from 'react';

function CategoryModal({ isOpen, onClose, onSubmit, newCategoryName, setNewCategoryName, newCategoryDescription, setNewCategoryDescription }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md w-[90%] max-w-md">
        <h2 className="text-lg font-semibold mb-4">Create New Category</h2>
        <input
          type="text"
          placeholder="Enter category name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        <input
          type="text"
          placeholder="Enter description"
          value={newCategoryDescription}
          onChange={(e) => setNewCategoryDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        <div className="flex justify-end gap-2">
          <button
            className="bg-gray-300 px-4 py-2 rounded-md"
            onClick={() => {
              onClose();
              setNewCategoryName("");
              setNewCategoryDescription("");
            }}
          >
            Cancel
          </button>
          <button
            className="bg-yellow-200 px-4 py-2 rounded-md"
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
