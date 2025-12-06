import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userType, setUserType] = useState(null);
    const navigate = useNavigate();

    // Check for existing session on mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('attendsmart_user');
        const storedUserType = localStorage.getItem('attendsmart_userType');

        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
            setUserType(storedUserType);
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (email, password, role) => {
        try {
            const response = await api.post('/auth/login', { email, password, role });
            const { token, user } = response.data;

            setUser(user);
            setUserType(user.role);
            setIsAuthenticated(true);

            // Store in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('attendsmart_user', JSON.stringify(user));
            localStorage.setItem('attendsmart_userType', user.role);

            // Navigate to appropriate dashboard
            navigate(`/${user.role}`);
            return { success: true };
        } catch (error) {
            console.error('Login failed:', error);
            return {
                success: false,
                error: error.response?.data?.error || 'Login failed'
            };
        }
    };

    const logout = () => {
        setUser(null);
        setUserType(null);
        setIsAuthenticated(false);

        // Clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('attendsmart_user');
        localStorage.removeItem('attendsmart_userType');

        // Navigate to landing page
        navigate('/');
    };

    const register = async (registrationData) => {
        try {
            const response = await api.post('/auth/register', registrationData);
            const { token, user } = response.data;

            setUser(user);
            setUserType(user.role);
            setIsAuthenticated(true);

            localStorage.setItem('token', token);
            localStorage.setItem('attendsmart_user', JSON.stringify(user));
            localStorage.setItem('attendsmart_userType', user.role);

            navigate(`/${user.role}`);
            return { success: true };
        } catch (error) {
            console.error('Registration failed:', error);
            return {
                success: false,
                error: error.response?.data?.error || 'Registration failed'
            };
        }
    };

    const value = {
        user,
        isAuthenticated,
        userType,
        login,
        logout,
        register
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
