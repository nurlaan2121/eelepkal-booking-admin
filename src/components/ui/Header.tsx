import React, { useState } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuthStore } from '../../features/auth/authStore';

interface HeaderProps {
    onMenuToggle: () => void;
    sidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, sidebarOpen }) => {
    const { user, logout } = useAuthStore();
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
            {/* Top Bar with Orange Gradient */}
            <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Left: Logo & Menu Toggle */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={onMenuToggle}
                                className="lg:hidden text-white hover:text-orange-100 transition-colors p-2 rounded-lg hover:bg-white/10"
                                aria-label="Toggle menu"
                            >
                                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                            
                            {/* Logo */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                                    <img src="/logo.png" alt="Eelep Kal" className="w-8 h-8 object-contain" />
                                </div>
                                <div className="hidden sm:block">
                                    <h1 className="text-xl font-bold text-white tracking-tight">Ээлеп Кал</h1>
                                    <p className="text-xs text-orange-100 font-medium">Панель управления</p>
                                </div>
                            </div>
                        </div>

                        {/* Right: User Menu */}
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all border border-white/20"
                                >
                                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                        <span className="text-sm font-bold text-orange-600">
                                            {user?.email?.charAt(0).toUpperCase() || 'U'}
                                        </span>
                                    </div>
                                    <div className="hidden md:block text-left">
                                        <p className="text-sm font-semibold text-white">{user?.email?.split('@')[0] || 'User'}</p>
                                        <p className="text-xs text-orange-100">Администратор</p>
                                    </div>
                                </button>

                                {/* Dropdown Menu */}
                                {userMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
                                        <div className="p-4 bg-gradient-to-r from-orange-50 to-white border-b border-slate-200">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-md">
                                                    <span className="text-lg font-bold text-white">
                                                        {user?.email?.charAt(0).toUpperCase() || 'U'}
                                                    </span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-bold text-slate-900 truncate">{user?.email}</p>
                                                    <p className="text-xs text-slate-500">Администратор</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-2">
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setUserMenuOpen(false);
                                                }}
                                                className="w-full flex items-center gap-3 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                                            >
                                                <LogOut className="w-5 h-5" />
                                                <span>Выйти</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
