import React, { createContext, useContext, useEffect, useState } from 'react';
import authApi from '../api/authApi';
import userApi from '../api/userApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in on mount
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserProfile();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await authApi.getCurrentUser();
            setUser(response.user);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await authApi.login({ email, password });
            setUser(response.user);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Login failed'
            };
        }
    };

    const register = async (userData) => {
        try {
            const response = await authApi.register(userData);
            setUser(response.user);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Registration failed'
            };
        }
    };

    const logout = async () => {
        try {
            await authApi.logout();
            setUser(null);
        } catch (error) {
            console.error('Error logging out:', error);
            // Still clear local state even if API call fails
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
        }
    };

    const updateUserProfile = async (data) => {
        if (!user || !user._id) throw new Error('User not found');
        const updated = await userApi.updateUser(user._id, data);
        setUser(updated);
        return updated;
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            register,
            logout,
            isAuthenticated: !!user,
            updateUserProfile
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 