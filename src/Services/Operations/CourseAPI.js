import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector";
import {courseEndpoints, profileEndpoints, ratingsEndpoints} from "../apis"
const {REVIEWS_DETAILS_API} = ratingsEndpoints;
const {
    GET_ALL_INSTRUCTOR_COURSES_API,
    GET_ALL_COURSE_API,
    COURSE_DETAILS_API,
    COURSE_CATEGORIES_API,
    CREATE_COURSE_API,
    CREATE_SECTION_API,
    EDIT_COURSE_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    DELETE_COURSE_API,
    LECTURE_COMPLETION_API,
    CREATE_RATING_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED
}=courseEndpoints;

const {GET_INSTRUCTOR_DATA} = profileEndpoints;

    

export const  getAverageRating = async(courseId) =>{
    const toastId = toast.loading("Loading...");
    let rating = 0;
    try{
        const responce = await apiConnector("GET", REVIEWS_DETAILS_API, {courseId});
        console.log("After fetching average rating");
        console.log(responce.data);

        if(!responce.data.success){
            throw new Error("Could not get average ratings");
        }

        rating = responce.data.averageRating;

    }catch(error){
        console.error(error);
        toast.error("Could not get average rating");
    }
    toast.dismiss(toastId);
    return rating;
    
}


export const getInsructorCourses = async(token) => {
  console.log(token);
    const toastId = toast.loading("Loading..");
    let courses = [];
    try{
       
        const responce = await apiConnector("GET", GET_ALL_INSTRUCTOR_COURSES_API, null, {
          Authorization: `Bearer${token}`,
        });
        console.log("After getting api responce : ", responce);

        if(!responce.data.success){
            throw new Error("Can not get courses");
        }

        courses = responce.data.data;

    }catch(error){
        console.log("Error occured in getting all courses");
        console.error(error);
        toast.error("Could not get courses");
    }
    toast.dismiss(toastId);

    return courses;
}



