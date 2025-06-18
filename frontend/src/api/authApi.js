import axiosClient from './axiosClient';

export const login = async (credentials) => {
    try {
        const response = await axiosClient.post('/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error logging in' };
    }
};

export const register = async (userData) => {
    try {
        const response = await axiosClient.post('/auth/register', userData);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error registering' };
    }
};

export const logout = async () => {
    try {
        const response = await axiosClient.post('/auth/logout');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error logging out' };
    }
};

export const getCurrentUser = async () => {
    try {
        const response = await axiosClient.get('/auth/me');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error fetching current user' };
    }
};

export const updateProfile = async (profileData) => {
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
};

export const changePassword = async (passwordData) => {
    try {
        const response = await axiosClient.post('/auth/change-password', passwordData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error changing password' };
    }
}; 