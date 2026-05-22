import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/authStore';

interface ProtectedRouteProps {
    allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    const { isAuthenticated, user } = useAuthStore();
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect to login but save the attempted url
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check role-based access
    if (allowedRoles && user?.role) {
        const hasAccess = allowedRoles.includes(user.role);
        if (!hasAccess) {
            // Redirect based on role
            if (user.role === 'ADMIN') {
                return <Navigate to="/admin" replace />;
            } else if (user.role === 'SUPER_ADMIN') {
                return <Navigate to="/super-admin" replace />;
            }
            return <Navigate to="/login" replace />;
        }
    }

    return <Outlet />;
};

export default ProtectedRoute;
