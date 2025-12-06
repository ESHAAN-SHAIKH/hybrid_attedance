import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { isAuthenticated, userType } = useAuth();
    console.log('ProtectedRoute Debug:', { isAuthenticated, userType, allowedRoles, path: window.location.pathname });

    if (!isAuthenticated) {
        // Redirect to login page if not authenticated
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(userType)) {
        // Redirect to their own dashboard if they don't have access to this role
        return <Navigate to={`/${userType}`} replace />;
    }

    return children;
};

export default ProtectedRoute;
