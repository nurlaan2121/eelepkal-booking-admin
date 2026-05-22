import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import {
    LayoutDashboard,
    Building2,
    Users,
    UserCog,
    FolderOpen,
    MapPin,
    ShieldCheck,
    BarChart3,
    Settings
} from 'lucide-react';

const SuperAdminLayout: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navItems = [
        { to: '/super-admin', icon: LayoutDashboard, label: 'Главная' },
        { to: '/super-admin/venues', icon: Building2, label: 'Заведения' },
        { to: '/super-admin/admins', icon: UserCog, label: 'Администраторы' },
        { to: '/super-admin/users', icon: Users, label: 'Пользователи' },
        { to: '/super-admin/categories', icon: FolderOpen, label: 'Категории' },
        { to: '/super-admin/cities', icon: MapPin, label: 'Города' },
        { to: '/super-admin/moderation', icon: ShieldCheck, label: 'Модерация' },
        { to: '/super-admin/analytics', icon: BarChart3, label: 'Аналитика' },
        { to: '/super-admin/settings', icon: Settings, label: 'Настройки' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Header */}
            <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />

            <div className="flex flex-1">
            {/* Sidebar */}
            <aside
                className={`fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full">
                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-4 overflow-y-auto">
                        <ul className="space-y-1">
                            {navItems.map((item) => (
                                <li key={item.to}>
                                    <NavLink
                                        to={item.to}
                                        end={item.to === '/super-admin'}
                                        className={({ isActive }) =>
                                            `flex items-center px-3 py-2.5 rounded-lg transition-all ${
                                                isActive
                                                    ? 'bg-primary-50 text-primary-700 font-medium'
                                                    : 'text-slate-700 hover:bg-slate-50'
                                            }`
                                        }
                                    >
                                        <item.icon className="w-5 h-5 mr-3" />
                                        <span>{item.label}</span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:ml-64 flex-1 flex flex-col">
                {/* Topbar - Removed, now in Header component */}

                {/* Page Content */}
                <main className="p-4 sm:p-6 lg:p-8 flex-1">
                    <Outlet />
                </main>

                {/* Footer */}
                <Footer />
            </div>
            </div>
        </div>
    );
};

export default SuperAdminLayout;
