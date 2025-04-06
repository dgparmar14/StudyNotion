import { apiConnector, axiosInstance } from "../apiConnector";
import { quizEndPoint } from "../apis";

const {CREATE_QUIZ_API} = quizEndPoint

// Create Quiz API Call
export const createQuiz = async (quizData,courseId, categoryId ,token) => {

    try {
        const response = await apiConnector(CREATE_QUIZ_API, quizData, {
            
                Authorization: `Bearer ${token}`,  // Pass auth token
                "Content-Type": "application/json",
            
        });
        return response.data;
    } catch (error) {
        console.error("Error creating quiz:", error.response?.data || error.message);
        throw error;
    }
};