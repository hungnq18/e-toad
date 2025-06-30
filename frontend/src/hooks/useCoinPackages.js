import { useState } from 'react';
import coinPackageApi from '../api/coinPackageApi';

export const useCoinPackages = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPackages = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await coinPackageApi.getAllPackages();
            setPackages(response.data.data);
            return response.data.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch packages');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        packages,
        loading,
        error,
        fetchPackages
    };
};

export const useUserBalance = () => {
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBalance = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await coinPackageApi.getUserBalance();
            setBalance(response.data.data.coins);
            return response.data.data.coins;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch balance');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateBalance = (newBalance) => {
        setBalance(newBalance);
    };

    return {
        balance,
        loading,
        error,
        fetchBalance,
        updateBalance
    };
};

export const usePurchasePackage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const purchasePackage = async (packageId) => {
        try {
            setLoading(true);
            setError(null);
            const response = await coinPackageApi.purchasePackage(packageId);
            return response.data;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to purchase package';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return {
        purchasePackage,
        loading,
        error
    };
}; 