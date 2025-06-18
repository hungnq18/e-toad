import axiosClient from './axiosClient';

const quizApi = {
    getAllQuizzes: async () => {
        try {
            const response = await axiosClient.get('/quizzes');
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error fetching quizzes' };
        }
    },

    getQuizById: async (quizId) => {
        try {
            const response = await axiosClient.get(`/quizzes/${quizId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error fetching quiz' };
        }
    },

    createQuiz: async (quizData) => {
        try {
            const response = await axiosClient.post('/quizzes', quizData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error creating quiz' };
        }
    },

    updateQuiz: async (quizId, quizData) => {
        try {
            const response = await axiosClient.put(`/quizzes/${quizId}`, quizData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error updating quiz' };
        }
    },

    deleteQuiz: async (quizId) => {
        try {
            const response = await axiosClient.delete(`/quizzes/${quizId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error deleting quiz' };
        }
    },

    submitQuiz: async (quizId, answers) => {
        try {
            const response = await axiosClient.post(`/quizzes/${quizId}/submit`, { answers });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error submitting quiz' };
        }
    },

    getQuizResults: async (quizId) => {
        try {
            const response = await axiosClient.get(`/quizzes/${quizId}/results`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error fetching quiz results' };
        }
    }
};

export default quizApi; 