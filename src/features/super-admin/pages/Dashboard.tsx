import React from 'react';

const Dashboard: React.FC = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-6">Super Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-sm text-slate-600 mb-2">Total Venues</p>
                    <p className="text-3xl font-bold text-slate-900">142</p>
                    <p className="text-xs text-green-600 mt-2">+5 this month</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-sm text-slate-600 mb-2">Total Admins</p>
                    <p className="text-3xl font-bold text-slate-900">89</p>
                    <p className="text-xs text-slate-500 mt-2">Active administrators</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-sm text-slate-600 mb-2">Total Users</p>
                    <p className="text-3xl font-bold text-slate-900">12,450</p>
                    <p className="text-xs text-green-600 mt-2">+234 this week</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-sm text-slate-600 mb-2">Pending Moderation</p>
                    <p className="text-3xl font-bold text-orange-600">18</p>
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
