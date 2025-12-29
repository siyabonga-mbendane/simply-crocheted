import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserStore } from '../users/user';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const { isAuthenticated, isAdmin, loading } = useUserStore();
    
    if(loading) {
        return <div>Loading...</div>; // You can add a proper loading spinner here
    }
    
    if(!isAuthenticated) {
        return <Navigate to="/auth" />;
    }
    
    if(requireAdmin && !isAdmin()) {
        return <Navigate to="/" />;
    }
    
    return children;
};

export default ProtectedRoute;