import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import {
    LayoutDashboard,
    Calendar,
    UtensilsCrossed,
    Table2,
    Users,
    MessageSquare,
    Settings
} from 'lucide-react';

const AdminLayout: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navItems = [
        { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/admin/reservations', icon: Calendar, label: 'Reservations' },
        { to: '/admin/menu', icon: UtensilsCrossed, label: 'Menu' },
        { to: '/admin/tables', icon: Table2, label: 'Tables' },
        { to: '/admin/staff', icon: Users, label: 'Staff' },
        { to: '/admin/reviews', icon: MessageSquare, label: 'Reviews' },
        { to: '/admin/settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Header */}
            <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />

            <div className="flex flex-1">
            {/* Sidebar */}
            <aside
                className={`fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } shadow-xl lg:shadow-none`}
            >
                <div className="flex flex-col h-full">
                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 overflow-y-auto">
                        <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Menu</p>
                        <ul className="space-y-1">
                            {navItems.map((item) => (
                                <li key={item.to}>
                                    <NavLink
                                        to={item.to}
                                        end={item.to === '/admin'}
                                        className={({ isActive }) => {
                                            const bgClass = isActive ? 'bg-primary-50 text-primary-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900';
                                            
                                            return `flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 group ${bgClass}`;
                                        }}
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <item.icon className={`w-5 h-5 mr-3 transition-colors ${
                                                    isActive ? 'text-primary-600' : 'text-slate-400 group-hover:text-slate-600'
                                                }`} />
                                                <span className="font-medium">{item.label}</span>
                                            </>
                                        )}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:ml-72 flex-1 flex flex-col">
                {/* Topbar - Removed, now in Header component */}

                {/* Page Content */}
                <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto flex-1">
                    <Outlet />
                </main>

                {/* Footer */}
                <Footer />
            </div>
            </div>
        </div>
    );
};

export default AdminLayout;
