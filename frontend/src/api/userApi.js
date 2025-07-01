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
        const formData = new FormData();
        Object.entries(userData).forEach(([key, value]) => {
            if (value !== undefined && value !== null) formData.append(key, value);
        });
        const response = await axiosClient.patch(`/users/${userId}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },

    addCoins: async (userId, coins) => {
        try {
            const response = await axiosClient.post(`/users/${userId}/add-coins`, { coins });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error adding coins' };
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