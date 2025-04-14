import { toast } from "react-toastify";
import { apiConnector } from "../apiConnector";
import { quizEndPoint } from "../apis";

const {CREATE_QUIZ_API,
    GET_RESULT_QUIZ_API,
    CHECK_RESULT_API,
    GET_QUIZ_API
} = quizEndPoint

// Create Quiz API Call
export const createQuiz = async (quizData,courseId, categoryId ,token) => {

    try {
        const response = await apiConnector('POST',CREATE_QUIZ_API, {quizData, courseId, categoryId}, {
                Authorization: `Bearer${token}`,  
                "Content-Type": "application/json",
            
        });
        console.log("Create quiz data : ", response);
        if(!response.data.success){
            throw new Error("Error while creating quiz");
        }        
        return response.data;
    } catch (error) {
        toast.error("Can not created quiz")
        console.error("Error creating quiz:", error.response?.data || error.message);
        throw error;
    }
};

export const  getQuizResult = async(quizId, userId, token) =>{
  const toastId = toast.loading("Loading...");
  
  try{
      const response = await apiConnector("POST", GET_RESULT_QUIZ_API, {quizId, userId}, { Authorization : `Bearer${token}`});
      console.log("After fetching categtory request by user");
      console.log(response.data);

      if(!response.data.success){
          throw new Error("Could not get category request created by user");
      }
      toast.dismiss(toastId);
      return response.data;

  }catch(error){
      console.error(error);
      toast.error("Could not get category request created by user");
  }

  
}


export const  checkResult = async(answers, quizId, token) =>{
    const toastId = toast.loading("Loading...");
    
    try{
        const response = await apiConnector("POST", CHECK_RESULT_API, {answers,quizId}, { Authorization : `Bearer${token}`});
        console.log("After checking quiz result : ", response);
    
  
        if(!response.data.success){
            throw new Error("Coud not check result");
        }
        toast.dismiss(toastId);
        return response.data;
  
    }catch(error){
        console.error(error);
        toast.error("Could not get quiz result");
    }
  
    
  }

 export const getQuiz = async (quizId, token) => {
    try{
        const toastId = toast.loading("Loading...")
        const response = await apiConnector("POST", GET_QUIZ_API, {quizId}, { Authorization : `Bearer${token}`})
        console.log("After fetching quiz : ", response.data.success);
        
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.dismiss(toastId)
        return response.data
    }
    catch(error){
        console.error("Error occured while getting quiz result");
        toast.error(error)
    }
  }