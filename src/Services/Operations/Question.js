import { toast } from "react-toastify";
import { apiConnector } from "../apiConnector";
import { quizEndPoint } from "../apis";


export const deleteQuestion = async (questions, quizId, token) => {
    try {
        const toastId = toast.loading("Loading...") 
        const response = await apiConnector(
            "DELETE",
            quizEndPoint.DELETE_QUESTION_API,
            {questions, quizId, token},
            { Authorization: `Bearer${token}` }
        );
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.dismiss(toastId)
        return response.data;
    } catch (error) {
        console.error("Error occurred while deleting question:", error.message);
        toast.error("Error occured while deleting the question")
        return null;
    }
    
}


export const addQuestion = async (questions, quizId, token) => {
    try {
        const toastId = toast.loading("Loading...") 
        const response = await apiConnector(
            "POST",
            quizEndPoint.ADD_QUESTION_API,
            { questions, quizId, token },
            { Authorization: `Bearer${token}` }
        );
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.dismiss(toastId)
        return response.data;
    } catch (error) {
        console.error("Error occurred while adding question:", error.message);
        toast.error("Error occured while addinf the question")
        return null
    }
}


export const updateQuestion = async (questions, quizId, token) => {
    try {
        const toastId = toast.loading("Loading...") 
        const response = await apiConnector(
            "PUT",
            quizEndPoint.UPDATE_QUESTION_API,
            { questions, quizId, token },
            { Authorization: `Bearer${token}` }
        );
        console.log("Uodate question api response : ", response)
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.dismiss(toastId)
        return response.data;
    } catch (error) {
        console.error("Error occurred while updating question:", error.message);
        toast.error("Error occured while updating the question")
        return null
    }
}
