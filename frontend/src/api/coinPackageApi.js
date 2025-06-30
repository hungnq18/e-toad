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
    },

    // Create PayOS order
    createPayOSOrder: async (packageId, userId) => {
        const res = await axiosClient.post('/coin-packages/payos', { packageId, userId });
        return res.data;
    },

    // Verify PayOS payment
    verifyPayOSPayment: async (orderCode) => {
        const res = await axiosClient.get(`/coin-packages/payos/verify/${orderCode}`);
        return res.data;
    },

    // Complete PayOS payment and add coins
    completePayOSPayment: async (orderCode) => {
        const res = await axiosClient.post(`/coin-packages/payos/complete/${orderCode}`);
        return res.data;
    },

    // Create COD order
    createCODOrder: async (packageId) => {
        const res = await axiosClient.post('/coin-packages/cod', { packageId });
        return res.data;
    },

    // Get user's orders
    getUserOrders: () => {
        return axiosClient.get('/coin-packages/user/orders');
    }
};

export default coinPackageApi;

 