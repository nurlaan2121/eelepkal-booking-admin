import { useMutation } from '@tanstack/react-query';
import { authService } from '../../../api/services/authService';
import { useAuthStore } from '../authStore';
import type { SignInRequest, SignInResponse } from '../../../api/dto/authDto';

export const useAdminAuth = () => {
    const { setAuth, logout } = useAuthStore();

    // Mutation for Admin Login
    const loginMutation = useMutation({
        mutationFn: (data: SignInRequest) => authService.adminSignIn(data),
        onSuccess: (data: SignInResponse) => {
            setAuth(data.token, { 
                userId: data.userId, 
                email: data.email,
                role: data.role
            });
        },
    });

    return {
        login: loginMutation.mutateAsync,
        isLoggingIn: loginMutation.isPending,
        loginError: loginMutation.error,
        logout,
    };
};
