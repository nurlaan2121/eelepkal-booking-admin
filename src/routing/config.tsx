import { createBrowserRouter, Navigate } from 'react-router-dom';
import React from 'react';
import AdminLogin from '../features/auth/AdminLogin';
import SuperAdminRegister from '../features/auth/SuperAdminRegister';
import SuperAdminVerifyOtp from '../features/auth/SuperAdminVerifyOtp';
import AdminLayout from '../shared/layouts/AdminLayout';
import SuperAdminLayout from '../shared/layouts/SuperAdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Admin Pages - Lazy loaded for performance
const AdminDashboard = React.lazy(() => import('../features/admin/pages/Dashboard'));
const AdminReservations = React.lazy(() => import('../features/admin/pages/Reservations'));
const AdminMenu = React.lazy(() => import('../features/admin/pages/Menu'));
const AdminTables = React.lazy(() => import('../features/admin/pages/Tables'));
const AdminStaff = React.lazy(() => import('../features/admin/pages/Staff'));
const AdminReviews = React.lazy(() => import('../features/admin/pages/Reviews'));
const AdminVenueSettings = React.lazy(() => import('../features/admin/pages/VenueSettings'));

// Super Admin Pages - Lazy loaded for performance
const SuperAdminDashboard = React.lazy(() => import('../features/super-admin/pages/Dashboard'));
const SuperAdminVenues = React.lazy(() => import('../features/super-admin/pages/Venues'));
const SuperAdminAdmins = React.lazy(() => import('../features/super-admin/pages/Admins'));
const SuperAdminUsers = React.lazy(() => import('../features/super-admin/pages/Users'));
const SuperAdminCategories = React.lazy(() => import('../features/super-admin/pages/Categories'));
const SuperAdminCities = React.lazy(() => import('../features/super-admin/pages/Cities'));
const SuperAdminModeration = React.lazy(() => import('../features/super-admin/pages/Moderation'));
const SuperAdminAnalytics = React.lazy(() => import('../features/super-admin/pages/Analytics'));
const SuperAdminSettings = React.lazy(() => import('../features/super-admin/pages/Settings'));
const SuperAdminPromo = React.lazy(() => import('../features/super-admin/pages/Promo'));
const SuperAdminFeedback = React.lazy(() => import('../features/super-admin/pages/Feedback'));
const SuperAdminPayments = React.lazy(() => import('../features/super-admin/pages/Payments'));

const PageSuspense: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <React.Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
    }>
        {children}
    </React.Suspense>
);

export const router = createBrowserRouter([
    // Public Auth Routes
    {
        path: '/login',
        element: <AdminLogin />,
    },
    {
        path: '/auth/register',
        element: <SuperAdminRegister />,
    },
    {
        path: '/auth/verify-email',
        element: <SuperAdminVerifyOtp />,
    },
    // Protected Admin Routes
    {
        element: <ProtectedRoute allowedRoles={['ADMIN']} />,
        children: [
            {
                path: '/admin',
                element: <AdminLayout />,
                children: [
                    {
                        index: true,
                        element: <PageSuspense><AdminDashboard /></PageSuspense>,
                    },
                    {
                        path: 'reservations',
                        element: <PageSuspense><AdminReservations /></PageSuspense>,
                    },
                    {
                        path: 'menu',
                        element: <PageSuspense><AdminMenu /></PageSuspense>,
                    },
                    {
                        path: 'tables',
                        element: <PageSuspense><AdminTables /></PageSuspense>,
                    },
                    {
                        path: 'staff',
                        element: <PageSuspense><AdminStaff /></PageSuspense>,
                    },
                    {
                        path: 'reviews',
                        element: <PageSuspense><AdminReviews /></PageSuspense>,
                    },
                    {
                        path: 'settings',
                        element: <PageSuspense><AdminVenueSettings /></PageSuspense>,
                    },
                ],
            },
        ],
    },
    {
        element: <ProtectedRoute allowedRoles={['SUPER_ADMIN']} />,
        children: [
            {
                path: '/super-admin',
                element: <SuperAdminLayout />,
                children: [
                    {
                        index: true,
                        element: <PageSuspense><SuperAdminDashboard /></PageSuspense>,
                    },
                    {
                        path: 'venues',
                        element: <PageSuspense><SuperAdminVenues /></PageSuspense>,
                    },
                    {
                        path: 'admins',
                        element: <PageSuspense><SuperAdminAdmins /></PageSuspense>,
                    },
                    {
                        path: 'users',
                        element: <PageSuspense><SuperAdminUsers /></PageSuspense>,
                    },
                    {
                        path: 'categories',
                        element: <PageSuspense><SuperAdminCategories /></PageSuspense>,
                    },
                    {
                        path: 'cities',
                        element: <PageSuspense><SuperAdminCities /></PageSuspense>,
                    },
                    {
                        path: 'moderation',
                        element: <PageSuspense><SuperAdminModeration /></PageSuspense>,
                    },
                    {
                        path: 'analytics',
                        element: <PageSuspense><SuperAdminAnalytics /></PageSuspense>,
                    },
                    {
                        path: 'settings',
                        element: <PageSuspense><SuperAdminSettings /></PageSuspense>,
                    },
                    {
                        path: 'promo',
                        element: <PageSuspense><SuperAdminPromo /></PageSuspense>,
                    },
                    {
                        path: 'feedback',
                        element: <PageSuspense><SuperAdminFeedback /></PageSuspense>,
                    },
                    {
                        path: 'payments',
                        element: <PageSuspense><SuperAdminPayments /></PageSuspense>,
                    },
                ],
            },
        ],
    },
    {
        path: '/',
        element: <Navigate to="/login" replace />,
    },
    {
        path: '*',
        element: <Navigate to="/login" replace />,
    },
], {
    future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true,
    },
});
