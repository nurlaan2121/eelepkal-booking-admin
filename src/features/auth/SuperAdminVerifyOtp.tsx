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
            const message = error.response?.data?.message || 'Invalid or expired OTP code';
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
            setError(err.response?.data?.message || 'Failed to resend OTP');
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-purple-50 px-4 py-12">
            <div className="w-full max-w-md">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/auth/register', { replace: true })}
                    className="mb-6 flex items-center text-slate-600 hover:text-slate-900 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to registration
                </button>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
                    {/* Icon & Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl mb-4">
                            <Mail className="w-8 h-8 text-purple-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 mb-2">
                            Verify Your Email
                        </h1>
                        <p className="text-slate-600 text-sm">
                            We sent a 6-digit code to
                        </p>
                        <p className="text-purple-600 font-semibold mt-1">
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
                        className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-200 flex items-center justify-center mb-6"
                    >
                        {verifyMutation.isPending ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                <CheckCircle className="w-5 h-5 mr-2" />
                                Verify Email
                            </>
                        )}
                    </button>

                    {/* Resend Timer */}
                    <div className="text-center">
                        {resendTimer > 0 ? (
                            <p className="text-sm text-slate-600">
                                Resend code in{' '}
                                <span className="font-semibold text-purple-600">
                                    {resendTimer}s
                                </span>
                            </p>
                        ) : (
                            <button
                                onClick={handleResend}
                                disabled={isResending}
                                className="text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors disabled:opacity-50"
                            >
                                {isResending ? (
                                    <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                                ) : null}
                                Resend Code
                            </button>
                        )}
                    </div>
                </div>

                {/* Help Text */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <p className="text-sm text-blue-800">
                        <strong>Didn't receive the code?</strong> Check your spam folder or click "Resend Code" below.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminVerifyOtp;
