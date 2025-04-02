import { apiConnector } from "../apiConnector";
import { quizEndPoint } from "../apis";


export const deleteQuestion = async (questions, quizId, token) => {
    try {
        console.log("Questions to delete:", questions);
        console.log("Quiz ID:", quizId);
        const response = await apiConnector(
            "DELETE",
            quizEndPoint.DELETE_QUESTION_API,
            {questions, quizId},
            { Authorization: `Bearer${token}` }
        );
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error) {
        console.error("Error occurred while deleting question:", error.message);
        return null;
    }
}


export const addQuestion = async (questions, quizId, token) => {
    try {
        const response = await apiConnector(
            "POST",
            quizEndPoint.ADD_QUESTION_API,
            { questions, quizId },
            { Authorization: `Bearer${token}` }
        );
        console.log("Response add question", response)
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error) {
        console.error("Error occurred while adding question:", error.message);
        return null;
    }
}


export const updateQuestion = async (questions, quizId, token) => {
    try {
        const response = await apiConnector(
            "PUT",
            quizEndPoint.UPDATE_QUESTION_API,
            { questions, quizId },
            { Authorization: `Bearer${token}` }
        );
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error) {
        console.error("Error occurred while updating question:", error.message);
        return null;
    }
}
