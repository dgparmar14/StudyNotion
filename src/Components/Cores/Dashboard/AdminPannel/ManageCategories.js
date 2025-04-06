import React, { useEffect, useState } from 'react';
import { apiConnector } from '../../../../Services/apiConnector';
import { catagories, categoryEndpoint } from '../../../../Services/apis';
import CategoryCourseDetails from './CategoryCourseDetails';
import { toast } from 'react-toastify';
import CategoryModal from './CategoryModal';
import CategoryDetails from './CatrgoryDetails';

function ManageCategories() {
  const [categoryList, setCategpryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");

  useEffect(() => {
    try {
      const ftechCategoryList = async () => {
        setLoading(true);
        try {
          const result = await apiConnector("GET", catagories.CATAGORIES_API);
          // sort the categories based on number of courses
          const categories = result.data.data.sort((a, b) => b.courses.length - a.courses.length);
          setCategpryList(result.data.data);
          console.log("Category list", categories);
        } catch (error) {
          console.error("Could not fetch category list");
          console.log(error.message);
        }
        setLoading(false);
      };
      ftechCategoryList();
    } catch (error) {
      console.error("Error in useEffect:", error);
    }
  }, []);

  const createCategoryHandler = async () => {
    if (!newCategoryName.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }
    console.log("Creating category with name:", newCategoryName);
    console.log("Creating category with description:", newCategoryDescription);
    try {
      setLoading(true);

      const response = await apiConnector("POST", categoryEndpoint.CREATE_CATEGORY_API, {
        name: newCategoryName,
        description: newCategoryDescription,
      });
      // toast.success("Category created successfully");
      setCategpryList((prevList) => [...prevList,  response.data.data ]);
      setIsModalOpen(false);
      setNewCategoryName("");
      setNewCategoryDescription("");
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='w-full flex flex-col gap-4 items-center justify-center'>
        <div className='w-[90%] flex items-center justify-between p rounded-md'>
          <h1 className='text-richblack-5 text-[20px] font-semibold'>Manage Categories</h1>
          <button
            className='bg-yellow-200 text-black-5 px-4 py-2 rounded-md mt-2'
            onClick={() => setIsModalOpen(true)}
          >
            Add Category
          </button>
        </div>
        <div className='w-[90%] max-w-maxContent flex flex-col gap-2'>
          {
            categoryList.map((category, index) => (
              <CategoryDetails
                key={index}
                category={category}
              />
            ))
          }
        </div>
      </div>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={createCategoryHandler}
        newCategoryName={newCategoryName}
        setNewCategoryName={setNewCategoryName}
        newCategoryDescription={newCategoryDescription}
        setNewCategoryDescription={setNewCategoryDescription}
      />
    </div>
  );
}

export default ManageCategories;