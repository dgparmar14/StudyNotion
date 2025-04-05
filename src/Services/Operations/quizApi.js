import { apiConnector } from "../apiConnector";
import { quizEndPoint } from "../apis";

// Create Quiz API Call
export const createQuiz = async (quizData,courseId, categoryId ,token) => {

    try {
        const response = await apiConnector(
            "POST",
            quizEndPoint.CREATE_QUIZ_API, 
            {quizData, courseId, categoryId},
        );
        return response.data;
    } catch (error) {
        console.error("Error creating quiz:", error.response?.data || error.message);
        throw error;
    }
};