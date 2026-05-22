import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../api/services/authService';
import type { SuperAdminRegisterRequest } from '../../api/dto/authDto';
import { Eye, EyeOff, Loader2, ArrowRight, Shield } from 'lucide-react';

const SuperAdminRegister: React.FC = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    });
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const registerMutation = useMutation({
        mutationFn: (data: SuperAdminRegisterRequest) => authService.superAdminSendOtp(data),
        onSuccess: () => {
            // Store email temporarily for verification page
            sessionStorage.setItem('pending-registration-email', formData.email);
            navigate('/auth/verify-email', { replace: true });
        },
        onError: (error: any) => {
            setErrors({
                submit: error.response?.data?.message || 'Registration failed. Please try again.',
            });
        },
    });

    const validateField = (name: string, value: string): string => {
        switch (name) {
            case 'fullName':
                if (!value.trim()) return 'Введите полное имя';
                if (value.trim().length < 2) return 'Имя должно содержать минимум 2 символа';
                return '';
            
            case 'email':
                if (!value) return 'Введите электронную почту';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Неверный формат электронной почты';
                return '';
            
            case 'phoneNumber':
                if (!value) return 'Введите номер телефона';
                if (!/^\+996\d{9}$/.test(value.replace(/\s/g, ''))) {
                    return 'Телефон должен быть в формате: +996XXXXXXXXX';
                }
                return '';
            
            case 'password':
                if (!value) return 'Введите пароль';
                if (value.length < 8) return 'Пароль должен содержать минимум 8 символов';
                if (!/[A-Z]/.test(value)) return 'Пароль должен содержать заглавную букву';
                if (!/[a-z]/.test(value)) return 'Пароль должен содержать строчную букву';
                if (!/[0-9]/.test(value)) return 'Пароль должен содержать цифру';
                return '';
            
            case 'confirmPassword':
                if (!value) return 'Подтвердите пароль';
                if (value !== formData.password) return 'Пароли не совпадают';
                return '';
            
            default:
                return '';
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        
        if (touched[name]) {
            const error = validateField(name, value);
            setErrors((prev) => ({ ...prev, [name]: error }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate all fields
        const newErrors: Record<string, string> = {};
        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key as keyof typeof formData]);
            if (error) newErrors[key] = error;
        });

        setErrors(newErrors);
        setTouched({
            fullName: true,
            email: true,
            phoneNumber: true,
            password: true,
            confirmPassword: true,
        });

        if (Object.keys(newErrors).length === 0) {
            const { confirmPassword, ...registerData } = formData;
            registerMutation.mutate(registerData as SuperAdminRegisterRequest);
        }
    };

    const getPasswordStrength = (password: string): { score: number; label: string; color: string } => {
        let score = 0;
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        if (score <= 2) return { score, label: 'Простой', color: 'bg-red-500' };
        if (score <= 4) return { score, label: 'Средний', color: 'bg-yellow-500' };
        return { score, label: 'Надёжный', color: 'bg-green-500' };
    };

    const passwordStrength = getPasswordStrength(formData.password);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-primary-50/30 px-4 py-12">
            <div className="w-full max-w-lg">
                {/* Logo & Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl mb-4 shadow-xl shadow-primary/40">
                        <Shield className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">
                        Создание аккаунта
                    </h1>
                    <p className="text-slate-600 text-lg">
                        Зарегистрируйтесь для доступа к панели администратора
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8">
                    {/* Error Alert */}
                    {errors.submit && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                            <p className="text-sm text-red-700">{errors.submit}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Full Name */}
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 mb-2">
                                Полное имя
                            </label>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                value={formData.fullName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`
                                    w-full px-4 py-3 rounded-xl border-2 outline-none transition-all duration-200
                                    ${errors.fullName && touched.fullName
                                        ? 'border-red-300 bg-red-50 focus:border-red-500'
                                        : 'border-slate-200 bg-slate-50 focus:border-primary-500 focus:bg-white'
                                    }
                                `}
                                placeholder="Иван Иванов"
                                disabled={registerMutation.isPending}
                            />
                            {errors.fullName && touched.fullName && (
                                <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                                Электронная почта
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`
                                    w-full px-4 py-3 rounded-xl border-2 outline-none transition-all duration-200
                                    ${errors.email && touched.email
                                        ? 'border-red-300 bg-red-50 focus:border-red-500'
                                        : 'border-slate-200 bg-slate-50 focus:border-primary-500 focus:bg-white'
                                    }
                                `}
                                placeholder="admin@eelepkal.com"
                                disabled={registerMutation.isPending}
                            />
                            {errors.email && touched.email && (
                                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-semibold text-slate-700 mb-2">
                                Номер телефона
                            </label>
                            <input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="tel"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`
                                    w-full px-4 py-3 rounded-xl border-2 outline-none transition-all duration-200
                                    ${errors.phoneNumber && touched.phoneNumber
                                        ? 'border-red-300 bg-red-50 focus:border-red-500'
                                        : 'border-slate-200 bg-slate-50 focus:border-primary-500 focus:bg-white'
                                    }
                                `}
                                placeholder="+996777785445"
                                disabled={registerMutation.isPending}
                            />
                            {errors.phoneNumber && touched.phoneNumber && (
                                <p className="mt-2 text-sm text-red-600">{errors.phoneNumber}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                                Пароль
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`
                                        w-full px-4 py-3 pr-12 rounded-xl border-2 outline-none transition-all duration-200
                                        ${errors.password && touched.password
                                            ? 'border-red-300 bg-red-50 focus:border-red-500'
                                            : 'border-slate-200 bg-slate-50 focus:border-primary-500 focus:bg-white'
                                        }
                                    `}
                                    placeholder="••••••••"
                                    disabled={registerMutation.isPending}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                    disabled={registerMutation.isPending}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && touched.password && (
                                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                            )}
                            {formData.password && !errors.password && (
                                <div className="mt-3">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${passwordStrength.color} transition-all duration-300`}
                                                style={{ width: `${(passwordStrength.score / 6) * 100}%` }}
                                            />
                                        </div>
                                        <span className="ml-3 text-xs font-medium text-slate-600">
                                            {passwordStrength.label}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-700 mb-2">
                                Подтверждение пароля
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`
                                        w-full px-4 py-3 pr-12 rounded-xl border-2 outline-none transition-all duration-200
                                        ${errors.confirmPassword && touched.confirmPassword
                                            ? 'border-red-300 bg-red-50 focus:border-red-500'
                                            : 'border-slate-200 bg-slate-50 focus:border-primary-500 focus:bg-white'
                                        }
                                    `}
                                    placeholder="••••••••"
                                    disabled={registerMutation.isPending}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                    disabled={registerMutation.isPending}
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.confirmPassword && touched.confirmPassword && (
                                <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={registerMutation.isPending}
                            className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-bold py-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/40 hover:shadow-xl hover:shadow-primary/50 flex items-center justify-center group text-base"
                        >
                            {registerMutation.isPending ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Создать аккаунт и отправить код
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 pt-6 border-t border-slate-200 text-center">
                        <p className="text-base text-slate-600">
                            Уже есть аккаунт?{' '}
                            <a
                                href="/login"
                                className="font-bold text-primary-600 hover:text-primary-700 transition-colors"
                            >
                                Войти
                            </a>
                        </p>
                    </div>
                </div>

                {/* Terms */}
                <p className="mt-6 text-center text-xs text-slate-500">
                    Создавая аккаунт, вы соглашаетесь с нашими Условиями использования и Политикой конфиденциальности.
                </p>
            </div>
        </div>
    );
};

export default SuperAdminRegister;
