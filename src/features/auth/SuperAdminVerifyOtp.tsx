import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../api/services/authService';
import { useAuthStore } from './authStore';
import OtpInput from '../../components/ui/OtpInput';
import { Loader2, Mail, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import type { SuperAdminVerifyRequest } from '../../api/dto/authDto';

const SuperAdminVerifyOtp: React.FC = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuthStore();
    
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [resendTimer, setResendTimer] = useState(60);
    const [isResending, setIsResending] = useState(false);

    // Get email from session storage
    const email = sessionStorage.getItem('pending-registration-email');

    // Redirect if no email
    useEffect(() => {
        if (!email) {
            navigate('/auth/register', { replace: true });
        }
    }, [email, navigate]);

    // Countdown timer
    useEffect(() => {
        if (resendTimer <= 0) return;

        const timer = setTimeout(() => {
            setResendTimer((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [resendTimer]);

    const verifyMutation = useMutation({
        mutationFn: (data: SuperAdminVerifyRequest) => authService.superAdminVerifyEmail(data),
        onSuccess: (data) => {
            // Save token and user info
            setAuth(data.token, {
                userId: data.userId,
                email: data.email,
                role: data.role,
            });

            // Clear session storage
            sessionStorage.removeItem('pending-registration-email');

            // Redirect to super admin venues
            navigate('/super-admin/venues', { replace: true });
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Неверный или просроченный код';
            setError(message);
            setOtp(''); // Clear OTP on error
        },
    });

    const handleVerify = async () => {
        if (!email || otp.length !== 6) return;

        setError('');
        verifyMutation.mutate({ email, otp });
    };

    const handleResend = async () => {
        if (!email || resendTimer > 0) return;

        setIsResending(true);
        setError('');

        try {
            await authService.superAdminSendOtp({
                fullName: '', // Backend only needs email for resend
                email,
                password: '',
                phoneNumber: '',
            });
            setResendTimer(60); // Reset timer
            setOtp(''); // Clear OTP
        } catch (err: any) {
            setError(err.response?.data?.message || 'Не удалось отправить код повторно');
        } finally {
            setIsResending(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && otp.length === 6) {
            handleVerify();
        }
    };

    if (!email) {
        return null;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-primary-50/30 px-4 py-12">
            <div className="w-full max-w-md">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/auth/register', { replace: true })}
                    className="mb-6 flex items-center text-slate-600 hover:text-primary-600 transition-colors group font-medium"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Назад к регистрации
                </button>

                {/* Card */}
                <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8">
                    {/* Icon & Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl mb-4 shadow-xl shadow-primary/40">
                            <Mail className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">
                            Подтверждение почты
                        </h1>
                        <p className="text-slate-600 text-base">
                            Мы отправили 6-значный код на
                        </p>
                        <p className="text-primary-600 font-bold mt-2 text-base">
                            {email}
                        </p>
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start">
                            <XCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    {/* OTP Input */}
                    <div className="mb-8" onKeyDown={handleKeyDown}>
                        <OtpInput
                            length={6}
                            value={otp}
                            onChange={setOtp}
                            disabled={verifyMutation.isPending}
                            error={!!error}
                        />
                    </div>

                    {/* Verify Button */}
                    <button
                        onClick={handleVerify}
                        disabled={otp.length !== 6 || verifyMutation.isPending}
                        className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-bold py-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/40 hover:shadow-xl hover:shadow-primary/50 flex items-center justify-center mb-6 text-base"
                    >
                        {verifyMutation.isPending ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                <CheckCircle className="w-5 h-5 mr-2" />
                                Подтвердить почту
                            </>
                        )}
                    </button>

                    {/* Resend Timer */}
                    <div className="text-center">
                        {resendTimer > 0 ? (
                            <p className="text-base text-slate-600">
                                Отправить код повторно через{' '}
                                <span className="font-bold text-primary-600">
                                    {resendTimer}с
                                </span>
                            </p>
                        ) : (
                            <button
                                onClick={handleResend}
                                disabled={isResending}
                                className="text-base font-bold text-primary-600 hover:text-primary-700 transition-colors disabled:opacity-50"
                            >
                                {isResending ? (
                                    <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                                ) : null}
                                Отправить код повторно
                            </button>
                        )}
                    </div>
                </div>

                {/* Help Text */}
                <div className="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-xl">
                    <p className="text-sm text-primary-800">
                        <strong>Не получили код?</strong> Проверьте папку «Спам» или нажмите «Отправить код повторно» ниже.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminVerifyOtp;
