import React, { useState, useEffect } from 'react';
import { superAdminVenueApi } from '../../../api/services/superAdminVenueService';
import { superAdminApi } from '../../../api/services/superAdminService';

const Dashboard: React.FC = () => {
    const [stats, setStats] = useState({
        totalVenues: 0,
        totalAdmins: 0,
        pendingModeration: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const [venuesResponse, adminsResponse] = await Promise.all([
                    superAdminVenueApi.getAllVenues(),
                    superAdminApi.getMyPersonal(),
                ]);

                setStats({
                    totalVenues: venuesResponse.data.length,
                    totalAdmins: adminsResponse.data.length,
                    pendingModeration: 0, // TODO: Add API endpoint for moderation count
                });
            } catch (error) {
                console.error('Failed to fetch dashboard stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="py-16 text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
                <p className="text-slate-600 font-medium mt-4">Loading...</p>
            </div>
        );
    }
    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-6">Super Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-sm text-slate-600 mb-2">Total Venues</p>
                    <p className="text-3xl font-bold text-slate-900">{stats.totalVenues}</p>
                    <p className="text-xs text-green-600 mt-2">Active venues</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-sm text-slate-600 mb-2">Total Admins</p>
                    <p className="text-3xl font-bold text-slate-900">{stats.totalAdmins}</p>
                    <p className="text-xs text-slate-500 mt-2">Active administrators</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-sm text-slate-600 mb-2">Pending Moderation</p>
                    <p className="text-3xl font-bold text-orange-600">{stats.pendingModeration}</p>
                    <p className="text-xs text-orange-600 mt-2">Requires attention</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Venues</h2>
                    <div className="text-center py-12 text-slate-500">
                        <p>Venue data will be displayed here</p>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">Moderation Queue</h2>
                    <div className="text-center py-12 text-slate-500">
                        <p>Moderation items will be displayed here</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
