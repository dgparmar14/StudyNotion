import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api/v1/quiz"; 

// Create Quiz API Call
export const createQuiz = async (quizData, token) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/create`, quizData, {
            headers: {
                Authorization: `Bearer ${token}`,  // Pass auth token
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating quiz:", error.response?.data || error.message);
        throw error;
    }
};