export const getAllCources = async()=>{
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await apiConnector("GET", GET_ALL_COURSE_API)
        if (!response?.data?.success) {
        throw new Error("Could Not Fetch Course Categories")
        }
        result = response?.data?.data
    } catch (error) {
        console.log("GET_ALL_COURSE_API API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
    
}


export const fetchCourseDetails = async (courseId) => {
    const toastId = toast.loading("Loading...")
    //   dispatch(setLoading(true));
    let result = null
    try {
      const response = await apiConnector("GET", COURSE_DETAILS_API, {
        courseId,
      })
      console.log("COURSE_DETAILS_API API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data
    } catch (error) {
      console.log("COURSE_DETAILS_API API ERROR............", error)
      result = error.response.data
      // toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
    //   dispatch(setLoading(false));
    return result
  }

  //Check this
  export const fetchCourseCategories = async () => {
    let result = []
    try {
      const response = await apiConnector("GET", COURSE_CATEGORIES_API)
      console.log("COURSE_CATEGORIES_API API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Fetch Course Categories")
      }
      result = response?.data?.data
    } catch (error) {
      console.log("COURSE_CATEGORY_API API ERROR............", error)
      toast.error(error.message)
    }
    return result
  }


  export const addCourseDetails = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", CREATE_COURSE_API, data, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer${token}`,
      })
      console.log("CREATE COURSE API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Add Course Details")
      }
      toast.success("Course Details Added Successfully")
      result = response?.data?.data
    } catch (error) {
      console.log("CREATE COURSE API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }

  //Controller is not defined
  export const editCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", EDIT_COURSE_API, data, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer${token}`,
      })
      console.log("EDIT COURSE API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Update Course Details")
      }
      toast.success("Course Details Updated Successfully")
      result = response?.data?.data
    } catch (error) {
      console.log("EDIT COURSE API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }


  export const createSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", CREATE_SECTION_API, data, {
        Authorization: `Bearer${token}`,
      })
      console.log("CREATE SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Create Section")
      }
      toast.success("Course Section Created")
      result = response?.data?.updatedCource
    } catch (error) {
      console.log("CREATE SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }


  export const createSubSection = async (data, token) => {
    let result = null
    console.log("Writing data", data)
    console.log("Writing data inside api call : ",typeof(data.sectionId))
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer${token}`,
      })
      console.log("CREATE SUB-SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Add Lecture")
      }
      toast.success("Lecture Added")
      result = response?.data?.data
    } catch (error) {
      console.log("CREATE SUB-SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }

  export const updateSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
        Authorization: `Bearer${token}`,
      })
      console.log("UPDATE SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Update Section")
      }
      toast.success("Course Section Updated")
      result = response?.data?.data
    } catch (error) {
      console.log("UPDATE SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }
  

  export const updateSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
        Authorization: `Bearer${token}`,
      })
      console.log("UPDATE SUB-SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Update Lecture")
      }
      toast.success("Lecture Updated")
      result = response?.data?.data
    } catch (error) {
      console.log("UPDATE SUB-SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }

  export const deleteSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("DELETE", DELETE_SECTION_API, data, {
        Authorization: `Bearer${token}`,
      })
      console.log("DELETE SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Delete Section")
      }
      toast.success("Course Section Deleted");
      result = response?.data
    } catch (error) {
      console.log("DELETE SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    console.log("Result : ", result);
    return result
  }

  export const deleteSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("DELETE", DELETE_SUBSECTION_API, data, {
        Authorization: `Bearer${token}`,
      })
      console.log("DELETE SUB-SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Delete Lecture")
      }
      toast.success("Lecture Deleted")
      result = response?.data?.data
    } catch (error) {
      console.log("DELETE SUB-SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }


  //Pending to write controller
  export const deleteCourse = async (courseId, token) => {
    const toastId = toast.loading("Loading...")
    console.log('Printing courseId : ', courseId);
    try {
      const response = await apiConnector("POST", DELETE_COURSE_API, courseId, {
        Authorization: `Bearer${token}`,
      })
      console.log("DELETE COURSE API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Delete Course")
      }
      toast.success("Course Deleted")
    } catch (error) {
      console.log("DELETE COURSE API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId);
  }
  

  export const getFullDetailsOfCourse = async (courseId, token) => {
    const toastId = toast.loading("Loading...")
    //   dispatch(setLoading(true));
    let result = null
    try {
      const response = await apiConnector(
        "POST",
        GET_FULL_COURSE_DETAILS_AUTHENTICATED,
        {
          courseId,
        },
        {
          Authorization: `Bearer${token}`,
        }
      )
      console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response

    } catch (error) {
      console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
      result = error.response.data
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
    //   dispatch(setLoading(false));
    return result
  }
    //Pendding controller
  export const markLectureAsComplete = async (data, token) => {
    let result = null
    console.log("mark complete data", data)
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
        Authorization: `Bearer${token}`,
      })
      console.log(
        "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
        response
      )
  
      if (!response.data.message) {
        throw new Error(response.data.error)
      }
      toast.success("Lecture Completed")
      result = true
    } catch (error) {
      console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
      toast.error(error.message)
      result = false
    }
    toast.dismiss(toastId)
    return result
  }


  export const createRating = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let success = false
    try {
      const response = await apiConnector("POST", CREATE_RATING_API, data, {
        Authorization: `Bearer${token}`,
      })
      console.log("CREATE RATING API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Create Rating")
      }
      toast.success("Rating Created")
      success = true
    } catch (error) {
      success = false
      console.log("CREATE RATING API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return success
  }

  export const instructorDataAPI = async(token)=>{
    const toastId = toast.loading("Loading...");
    let result = [];
    try{
      const responce = await apiConnector("GET", GET_INSTRUCTOR_DATA, {}, {Authorization: `Bearer${token}`})
      console.log("Printing instructor data responce : ", responce);
      if(!responce.data.success){

        toast.error("Could not get instructor data");
      }

      result = responce.data.data;
    }
    catch(error){
      console.log("ERROR OCCURED IN API CALL : ", error);
      toast.error("Could not get instructor data");
    }

    toast.dismiss(toastId);
    return result;
  }