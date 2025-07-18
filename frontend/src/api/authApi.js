import axiosClient from './axiosClient';

const authApi = {
    login: async (credentials) => {
        try {
            const response = await axiosClient.post('/auth/login', credentials);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            if (response.data.user) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            return response.data.user;
        } catch (error) {
            throw error.response?.data || { message: 'Error logging in' };
        }
    },

    register: async (userData) => {
        try {
            const response = await axiosClient.post('/auth/register', userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error registering' };
        }
    },

    logout: async () => {
        try {
            const response = await axiosClient.post('/auth/logout');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error logging out' };
        }
    },

    getCurrentUser: async () => {
        try {
            const response = await axiosClient.get('/auth/me');
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error fetching current user' };
        }
    },

    updateProfile: async (profileData) => {
        try {
            const response = await axiosClient.patch('/auth/profile', profileData);
            // Update local storage with new user data
            const currentUser = JSON.parse(localStorage.getItem('user'));
            localStorage.setItem('user', JSON.stringify({
                ...currentUser,
                ...response.data.user
            }));
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error updating profile' };
        }
    },

    changePassword: async (passwordData) => {
        try {
            const response = await axiosClient.post('/auth/change-password', passwordData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error changing password' };
        }
    },

    forgotPassword: async (email) => {
        try {
            const response = await axiosClient.post('/auth/forgot-password', { email });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error sending forgot password email' };
        }
    },

    resetPassword: async (token, password) => {
        try {
            const response = await axiosClient.post('/auth/reset-password', { token, password });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error resetting password' };
        }
    }
};

export default authApi; 