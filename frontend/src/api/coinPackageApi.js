import axiosClient from './axiosClient';

const coinPackageApi = {
    // Get all active coin packages
    getAllPackages: () => {
        return axiosClient.get('/coin-packages');
    },

    // Get package by ID
    getPackageById: (id) => {
        return axiosClient.get(`/coin-packages/${id}`);
    },

    // Get user's coin balance
    getUserBalance: () => {
        return axiosClient.get('/coin-packages/user/balance');
    },

    // Purchase a coin package
    purchasePackage: (packageId) => {
        return axiosClient.post('/coin-packages/purchase', { packageId });
    },

    // Admin: Create new coin package
    createPackage: (packageData) => {
        return axiosClient.post('/coin-packages', packageData);
    },

    // Admin: Update coin package
    updatePackage: (id, packageData) => {
        return axiosClient.put(`/coin-packages/${id}`, packageData);
    },

    // Admin: Delete coin package
    deletePackage: (id) => {
        return axiosClient.delete(`/coin-packages/${id}`);
    }
};

export default coinPackageApi;

 