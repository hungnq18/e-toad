import axiosClient from './axiosClient';

const badgeApi = {
    getAllBadges: async () => {
        try {
            const response = await axiosClient.get('/badges');
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error fetching badges' };
        }
    }
};

export default badgeApi; 