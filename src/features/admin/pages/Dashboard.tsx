import React from 'react';

const Dashboard: React.FC = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Stats Cards */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-sm text-slate-600 mb-2">Today's Reservations</p>
                    <p className="text-3xl font-bold text-slate-900">24</p>
                    <p className="text-xs text-green-600 mt-2">+12% from yesterday</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-sm text-slate-600 mb-2">Total Guests</p>
                    <p className="text-3xl font-bold text-slate-900">156</p>
                    <p className="text-xs text-green-600 mt-2">+8% from last week</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-sm text-slate-600 mb-2">Active Tables</p>
                    <p className="text-3xl font-bold text-slate-900">18/25</p>
                    <p className="text-xs text-slate-500 mt-2">72% occupancy</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-sm text-slate-600 mb-2">Revenue Today</p>
                    <p className="text-3xl font-bold text-slate-900">$2,450</p>
                    <p className="text-xs text-green-600 mt-2">+15% from yesterday</p>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Reservations</h2>
                <div className="text-center py-12 text-slate-500">
                    <p>Reservation data will be displayed here</p>
                    <p className="text-sm mt-2">Connect to API to show real data</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
