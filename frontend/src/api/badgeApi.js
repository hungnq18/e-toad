import axiosClient from './axiosClient';

const badgeApi = {
    getAllBadges: async () => {
        try {
            const response = await axiosClient.get('/badges');
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error fetching badges' };
        }
    },
    createBadge: async (badgeId) => {
        try {
            const response = await axiosClient.post('/badges/add-badge-for-user', {
                badgeId
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error creating badge' };
        }
    },
    getBadgeOfUser: async() => {
        try {
            const response = await axiosClient.get('/badges/get-badge');
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error fetching badges' };
        }
    }
};

export default badgeApi; 