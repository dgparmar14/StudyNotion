
const { default: mongoose } = require("mongoose");
const Catagories = require("../Models/Catagories");

//Creation of tag
exports.createCategory = async (req, res) => {
    try{
        //data fetch
        const {name, description} = req.body;

        //Data validate
        if(!name){
            return res.status(403).json({
                success : false,
                message : "All the feilds are require"
            });
        }

        //creation of tag in db
        const catagory = await Catagories.create({
            name : name,
            description : description,
        });


        //Respince return
        return res.status(200).json({
            success : true,
            message : "Tag successfully created"
        });

    }catch(err){
        console.error(err);
        return res.status(500).json({
            success : false,
            message : "Something went wrong in creation of tag, please try gain",
            error : err
        })

    }
}

exports.showAllCategories = async (req, res) => {
    try{
        const allCatagories = await Catagories.find({}, {name : true, description : true});
        
        return res.status(200).json({
            success : true,
            message : "All the tags are fetched",
            data : allCatagories
        })
    }catch(err){
        console.error(err);
        return res.status(500).json({
            success : false,
            message : "Something went wrong in fetching all the tags, please try again",
            error : err.message
        })
    }
}


//showAllCatagory function

exports.catagoryPageDetails = async (req, res) => {
    try {
      const { catagoryId } = req.body;
     
     
      const categoryid = new mongoose.Types.ObjectId(catagoryId);
      // Get courses for the specified category
      const selectedCategory = await Catagories.findById({_id :  categoryid})
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: "ratingAndReviews",
        })
        .exec()
        //console.log("Printing selected detail -----------------", selectedCategory);
  
      //console.log("SELECTED COURSE", selectedCategory)
      // Handle the case when the category is not found
      if (!selectedCategory) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }
      // Handle the case when there are no courses
      if (selectedCategory.courses.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
  
      // Get courses for other categories
      function getRandomInt(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
      }
      const categoriesExceptSelected = await Catagories.find({
        _id: { $ne: categoryid },
      })
      let differentCategory = await Catagories.findOne(
        categoriesExceptSelected[getRandomInt(0, categoriesExceptSelected.length)]
          ._id
      )
        .populate({
          path: "courses",
          match: { status: "Published" },
        })
        .exec()
        //console.log("Different COURSE", differentCategory)
      // Get top-selling courses across all categories
      const allCategories = await Catagories.find()
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: {
          path: "instructor",
        },
        })
        .exec()
      const allCourses = allCategories.flatMap((category) => category.courses)
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
       // console.log("mostSellingCourses COURSE", mostSellingCourses)
      return res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
          mostSellingCourses,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  exports.getCategoryCourseList = async (req, res) => {
    try{
      const {categoryId} = req.body;
      if(!categoryId){
        return res.status(400).json({
          success : false,
          message : "Category id is required"
        })
      }

      const category = await Catagories.findById(categoryId).populate({path : "courses", populate : {path : "instructor"}}).exec();
      if(!category){
        return res.status(404).json({
          success : false,
          message : "Category details not found"
        })
      }

      return res.status(200).json({
        success : true,
        message : "Category details fetched successfully",
        data : category
      })
    }
    catch(error){
      return res.status(500).json({
        success : false,
        message : "Error occured while fetching category course details",
        error : error.message
      })
    }
  }






  