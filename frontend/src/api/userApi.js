import axiosClient from './axiosClient';

const userApi = {
    getAllUsers: async () => {
        try {
            const response = await axiosClient.get('/users');
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error fetching users' };
        }
    },

    getUserById: async (userId) => {
        try {
            const response = await axiosClient.get(`/users/${userId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error fetching user' };
        }
    },

    updateUser: async (userId, userData) => {
        try {
            const response = await axiosClient.patch(`/users/${userId}`, userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error updating user' };
        }
    },

    deleteUser: async (userId) => {
        try {
            const response = await axiosClient.delete(`/users/${userId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error deleting user' };
        }
    }
};

export default userApi; 