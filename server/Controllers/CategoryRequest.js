const { default: mongoose } = require("mongoose")
const CategoryRequest = require("../Models/CategoryRequest")

exports.createCategoryRequest = async (req, res) => {
   try {
      const { categoryName } = req.body;

      // Ensure req.user exists and has an id
      if (!req.user || !req.user.id) {
         return res.status(401).json({
            success: false,
            message: "Unauthorized: User not found"
         });
      }

      const userId = req.user.id;

      // Validate category name
      if (!categoryName) {
         return res.status(400).json({
            success: false,
            message: "Category Name is required"
         });
      }

      // Check if category request already exists
      const existingRequest = await CategoryRequest.findOne({ categoryName });

      if (existingRequest) {
         if (existingRequest.status === "pending") {
            return res.status(400).json({
               success: false,
               message: "Request for this category already exists"
            });
         }
         if (existingRequest.status === "approved") {
            return res.status(400).json({
               success: false,
               message: "Category having this name already exists"
            });
         }
      }

      // Create new category request
      const newRequest = await CategoryRequest.create({
         categoryName,
         createdBy: userId,
         status: "pending"
      });

      return res.status(200).json({
         success: true,
         message: "Request created successfully",
         data: newRequest
      });

   } catch (err) {
      return res.status(500).json({
         success: false,
         message: "Failed to create request for category",
         error: err.message
      });
   }
};


exports.updateCategoryRequest = async (req, res) => {
   try {
      const { requestId, updates } = req.body;

      // Validate requestId and ensure updates contain categoryName if required
      if (!requestId) {
         return res.status(400).json({
            success: false,
            message: "Category request ID is required for the update",
         });
      }

      // Find category request by ID
      const categoryRequest = await CategoryRequest.findById(requestId);

      if (!categoryRequest) {
         return res.status(404).json({
            success: false,
            message: "Category request not found",
         });
      }

      // Update fields
      categoryRequest.set(updates);
      await categoryRequest.save();

      return res.status(200).json({
         success: true,
         message: "Category request updated successfully",
         data: categoryRequest,  // Fixed typo (was 'date')
      });
   } catch (err) {
      return res.status(500).json({
         success: false,
         message: "Failed to update request for category",
         error: err.message,
      });
   }
};

exports.getCategoryRequest = async (req, res) => {
   try{
      const {requestId} = req.body
      if(!requestId){
         return res.status(400).json({
            success : false,
            message : "Category id is required",
         })
      }
      const categoryRequest = await CategoryRequest.findById(requestId).populate({path : "createdBy"}).exec()

      if(!categoryRequest){
         return res.status(404).json({
            success : false,
            message : "Category not found"
         })
      }

      return res.status(200).json({
         success : true,
         message : "Category request fetched successfully",
         data : categoryRequest
      })
   }
   catch(err){
      return res.status(500).json({
         success : false,
         message : "Failed to fetch request data",
         error : err.message
      })
   }
}


exports.deleteCategoryRequest = async (req, res) => {
   try{
      const {requestId} = req.body
      if(!requestId){
         return res.status(400).json({
            success : false,
            message : "Category id is required",
         })
      }
      const categoryRequest = await CategoryRequest.findByIdAndDelete(requestId)

      return res.status(200).json({
         success : true,
         message : "Categpry request deleted successfully"
      })

   }
   catch(err){
      return res.status(500).json({
         success : false,
         message : "Failed to delete request for category",
         error : err.message
      })
   }
}

exports.getCategoryRequestCreatedByUser = async (req, res) => {
   try {
      const userId = req.user.id; // Fix userId extraction

      // Find pending category request created by user
      const data = await CategoryRequest.findOne({ 
         createdBy: userId, 
         status: "pending"
      });

      if (!data) {
         return res.status(404).json({
            success: false,
            message: "No pending category request found for this user",
         });
      }

      return res.status(200).json({
         success: true,
         message: "Request data fetched successfully",
         data: data
      });
   } catch (err) {
      return res.status(500).json({
         success: false,
         message: "Failed to fetch request data",
         error: err.message
      });
   }
};

exports.getRequestForAdmin = async (req, res) => {
   try{
      var data = await CategoryRequest.findOne({status : "pending"}).populate({path : "createdBy"}).exec();
      return res.status(200).json({
         success : true,
         message : "Request data fetched successfully",
         data : data
      })
   }
   catch(err){
      return res.status(500).json({
         success : false,
         message : "Failed to fetch request data",
         error : err.message
      })
   }
}