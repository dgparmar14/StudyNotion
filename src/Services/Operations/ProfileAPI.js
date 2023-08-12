import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import {profileEndpoints} from "../apis";


// export default async function getEnrolledCourses(token){
//         const toastId = toast.loading("Loading...");
//         let result = [];
//         try{
      
//             const responce = await apiConnector("GET", profileEndpoints.GET_USER_ENROLLED_COURSES_API, null, {Authorization: `Bearer${token}`});
//             if(!responce.data.success){
//                 throw new Error(responce.data.message);
//             }
//             console.log("After getting responce : ", responce);
           
//             result = responce.data.data;
            
//         }
//         catch(error){
//             console.log("Error occured in getting enrolled courses");
//             console.error(error);   
//         }
//         toast.dismiss(toastId);
//         return result;
// }

export default async function getEnrolledCourses(token) {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
      console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
      const responce = await apiConnector("GET", profileEndpoints.GET_USER_ENROLLED_COURSES_API, null, {Authorization: `Bearer${token}`});
      console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES", responce);
     
      if (!responce.data.success) {
        throw new Error(responce.data.message)
      }
      result = responce.data.data
    } catch (error) {
      console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
      toast.error("Could Not Get Enrolled Courses")
    }
    toast.dismiss(toastId)
    return result
  }

  

