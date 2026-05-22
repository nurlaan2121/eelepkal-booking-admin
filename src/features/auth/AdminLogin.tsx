import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../../api/services/authService';
import { useAuthStore } from './authStore';
import type { SignInRequest } from '../../api/dto/authDto';
import { Loader2, Shield, Eye, EyeOff } from 'lucide-react';

const AdminLogin: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setAuth } = useAuthStore();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const loginMutation = useMutation({
        mutationFn: (data: SignInRequest) => authService.adminSignIn(data),
        onSuccess: (data) => {
            setAuth(data.token, {
                userId: data.userId,
                email: data.email,
                role: data.role
            });
            
            // Redirect based on role
            const from = location.state?.from?.pathname;
            if (from) {
                navigate(from, { replace: true });
            } else if (data.role === 'SUPER_ADMIN') {
                navigate('/super-admin', { replace: true });
            } else {
                navigate('/admin', { replace: true });
            }
        },
        onError: (error: any) => {
            setError(error.response?.data?.message || 'Invalid email or password. Please try again.');
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        loginMutation.mutate({ email, password });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-orange-50 px-4 py-12">
            <div className="w-full max-w-md">
                {/* Logo & Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl mb-4 shadow-lg shadow-primary/30">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-slate-600">
                        Sign in to your admin account
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
                    {/* Error Alert */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-primary-500 focus:bg-white outline-none transition-all duration-200"
                                placeholder="admin@eelepkal.com"
                                required
                                disabled={loginMutation.isPending}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-primary-500 focus:bg-white outline-none transition-all duration-200"
                                    placeholder="••••••••"
                                    required
                                    disabled={loginMutation.isPending}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                    disabled={loginMutation.isPending}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loginMutation.isPending}
                            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/30 flex items-center justify-center"
                        >
                            {loginMutation.isPending ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center">
                        <div className="flex-1 border-t border-slate-200" />
                        <span className="px-4 text-xs text-slate-500">OR</span>
                        <div className="flex-1 border-t border-slate-200" />
                    </div>

                    {/* Register Link */}
                    <a
                        href="/auth/register"
                        className="w-full inline-flex items-center justify-center px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors"
                    >
                        Create Super Admin Account
                    </a>

                    {/* Footer */}
                    <div className="mt-6 pt-6 border-t border-slate-200 text-center">
                        <p className="text-xs text-slate-500">
                            © 2026 Eelep Kal. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
